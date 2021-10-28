import {createAction, props} from '@ngrx/store';
import {TaskListModal, UserModal} from '../domain';

// add tasklist actions
export const addTaskListAction = createAction(
  '[TASKLIST ADD] ADD',
  props<{ taskList: TaskListModal }>()
);

export const addTaskListSuccessAction = createAction(
  '[TASKLIST ADD] ADD SUCCESS',
  props<{ taskList: TaskListModal }>()
);

export const addTaskListFailureAction = createAction(
  '[TASKLIST ADD] ADD FAILURE',
  props<{message: string}>()
);

// update tasklist actions


export const updateTaskListAction = createAction(
  '[TASKLIST UPDATE] UPDATE',
  props<{ taskList: TaskListModal }>()
);

export const updateTaskListSuccessAction = createAction(
  '[TASKLIST UPDATE] UPDATE SUCCESS',
  props<{ taskList: TaskListModal }>()
);

export const updateTaskListFailureAction = createAction(
  '[TASKLIST UPDATE] UPDATE FAILURE',
  props<{message: string}>()
);


// delete tasklist actions

export const deleteTaskListAction = createAction(
  '[TASKLIST DELETE] DELETE',
  props<{ taskList: TaskListModal }>()
);

export const deleteTaskListSuccessAction = createAction(
  '[TASKLIST DELETE] DELETE SUCCESS',
  props<{ taskList: TaskListModal }>()
);

export const deleteTaskListFailureAction = createAction(
  '[TASKLIST DELETE] DELETE FAILURE',
  props<{message: string}>()
);

//load tasklist actions

export const loadTaskListAction = createAction(
  '[TASKLIST LOAD] LOAD',
  props<{ message: string }>()
);

export const loadTaskListSuccessAction = createAction(
  '[TASKLIST LOAD] LOAD SUCCESS',
  props<{ taskLists: TaskListModal[] }>()
);

export const loadTaskListFailureAction = createAction(
  '[TASKLIST LOAD] LOAD FAILURE',
  props<{ message: string }>()
);


// invite members actions

export const swapTaskListAction = createAction(
  '[TASKLIST SWAP] SWAP',
  props<{src: TaskListModal; target: TaskListModal}>()
);

export const swapTaskListSuccessAction = createAction(
  '[TASKLIST SWAP] SWAP SUCCESS',
  props<{ taskLists: TaskListModal[] }>()
);

export const swapTaskListFailureAction = createAction(
  '[TASKLIST SWAP] SWAP FAILURE',
  props<{ message: string }>()
);





