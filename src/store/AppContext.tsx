import React, { createContext, Dispatch, FC, useReducer } from 'react';
import { appReducer, initialState } from './reducer';
import { ActionType, AppState } from './types';

type AppContextType = {
  state: AppState;
  dispatch: Dispatch<ActionType>;
};

const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
