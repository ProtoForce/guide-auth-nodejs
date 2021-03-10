// tslint:disable
// eslint-disable
// package io.protoforce.guide.auth.authprotectedservice

import {
  AuthProtectedServiceAddIdentityOutput
} from './models/AuthProtectedServiceAddIdentityOutput';
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
  AuthProtectedServiceServer
} from './AuthProtectedServiceServer';
import {
  AuthProtectedServiceServerDispatcher
} from './AuthProtectedServiceServerDispatcher';
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
  MFAMethodPending
} from '../MFAMethodPending';
import {
  MFAMethodRequest
} from '../MFAMethodRequest';
import {
  SecondaryIdentity
} from '../SecondaryIdentity';
import {
  ServiceDispatcher,
  Either,
  ServiceDispatcherAware
} from '../../../../../irt';

export abstract class AuthProtectedServiceServerBase<C = void> implements ServiceDispatcherAware<C>, AuthProtectedServiceServer<C> {
  $dispatcher(): ServiceDispatcher<C> {
    return new AuthProtectedServiceServerDispatcher(this);
  }
  
  /**
    * 
    *  Request two factor authentication
    * 
    * Defined at auth.service.pfm @ 110:3
    */
  request2FA(context: C, method: MFAMethodRequest): Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending> | Promise<Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending>> {
    throw new Error('request2FA method is not implemented.');
  }
  
  /**
    * 
    *  Confirm two factor authentication
    * 
    * Defined at auth.service.pfm @ 115:3
    */
  confirm2FA(context: C, method: MFAMethodConfirm): Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess> | Promise<Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess>> {
    throw new Error('confirm2FA method is not implemented.');
  }
  
  /**
    * 
    *  Disable two factor authentication
    * 
    * Defined at auth.service.pfm @ 120:3
    */
  disable2FA(context: C): Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess> | Promise<Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess>> {
    throw new Error('disable2FA method is not implemented.');
  }
  
  /**
    * 
    *  Add secondary identity
    * 
    * Defined at auth.service.pfm @ 126:3
    */
  addIdentity(context: C, identity: SecondaryIdentity): Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess> | Promise<Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess>> {
    throw new Error('addIdentity method is not implemented.');
  }
  
  /**
    * 
    *  Remove secondary identity
    * 
    * Defined at auth.service.pfm @ 131:3
    */
  removeIdentity(context: C, identity: SecondaryIdentity): Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess> | Promise<Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess>> {
    throw new Error('removeIdentity method is not implemented.');
  }
  
  /**
    * 
    *  List known identities
    * 
    * Defined at auth.service.pfm @ 136:3
    */
  listIdentities(context: C): Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities> | Promise<Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities>> {
    throw new Error('listIdentities method is not implemented.');
  }
  
}