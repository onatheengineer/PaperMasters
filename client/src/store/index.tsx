// @ts-ignore
import { combineReducers } from '@reduxjs/toolkit';
// @ts-ignore
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import web3Slice, { Web3State } from './slices/web3';
import { connectRouter } from 'connected-react-router';

const persistConfig = {
  key: 'root',
  storage,
  transforms: [],
  autoMergeLevel2: true,
  whitelist: [],
};

export interface RootState {
  [web3Slice.name]: Web3State;
}

const rootReducer = (history: any) => (state: any, action: any) => {
  return appReducer(history)(state, action);
};

const appReducer = (history: any) =>
  combineReducers({
    [web3Slice.name]: web3Slice.reducer,
    router: connectRouter(history),
  });

export const createAppStore = (history: any) => {
  let root = rootReducer(history);
  let persistedReducer = persistReducer(persistConfig, root);
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  let persistor = persistStore(store);
  return { store, persistor };
};



/* Utils */
/**
 * Helper function that aids in then naming of Redux Actions.
 * Format is 'topic/ACTION_NAME' (i.e. app/OPEN_CONTEXT_MENU)
 * @param  topic {string}
 * @param name {string}
 * @returns {string}
 */
export const createActionName = (topic: string, name: string): string =>
    `${topic}/${name.toUpperCase()}`;



export default createAppStore;

