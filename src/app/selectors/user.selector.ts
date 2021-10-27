import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import {UserModal} from '../domain';

export const selectUser = createSelector(
  (state: AppState) => state.user,
  (user: UserModal) => user
);
