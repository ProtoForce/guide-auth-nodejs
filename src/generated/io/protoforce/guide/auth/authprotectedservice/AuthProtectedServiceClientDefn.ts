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
  PromiseEx,
  Either
} from '../../../../../irt';
import {
  SecondaryIdentity
} from '../SecondaryIdentity';
import {
  SecondaryIdentityTypes
} from '../SecondaryIdentityTypes';

/**
  * 
  *  Protected authentication service, requires authentication header to be present
  *  on all rquests, otherwise forbidden error is returned.
  * 
  * Service io.protoforce.guide.auth.authprotectedservice:AuthProtectedService
  * 
  * Defined at auth.service.pfm @ 105:1
  */
export interface AuthProtectedServiceClientDefn<C = void> {
  /**
    * 
    *  Request two factor authentication
    * 
    * Defined at auth.service.pfm @ 110:3
    */
  request2FA(method: MFAMethodRequestTypes | MFAMethodRequest, _context?: C | undefined): PromiseEx<Either<AuthProtectedServiceRequest2FAOutput, MFAMethodPending>>;
  /**
    * 
    *  Confirm two factor authentication
    * 
    * Defined at auth.service.pfm @ 115:3
    */
  confirm2FA(method: MFAMethodConfirmTypes | MFAMethodConfirm, _context?: C | undefined): PromiseEx<Either<AuthProtectedServiceConfirm2FAOutput, GenericSuccess>>;
  /**
    * 
    *  Disable two factor authentication
    * 
    * Defined at auth.service.pfm @ 120:3
    */
  disable2FA(_context?: C | undefined): PromiseEx<Either<AuthProtectedServiceDisable2FAOutput, GenericSuccess>>;
  /**
    * 
    *  Add secondary identity
    * 
    * Defined at auth.service.pfm @ 126:3
    */
  addIdentity(identity: SecondaryIdentityTypes | SecondaryIdentity, _context?: C | undefined): PromiseEx<Either<AuthProtectedServiceAddIdentityOutput, GenericSuccess>>;
  /**
    * 
    *  Remove secondary identity
    * 
    * Defined at auth.service.pfm @ 131:3
    */
  removeIdentity(identity: SecondaryIdentityTypes | SecondaryIdentity, _context?: C | undefined): PromiseEx<Either<AuthProtectedServiceRemoveIdentityOutput, GenericSuccess>>;
  /**
    * 
    *  List known identities
    * 
    * Defined at auth.service.pfm @ 136:3
    */
  listIdentities(_context?: C | undefined): PromiseEx<Either<AuthProtectedServiceListIdentitiesOutput, KnownIdentities>>;
}