import { ActionType, HistoryItem, HistoryTypes, MainListFilters } from './types';
import { ActionTypes } from './actionTypes';
import { Pokemon } from '../models/pokemon';

export const addHistoryItem = (historyItem: HistoryItem): ActionType => ({
  type: ActionTypes.CHANGE_HISTORY,
  payload: {
    timeSave: new Date().toDateString(),
    ...historyItem,
  } as HistoryItem,
});

export const setHistoryType = (historyType: HistoryTypes): ActionType => ({
  type: ActionTypes.CHANGE_HISTORY_TYPE,
  payload: historyType,
});

export const setMainList = (pokemons: Pokemon[]): ActionType => ({
  type: ActionTypes.SET_MAIN_LIST,
  payload: pokemons,
});

export const setFavoriteList = (pokemons: Pokemon[]): ActionType => ({
  type: ActionTypes.SET_FAVORITE_LIST,
  payload: pokemons,
});

export const setFilters = (filters: MainListFilters): ActionType => ({
  type: ActionTypes.SET_FILTERS,
  payload: filters,
});

export const setLoadingList = (loading: boolean): ActionType => ({
  type: ActionTypes.SET_LOADING,
  payload: loading,
});
