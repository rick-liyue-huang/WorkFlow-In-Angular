import {AuthModal, QuoteModal, UserModal} from '../domain';
import {ProjectsState} from '../reducers/project.reducer';
import { TaskListsState } from '../reducers/task-list.reducer';

export interface AppState {
  quote: QuoteModal;
  user: UserModal;
  auth: AuthModal;
  projectsState: ProjectsState;
  taskListState: TaskListsState
}

