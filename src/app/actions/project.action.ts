import {createAction, props} from '@ngrx/store';
import {ProjectModal, UserModal} from '../domain';

// add project actions
export const addProjectAction = createAction(
  '[PROJECT ADD] ADD',
  props<{ project: ProjectModal }>()
);

export const addProjectSuccessAction = createAction(
  '[PROJECT ADD] ADD SUCCESS',
  props<{ project: ProjectModal }>()
);

export const addProjectFailureAction = createAction(
  '[PROJECT ADD] ADD FAILURE',
  props<{message: string}>()
);

// update project actions


export const updateProjectAction = createAction(
  '[PROJECT UPDATE] UPDATE',
  props<{ project: ProjectModal }>()
);

export const updateProjectSuccessAction = createAction(
  '[PROJECT UPDATE] UPDATE SUCCESS',
  props<{ project: ProjectModal }>()
);

export const updateProjectFailureAction = createAction(
  '[PROJECT UPDATE] UPDATE FAILURE',
  props<{message: string}>()
);


// delete project actions

export const deleteProjectAction = createAction(
  '[PROJECT DELETE] DELETE',
  props<{ project: ProjectModal }>()
);

export const deleteProjectSuccessAction = createAction(
  '[PROJECT DELETE] DELETE SUCCESS',
  props<{ project: ProjectModal }>()
);

export const deleteProjectFailureAction = createAction(
  '[PROJECT DELETE] DELETE FAILURE',
  props<{message: string}>()
);

//load projects actions

export const loadProjectAction = createAction(
  '[PROJECT LOAD] LOAD',
);

export const loadProjectSuccessAction = createAction(
  '[PROJECT LOAD] LOAD SUCCESS',
  props<{ projects: ProjectModal[] }>()
);

export const loadProjectFailureAction = createAction(
  '[PROJECT LOAD] LOAD FAILURE',
  props<{ message: string }>()
);


// invite members actions

export const inviteMemberAction = createAction(
  '[PROJECT INVITE] INVITE',
  props<{ projectId: string, members: UserModal[] }>()
);

export const inviteMemberSuccessAction = createAction(
  '[PROJECT INVITE] INVITE SUCCESS',
  props<{ project: ProjectModal }>()
);

export const inviteMemberFailureAction = createAction(
  '[PROJECT INVITE] INVITE FAILURE',
  props<{ message: string }>()
);

// select single project action

export const selectProjectDetailAction = createAction(
  '[PROJECT DETAIL] SELECT DETAIL',
  props<{ project: ProjectModal }>()
);



