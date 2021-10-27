import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import {AuthModal} from '../domain';

export const selectAuth = createSelector(
  (state: AppState)  => state.auth,
  (auth: AuthModal)  => auth
);
