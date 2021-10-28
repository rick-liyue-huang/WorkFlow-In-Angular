import {createFeatureSelector} from '@ngrx/store';
import * as fromTaskLists from '../reducers/task-list.reducer';


export const getTaskListsState = createFeatureSelector<fromTaskLists.TaskListsState>(
  'taskLists'
);


export const {
  selectIds: getTaskListIds,
  selectEntities: getTaskListEntities,
  selectAll: getTaskLists,
  selectTotal: getTaskListTotal
} = fromTaskLists.adapter.getSelectors(getTaskListsState);
