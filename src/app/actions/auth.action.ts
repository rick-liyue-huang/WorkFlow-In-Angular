import {createAction, props} from '@ngrx/store';
import {AuthModal, UserModal} from '../domain';

export const loginAction = createAction(
  '[AUTH LOGIN] LOGIN',
  props<{ email: string; password: string }>()
);

export const loginSuccessAction = createAction(
  '[AUTH LOGIN] LOGIN SUCCESS',
  props<{auth: AuthModal}>()
);

export const loginFailureAction = createAction(
  '[AUTH LOGIN] LOGIN FAILURE',
  props<{message: string}>()
);

export const registerAction = createAction(
  '[AUTH REGISTER] REGISTER',
  props<{user: UserModal}>()
);

export const registerSuccessAction = createAction(
  '[AUTH REGISTER] REGISTER SUCCESS',
  props<{auth: AuthModal}>()
);

export const registerFailureAction = createAction(
  '[AUTH REGISTER] REGISTER FAILURE',
  props<{message: string}>()
);

export const logoutAction = createAction(
  '[AUTH LOGOUT] LOGOUT',
)
