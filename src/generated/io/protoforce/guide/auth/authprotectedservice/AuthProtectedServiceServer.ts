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
  Either
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
  MFAMethodPending
} from '../MFAMethodPending';
import {
  MFAMethodRequest
} from '../MFAMethodRequest';
import {
  SecondaryIdentity
} from '../SecondaryIdentity';

/**
  * 
  *  Protected authentication service, requires authentication header to be present
  *  on all rquests, otherwise forbidden error is returned.
  * 
  * Service io.protoforce.guide.auth.authprotectedservice:AuthProtectedService
  * 
  * Defined at auth.service.pfm @ 104:1
  */
export interface AuthProtectedServiceServer<C = void> {
  /**
    * 
    *  Request two factor authentication
    * 
    * Defined at auth.service.pfm @ 109:3
    */
  request2FA(context: C, method: MFAMethodRequest): Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending> | Promise<Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending>>;
  /**
    * 
    *  Confirm two factor authentication
    * 
    * Defined at auth.service.pfm @ 114:3
    */
  confirm2FA(context: C, method: MFAMethodConfirm): Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess> | Promise<Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess>>;
  /**
    * 
    *  Disable two factor authentication
    * 
    * Defined at auth.service.pfm @ 119:3
    */
  disable2FA(context: C): Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess> | Promise<Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess>>;
  /**
    * 
    *  Add secondary identity
    * 
    * Defined at auth.service.pfm @ 125:3
    */
  addIdentity(context: C, identity: SecondaryIdentity): Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess> | Promise<Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess>>;
  /**
    * 
    *  Remove secondary identity
    * 
    * Defined at auth.service.pfm @ 130:3
    */
  removeIdentity(context: C, identity: SecondaryIdentity): Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess> | Promise<Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess>>;
  /**
    * 
    *  List known identities
    * 
    * Defined at auth.service.pfm @ 135:3
    */
  listIdentities(context: C): Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities> | Promise<Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities>>;
}