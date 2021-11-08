import { ActionTypes } from './actionTypes';
import { Pokemon } from '../models/pokemon';
import { SortDirectionsTypes } from '../components/Filters';

export type ActionType = {
  type: ActionTypes;
  payload: any;
};

export enum HistoryTypes {
  ALL = 'ALL',
  DELETED = 'DELETED',
  ADDED = 'ADDED',
}

export type HistoryItemType = HistoryTypes.ADDED | HistoryTypes.DELETED;

export type HistoryItem = {
  type: HistoryItemType;
  element: Pokemon;
  timeSave?: Date | string;
};

export interface MainListFilters {
  searchValue?: string;
  sortType?: SortDirectionsTypes;
}

export interface AppState {
  history: HistoryItem[];
  historyType: HistoryTypes;
  mainList: Pokemon[];
  favoritesList: Pokemon[];
  mainListFilters: MainListFilters;
  loadingList: boolean;
}
