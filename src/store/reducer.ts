import { ActionTypes } from './actionTypes';
import { ActionType, AppState, HistoryItem, HistoryTypes, MainListFilters } from './types';
import { Pokemon } from '../models/pokemon';
import { SortDirectionsTypes } from '../components/Filters';

export const initialState: AppState = {
  history: [],
  historyType: HistoryTypes.ALL,
  mainList: [],
  loadingList: false,
  favoritesList: [],
  mainListFilters: {
    searchValue: '',
    sortType: SortDirectionsTypes.ASC,
  },
};

export const appReducer = (state = initialState, action: ActionType): AppState => {
  switch (action.type) {
    case ActionTypes.CHANGE_HISTORY:
      return {
        ...state,
        history: [...state.history, action.payload as HistoryItem],
      };
    case ActionTypes.CHANGE_HISTORY_TYPE:
      return {
        ...state,
        historyType: action.payload as HistoryTypes,
      };
    case ActionTypes.SET_MAIN_LIST:
      return {
        ...state,
        mainList: action.payload as Pokemon[],
      };
    case ActionTypes.SET_FAVORITE_LIST:
      return {
        ...state,
        favoritesList: action.payload as Pokemon[],
      };
    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        mainListFilters: {
          ...state.mainListFilters,
          ...(action.payload as MainListFilters),
        },
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loadingList: action.payload as boolean,
      };
    default:
      return state;
  }
};
