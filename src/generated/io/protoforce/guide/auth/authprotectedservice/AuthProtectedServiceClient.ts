// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice

import {
  AuthProtectedServiceAddIdentityOutput
} from './models/AuthProtectedServiceAddIdentityOutput';
import {
  AuthProtectedServiceClientDefn
} from './AuthProtectedServiceClientDefn';
import {
  AuthProtectedServiceConfirm2FAOutput
} from './models/AuthProtectedServiceConfirm2FAOutput';
import {
  AuthProtectedServiceDisable2FAOutput
} from './models/AuthProtectedServiceDisable2FAOutput';
import {
  AuthProtectedServiceListIdentitiesOutput
} from './models/AuthProtectedServiceListIdentitiesOutput';
import {
  AuthProtectedServiceRemoveIdentityOutput
} from './models/AuthProtectedServiceRemoveIdentityOutput';
import {
  AuthProtectedServiceRequest2FAOutput
} from './models/AuthProtectedServiceRequest2FAOutput';
import {
  ClientTransport,
  HTTPClientTransportOptions,
  HTTPClientTransport,
  PromiseEx,
  Either,
  WithRTTI
} from '../../../../../irt';
import {
  GenericSuccess
} from '../GenericSuccess';
import {
  KnownIdentities
} from '../KnownIdentities';
import {
  MFAMethodConfirm
} from '../MFAMethodConfirm';
import {
  MFAMethodConfirmTypes
} from '../MFAMethodConfirmTypes';
import {
  MFAMethodPending
} from '../MFAMethodPending';
import {
  MFAMethodRequest
} from '../MFAMethodRequest';
import {
  MFAMethodRequestTypes
} from '../MFAMethodRequestTypes';
import {
  SecondaryIdentity
} from '../SecondaryIdentity';
import {
  SecondaryIdentityTypes
} from '../SecondaryIdentityTypes';
import {
  authProtectedServiceAddIdentity
} from './methods/authProtectedServiceAddIdentity';
import {
  authProtectedServiceConfirm2FA
} from './methods/authProtectedServiceConfirm2FA';
import {
  authProtectedServiceDisable2FA
} from './methods/authProtectedServiceDisable2FA';
import {
  authProtectedServiceListIdentities
} from './methods/authProtectedServiceListIdentities';
import {
  authProtectedServiceRTTI
} from './methods/authProtectedServiceRTTI';
import {
  authProtectedServiceRemoveIdentity
} from './methods/authProtectedServiceRemoveIdentity';
import {
  authProtectedServiceRequest2FA
} from './methods/authProtectedServiceRequest2FA';

export class AuthProtectedServiceClient<C = void> implements AuthProtectedServiceClientDefn<C>, WithRTTI {
  private transport: ClientTransport<C>;
  static readonly RTTI_CLASS: string = authProtectedServiceRTTI.RTTI_CLASS;
  static readonly RTTI_FQN: string = authProtectedServiceRTTI.RTTI_FQN;
  
  get RTTI_CLASS(): string {
    return AuthProtectedServiceClient.RTTI_CLASS;
  }
  
  get RTTI_FQN(): string {
    return AuthProtectedServiceClient.RTTI_FQN;
  }
  
  constructor(transport: ClientTransport<C>) {
    this.transport = transport;
  }
  
  static fromHTTP<C = void>(endpoint: string, options?: Partial<HTTPClientTransportOptions> | undefined): AuthProtectedServiceClient<C> {
    return new AuthProtectedServiceClient<C>(
      new HTTPClientTransport(endpoint, options)
    );
  }
  
  /**
    * 
    *  Request two factor authentication
    * 
    * Defined at auth.service.pfm @ 109:3
    */
  request2FA(method: MFAMethodRequestTypes | MFAMethodRequest, _context?: C | undefined): PromiseEx<Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending>> {
    return authProtectedServiceRequest2FA({method}, this.transport, _context);
  }
  
  /**
    * 
    *  Confirm two factor authentication
    * 
    * Defined at auth.service.pfm @ 114:3
    */
  confirm2FA(method: MFAMethodConfirmTypes | MFAMethodConfirm, _context?: C | undefined): PromiseEx<Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess>> {
    return authProtectedServiceConfirm2FA({method}, this.transport, _context);
  }
  
  /**
    * 
    *  Disable two factor authentication
    * 
    * Defined at auth.service.pfm @ 119:3
    */
  disable2FA(_context?: C | undefined): PromiseEx<Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess>> {
    return authProtectedServiceDisable2FA(this.transport, _context);
  }
  
  /**
    * 
    *  Add secondary identity
    * 
    * Defined at auth.service.pfm @ 125:3
    */
  addIdentity(identity: SecondaryIdentityTypes | SecondaryIdentity, _context?: C | undefined): PromiseEx<Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess>> {
    return authProtectedServiceAddIdentity({identity}, this.transport, _context);
  }
  
  /**
    * 
    *  Remove secondary identity
    * 
    * Defined at auth.service.pfm @ 130:3
    */
  removeIdentity(identity: SecondaryIdentityTypes | SecondaryIdentity, _context?: C | undefined): PromiseEx<Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess>> {
    return authProtectedServiceRemoveIdentity({identity}, this.transport, _context);
  }
  
  /**
    * 
    *  List known identities
    * 
    * Defined at auth.service.pfm @ 135:3
    */
  listIdentities(_context?: C | undefined): PromiseEx<Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities>> {
    return authProtectedServiceListIdentities(this.transport, _context);
  }
  
}