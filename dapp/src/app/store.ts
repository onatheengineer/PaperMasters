import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import PMIReducer from "../features/CreateSlice";
import searchReducer from '../features/SearchSlice';


export const store = configureStore({
  reducer: {
    PMI: PMIReducer,
    searchPMI: searchReducer,

  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

