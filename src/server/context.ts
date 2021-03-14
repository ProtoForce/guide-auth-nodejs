import { HttpServerContext } from '@auth/irt-node';
import { UserID } from '@auth/service';

// Data to be stored in each request in user context
export interface UserContext {
    userID?: UserID;
}

// Services context, including the system context. We use HTTP server,
// so we place our user context into it, which will add system part and
// our user part.
export type ServiceContext = HttpServerContext<UserContext>;
