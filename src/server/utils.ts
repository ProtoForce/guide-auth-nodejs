import sha256 from 'js-sha256';
import * as https from 'https';
import * as http from 'http';

import { UserLookup, UserLookupEmail, UserLookupPhone } from '@auth/service';

/**
 * Cleanup an email so that it is resilient to user typos
 * related to empty space, casing, etc.
 */
export function sanitizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

/**
 * Cleanup a phone number so that it is resilient to user
 * typos related to phone formatting
 */
export function sanitizePhone(phone: string): string {
    return phone.trim().replace(/\D/g,'');
}

/**
 * Create a lookup structure from an email
 */
export function lookupFromEmail(email: string) {
    return UserLookup.fromEmail(new UserLookupEmail({email: sanitizeEmail(email)}));
}

/**
 * Create a lookup structure from a phone
 */
export function lookupFromPhone(phone: string) {
    return UserLookup.fromPhone(new UserLookupPhone({phone: sanitizePhone(phone)}));
}

/**
 * Hash a password using salt
 * @param pass Password to be hashed
 * @param salt Salt to be used
 * @returns Password in hashed format
 */
export function hashPassword(pass: string, salt: string): string {
    // There are some better algorithms, for example bcrypt
    return sha256.sha256(salt + '#' + pass);
}

export function sendEmail(email: string, content: string) {
    // Pick a provider, such as mailgun, sendgrid, or others
    // and from here an email can be sent
}

export function sendSMS(phone: string, content: string) {
    // Pick a provider, such as twilio, and from here an
    // SMS can be sent
}

/**
 * Generate random phone code which can be used for verification
 * purposes.
 */
export function generatePhoneCode(): string {
    return Math.floor(Math.random() * 999999 + 1).toString();
}

/**
 * Basic HTTP request method
 * @param request request type and payload if needed
 * @param endpoint endpoint to be called
 * @param headers optional headers to be set
 * @returns response body parsed using JSON.parse
 */
export function httpRequest<T, P = unknown>(
    request: {method: 'GET'} | {method: 'POST', payload: P},
    endpoint: string,
    headers: {[key: string]: string} = {}
): Promise<T> {
    return new Promise(async (resolve, reject) => {
        const json = request.method === 'POST' ? JSON.stringify(request.payload) : undefined;
        const url = new URL(endpoint);
        const opts: https.RequestOptions = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: request.method,
            headers: request.method === 'POST' ? {
                ...headers,
                'Content-Type': 'application/json',
                'Content-Length': json!.length
            } : headers,
            timeout: 60000
        };

        const process = (res: http.IncomingMessage) => {
            let body = '';
            res.on('data', function(d) {
                body += d;
            });
            res.on('end', function() {
                resolve(JSON.parse(body));
            });
        }

        const req = https.request(opts, process);
        req.on('error', err => {
            reject(new Error(`Failure during request ${err}`));
        });
        if (request.method === 'POST') {
            req.write(json);
        }
    });
}
