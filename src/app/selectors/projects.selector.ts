import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProjects from '../reducers/project.reducer';

export const getProjectsState = createFeatureSelector<fromProjects.ProjectsState>(
  'projects'
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll,
  selectTotal: getProjectTotal
} = fromProjects.adapter.getSelectors(getProjectsState);

/*
export const selectIds = createSelector(
  (state: ProjectsState) => state.ids,
  (ids: string[])  => ids,
);


export const selectEntities = createSelector(
  // @ts-ignore
  (state: ProjectsState) => state.entities,
  (entities: ProjectModal[]) => entities
);

export const selectSelectedId = createSelector(
  // @ts-ignore
  (state: AppState) => state.projectsState,
  (projectsState: ProjectsState) => projectsState,
  (selectedId: string) => selectedId
)

export const selectAll = createSelector(
  selectIds,
  selectEntities,
  (ids: string[], entities: ProjectModal[]) => {

    // @ts-ignore
    return ids?.map(id => entities[id])
  }
)*/

