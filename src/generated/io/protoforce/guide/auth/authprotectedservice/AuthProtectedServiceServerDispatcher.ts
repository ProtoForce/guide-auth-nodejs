// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice

import {
  AuthProtectedServiceAddIdentityInput
} from './models/AuthProtectedServiceAddIdentityInput';
import {
  AuthProtectedServiceAddIdentityOutput
} from './models/AuthProtectedServiceAddIdentityOutput';
import {
  AuthProtectedServiceConfirm2FAInput
} from './models/AuthProtectedServiceConfirm2FAInput';
import {
  AuthProtectedServiceConfirm2FAOutput
} from './models/AuthProtectedServiceConfirm2FAOutput';
import {
  AuthProtectedServiceDisable2FAInput
} from './models/AuthProtectedServiceDisable2FAInput';
import {
  AuthProtectedServiceDisable2FAOutput
} from './models/AuthProtectedServiceDisable2FAOutput';
import {
  AuthProtectedServiceListIdentitiesInput
} from './models/AuthProtectedServiceListIdentitiesInput';
import {
  AuthProtectedServiceListIdentitiesOutput
} from './models/AuthProtectedServiceListIdentitiesOutput';
import {
  AuthProtectedServiceRemoveIdentityInput
} from './models/AuthProtectedServiceRemoveIdentityInput';
import {
  AuthProtectedServiceRemoveIdentityOutput
} from './models/AuthProtectedServiceRemoveIdentityOutput';
import {
  AuthProtectedServiceRequest2FAInput
} from './models/AuthProtectedServiceRequest2FAInput';
import {
  AuthProtectedServiceRequest2FAOutput
} from './models/AuthProtectedServiceRequest2FAOutput';
import {
  AuthProtectedServiceServer
} from './AuthProtectedServiceServer';
import {
  AuthProtectedServiceaddIdentityMethodOutputHelper
} from './models/AuthProtectedServiceaddIdentityMethodOutputHelper';
import {
  AuthProtectedServiceconfirm2FAMethodOutputHelper
} from './models/AuthProtectedServiceconfirm2FAMethodOutputHelper';
import {
  AuthProtectedServicedisable2FAMethodOutputHelper
} from './models/AuthProtectedServicedisable2FAMethodOutputHelper';
import {
  AuthProtectedServicelistIdentitiesMethodOutputHelper
} from './models/AuthProtectedServicelistIdentitiesMethodOutputHelper';
import {
  AuthProtectedServiceremoveIdentityMethodOutputHelper
} from './models/AuthProtectedServiceremoveIdentityMethodOutputHelper';
import {
  AuthProtectedServicerequest2FAMethodOutputHelper
} from './models/AuthProtectedServicerequest2FAMethodOutputHelper';
import {
  GenericSuccess
} from '../GenericSuccess';
import {
  KnownIdentities
} from '../KnownIdentities';
import {
  MFAMethodPending
} from '../MFAMethodPending';
import {
  ServiceDispatcherMethods,
  InvalidParamsError,
  Either,
  WithRTTI,
  ServiceDispatcher
} from '../../../../../irt';

export class AuthProtectedServiceServerDispatcher<C = void> implements WithRTTI, ServiceDispatcher<C> {
  private server: AuthProtectedServiceServer<C>;
  static readonly RTTI_CLASS: string = 'AuthProtectedService';
  static readonly RTTI_FQN: string = 'io.protoforce.guide.auth.authprotectedservice:AuthProtectedService';
  
  constructor(server: AuthProtectedServiceServer<C>) {
    this.server = server;
  }
  
  get methods(): ServiceDispatcherMethods {
    return {
      'request2FA': {
        in: AuthProtectedServiceRequest2FAInput,
        out: AuthProtectedServicerequest2FAMethodOutputHelper,
        alternative: true
      },
      'confirm2FA': {
        in: AuthProtectedServiceConfirm2FAInput,
        out: AuthProtectedServiceconfirm2FAMethodOutputHelper,
        alternative: true
      },
      'disable2FA': {
        in: AuthProtectedServiceDisable2FAInput,
        out: AuthProtectedServicedisable2FAMethodOutputHelper,
        alternative: true
      },
      'addIdentity': {
        in: AuthProtectedServiceAddIdentityInput,
        out: AuthProtectedServiceaddIdentityMethodOutputHelper,
        alternative: true
      },
      'removeIdentity': {
        in: AuthProtectedServiceRemoveIdentityInput,
        out: AuthProtectedServiceremoveIdentityMethodOutputHelper,
        alternative: true
      },
      'listIdentities': {
        in: AuthProtectedServiceListIdentitiesInput,
        out: AuthProtectedServicelistIdentitiesMethodOutputHelper,
        alternative: true
      }
    };
  }
  
  dispatch(context: C, method: string, data?: unknown | undefined) {
    switch (method) {
      case 'request2FA': {
        return new Promise((resolve, reject) => {
          try {
            if (!(data instanceof AuthProtectedServiceRequest2FAInput)) {
              throw new InvalidParamsError(`AuthProtectedService.request2FA dispatch data must be of AuthProtectedServiceRequest2FAInput type`);
            }
            const outgoing = this.server.request2FA(
              context,
              data.method
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      case 'confirm2FA': {
        return new Promise((resolve, reject) => {
          try {
            if (!(data instanceof AuthProtectedServiceConfirm2FAInput)) {
              throw new InvalidParamsError(`AuthProtectedService.confirm2FA dispatch data must be of AuthProtectedServiceConfirm2FAInput type`);
            }
            const outgoing = this.server.confirm2FA(
              context,
              data.method
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      case 'disable2FA': {
        return new Promise((resolve, reject) => {
          try {
            const outgoing = this.server.disable2FA(
              context
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      case 'addIdentity': {
        return new Promise((resolve, reject) => {
          try {
            if (!(data instanceof AuthProtectedServiceAddIdentityInput)) {
              throw new InvalidParamsError(`AuthProtectedService.addIdentity dispatch data must be of AuthProtectedServiceAddIdentityInput type`);
            }
            const outgoing = this.server.addIdentity(
              context,
              data.identity
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      case 'removeIdentity': {
        return new Promise((resolve, reject) => {
          try {
            if (!(data instanceof AuthProtectedServiceRemoveIdentityInput)) {
              throw new InvalidParamsError(`AuthProtectedService.removeIdentity dispatch data must be of AuthProtectedServiceRemoveIdentityInput type`);
            }
            const outgoing = this.server.removeIdentity(
              context,
              data.identity
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      case 'listIdentities': {
        return new Promise((resolve, reject) => {
          try {
            const outgoing = this.server.listIdentities(
              context
            );
            Promise.resolve(outgoing).then(
              (r: Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities>) => resolve(r),
              (err) => reject(err)
            );
          } catch (err) {
            reject(err)
          }
        });
      }
             
      default: throw new Error(`Unsupported method '${method}' requested from a dispatcher.`);
    }
  }
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceServerDispatcher.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceServerDispatcher.RTTI_FQN;
  }
  
}