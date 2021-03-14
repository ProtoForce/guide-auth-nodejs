import { Logger, LogLevel } from '@auth/irt';
import { User, UserID, UserLookup } from '@auth/service';

import { lookupFromEmail, lookupFromPhone, sanitizeEmail, sanitizePhone } from './utils';

// A few structures to hold user contact information
export interface BaseContact {
    original: string;
    verified: boolean;
}

export interface PhoneContact extends BaseContact {
    type: 'phone';
    phone: string;
    code: string;
}

export interface EmailContact extends BaseContact {
    type: 'email';
    email: string;
}

export type UserContact = PhoneContact | EmailContact;

export interface UserRecord {
    user: User;
    mfaSecret?: string;
    timezone: string;
    passHash?: string;
    passSalt: string;
    contacts: UserContact[];
}

/**
 * Primitive UsersRepo interface. In production, for performance reasons
 * it would be beneficial to break it down further into more distinct functions,
 * as currently the services need to read a user in whole and then update as a whole.
 * There is a great benefit in having individual methods for contacts CRUD, etc.
 */
export interface UsersRepo {
    create: (record: UserRecord) => Promise<UserID>;
    find: (identity: UserLookup) => Promise<UserRecord | undefined>;
    update: (record: UserRecord) => Promise<void>;
    remove: (id: UserID) => Promise<void>;
}

// An error thrown when a record is not found
export class RepoNotFoundError extends Error {
}

// An error thrown when a record is already present
export class RepoAlreadyExistsError extends Error {
}

// Very primitive implementation of the UsersRepo with in memory storage.
// Does not focus on efficiency.
export class UsersRepoMemory implements UsersRepo {
    private users: UserRecord[];
    private logger: Logger;

    constructor(logger: Logger) {
        this.users = [];
        this.logger = logger;
        this.logger.logf(LogLevel.Info, `Users in memory repo created`);
    }

    create(record: UserRecord): Promise<UserID> {
        return new Promise(async resolve => {
            // In an SQL database, this would would happen automatically when a non unique
            // ID is provided, but in this case we just make sure that user doesn't exist
            // in the list already.
            const lookups = [
                UserLookup.fromUserID(record.user.id),
                ...record.contacts.map(c =>
                    c.type === 'phone' ? lookupFromPhone(c.phone) : lookupFromEmail(c.email)
                )
            ];
            const identities = await Promise.all(lookups.map(l => this.find(l)));
            const exists = identities.filter(i => i ? true : false).length > 0;
            if (exists) {
                throw new RepoAlreadyExistsError();
            }

            this.users.push(record);
            this.logger.logf(LogLevel.Trace, `Created record: ${JSON.stringify(record.user.toJSON())}`);
            resolve(record.user.id);
        });
    }

    find(identity: UserLookup): Promise<UserRecord | undefined> {
        return new Promise(resolve => {
            const user = this.users.find(r => identity.match(
                whenID => r.user.id.id === whenID.id,
                whenEmail => r.contacts.findIndex(c => c.type === 'email' && c.email === sanitizeEmail(whenEmail.email)) >= 0,
                whenPhone => r.contacts.findIndex(c => c.type === 'phone' && c.phone === sanitizePhone(whenPhone.phone)) >= 0,
            ))
            resolve(user);
        });
    }

    update(record: UserRecord): Promise<void> {
        return new Promise(async resolve => {
            const index = this.users.findIndex(u => u.user.id.id === record.user.id.id);
            if (index < 0) {
                const error = `Record is not found for user ${record.user.id.id}`;
                this.logger.logf(LogLevel.Error, error);
                throw new RepoNotFoundError(error);
            }
            this.users[index] = record;
            this.logger.logf(LogLevel.Trace, `Updated record: ${JSON.stringify(record.user.toJSON())}`);
            resolve();
        });
    }

    remove(id: UserID): Promise<void> {
        return new Promise(async resolve => {
            const index = this.users.findIndex(u => u.user.id.id === id.id);
            if (index < 0) {
                const error = `Record is not found for user ${id.id}`;
                this.logger.logf(LogLevel.Error, error);
                throw new RepoNotFoundError(error);
            }
            const retained = this.users[index];
            this.users.splice(index, 1);
            this.logger.logf(LogLevel.Trace, `Removed record: ${JSON.stringify(retained.user.toJSON())}`);
            resolve();
        });
    }
}
