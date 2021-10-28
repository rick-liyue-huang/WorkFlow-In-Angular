import {ProjectModal, QuoteModal, TaskListModal} from '../domain';
import {createReducer, on} from '@ngrx/store';
import * as _ from 'lodash';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {
  addTaskListSuccessAction,
  deleteTaskListSuccessAction, loadTaskListSuccessAction, swapTaskListSuccessAction,
  updateTaskListSuccessAction
} from '../actions/task-list.action';
import {deleteProjectSuccessAction, selectProjectDetailAction} from '../actions/project.action';


export interface TaskListsState extends EntityState<TaskListModal>{
}

export function sortByOrder(a: TaskListModal, b: TaskListModal): number {
  return a.order > b.order ? 1 : a.order === b.order ? 0 : -1;
}

export const adapter: EntityAdapter<TaskListModal> = createEntityAdapter<TaskListModal>({
  selectId: (taskList: TaskListModal) => <string>taskList.id,
  sortComparer: sortByOrder,
});

export const initialState: TaskListsState = adapter.getInitialState();

export const tasklistsReducer = createReducer(
  initialState,
  on(addTaskListSuccessAction, (state, action) =>  ({...adapter.addOne(action.taskList, state)})),
  on(deleteTaskListSuccessAction, (state, action) => ({...adapter.removeOne(<string>action.taskList.id, state)})),
  on(updateTaskListSuccessAction, (state, action) => ({...adapter.updateOne({id: <string>action.taskList.id, changes: action.taskList}, state)})),
  on(loadTaskListSuccessAction, (state, action) => ({...adapter.addMany(action.taskLists, state)})),
  on(swapTaskListSuccessAction, (state, action) => ({...swapOrder(state, action)})),
//   delete project
  on(deleteProjectSuccessAction, (state, action) => ({...delListByPrj(state, action)})),
  on(selectProjectDetailAction, (state, action) => {
    return selectProj(state, action);
  })
);

const swapOrder = (state: TaskListsState, action: any) => {
  const taskLists = <TaskListModal[]>action.taskLists;
  if (taskLists === null) {
    return state;
  }
  return adapter.updateMany(taskLists.map((tl: TaskListModal) => ({id: <string>tl.id, changes: tl})), state);
};

const delListByPrj = (state: TaskListsState, action: any) => {
  const project = <ProjectModal>action.project;
  const taskListIds = <string[]>project.taskLists;
  return adapter.removeMany(taskListIds, state);
};

const selectProj = (state: TaskListsState, action: any) => {
  const selected = <ProjectModal>action.project;
  // @ts-ignore
  const selectedIds = state.ids.filter((id: string | number) => state.entities[id]?.projectId === selected.id);
  return {
    ...state,
    selectedIds: selectedIds
  }
}


