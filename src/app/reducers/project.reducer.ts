import {ProjectModal, QuoteModal} from '../domain';
import {createReducer, on} from '@ngrx/store';
import {
  addProjectSuccessAction,
  deleteProjectSuccessAction,
  inviteMemberSuccessAction,
  loadProjectSuccessAction,
  selectProjectDetailAction,
  updateProjectSuccessAction
} from '../actions/project.action';
import * as _ from 'lodash';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';


export interface ProjectsState extends EntityState<ProjectModal>{
  selectedId: string | null;
}

export function sortByName(a: ProjectModal, b: ProjectModal): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<ProjectModal> = createEntityAdapter<ProjectModal>({
  selectId: (project: ProjectModal) => <string>project.id,
  sortComparer: sortByName,
});

export const initialState: ProjectsState = {
  ids: [],
  entities: {},
  selectedId: null
};

export const projectsReducer = createReducer(
  initialState,
  on(addProjectSuccessAction, (state, action) =>  ({ ...adapter.addOne(action.project, state), selectedId: null })),
  on(deleteProjectSuccessAction, (state, action) => ({ ...adapter.removeOne(<string>action.project.id, state), selectedId: null })),
  on(updateProjectSuccessAction, (state, action) => ({ ...adapter.updateOne({ id: <string>action.project.id, changes: action.project }, state), selectedId: null })),
  on(loadProjectSuccessAction, (state, action) => ({ ...adapter.addMany(action.projects, state), selectedId: null })),
  on(selectProjectDetailAction, (state, action) => ({ ...state, selectedId: <string>action.project.id })),
  // same as updateProject
  on(inviteMemberSuccessAction, (state, action) => ({ ...adapter.updateOne({ id: <string>action.project.id, changes: action.project }, state), selectedId: null }))
);

/*

const addProject = (state: ProjectsState, action: any) => {
  const project = action.project;
  if (state.entities[project.id]) {
    return state;
  }
  const ids = [...state.ids, project.id];
  const entities = {...state.entities, [project.id]: project};
  return {...state, ids: ids, entities: entities}
}

const updateProject = (state: ProjectsState, action: any) => {
  const project = action.project;
  const entities = {...state.entities, [project.id]: project};
  return {...state, entities: entities}
}

const deleteProject = (state: ProjectsState, action: any) => {
  const project = action.project;
  const newIds = state.ids.filter(id => id !== project.id);
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: state.entities[id]}), {});
  return {
    ids: newIds,
    entities: newEntities,
    selectedId: undefined
  }
}

const loadProject = (state: ProjectsState, action: any) => {
  const projects = action.projects;
  const incomingIds = projects.map((p: ProjectModal) => p.id);
  // get the new projects by compare the ids
  const newIds = _.difference(incomingIds, state.ids);
  const incommingEntities = _.chain(projects).keyBy('id').mapValues(o => o).value();
  const newEntities = newIds.reduce((entities, id: string) => ({...entities, [id]: incommingEntities[id]}), {});
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: undefined
  }
}

*/
