import {AuthModal} from '../domain';
import {createReducer, on} from '@ngrx/store';
import {
  loginFailureAction,
  loginSuccessAction,
  registerFailureAction,
  registerSuccessAction
} from '../actions/auth.action';

export const initialState: AuthModal = {

};

export const authReducer = createReducer(
  initialState,
  on(loginSuccessAction, (state, {auth}) => auth),
  on(registerSuccessAction, (state, {auth}) => auth),
  on(loginFailureAction, (state)  => initialState),
  on(registerFailureAction, (state) => initialState)
);

