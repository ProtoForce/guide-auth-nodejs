import { User, SignUpEmail, EmailPass } from '@auth/service';

import { createTestBoilerplate } from '../test';

describe('AuthService', () => {
    let prepped: ReturnType<typeof createTestBoilerplate>;
    beforeEach(() => {
        prepped = createTestBoilerplate();
    });
    afterEach(() => {
        prepped.server.stop();
    });

    it('should allow sign up', async () => {
        const { client, server } = prepped;
        const res = await client.auth.signup(new SignUpEmail({timezone: 'UTC', email: 'some@email.com', pass: '123456'}));
        const user = res.bifold(
            whenRight => whenRight.user,
            whenLeft => undefined
        );
        expect(user).toBeDefined();
        expect(user!.verified).toBeFalsy();
    });

    it('should allow sign up & sign in', async () => {
        const { client, server } = prepped;
        await client.auth.signup(new SignUpEmail({timezone: 'UTC', email: 'some@email.com', pass: '123456'}));
        // Now that a user is created, we should be able to sign in with the same creds
        const res = await client.auth.signin(new EmailPass({email: 'some@email.com', pass: '123456'}));
        const user = res.bifold<undefined, User | undefined>(
            whenRight => whenRight.match(
                whenSuccess => whenSuccess.user,
                whemConfirm2FA => undefined
            ),
            whenLeft => undefined
        );
        expect(user).toBeDefined();
        expect(user!.verified).toBeFalsy();
    });
});
