import { configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import createSaga from "redux-saga";
import rootSaga from "../features/rootSagas";
import accountDBSlice from "../features/accountDB/AccountDBSlice";
import accountBCSlice from "../features/accountBC/AccountBCSlice";
import mentionsSlice from "../features/accountDB/mentions/MentionsSlice";
import contractFunctionsSlice from '../features/contractsBC/mintNFI/MintNFIFunctionsSlice'
import nfiSlice from '../features/contractsBC/mintNFI/MintNFISlice';
import toastSlice from "../features/toast/ToastSlice";
import {accountDBApi, nfiBCApi, queryBCApi} from "../features/reactQuery/RTKQuery";

const sagaMiddleware = createSaga();

export const store = configureStore({
  reducer: {
    [accountDBApi.reducerPath]: accountDBApi.reducer,
    [nfiBCApi.reducerPath]: nfiBCApi.reducer,
    [queryBCApi.reducerPath]: queryBCApi.reducer,
    accountBC: accountBCSlice,
    accountDB: accountDBSlice,
    nfi: nfiSlice,
    mentions: mentionsSlice,
    functions: contractFunctionsSlice,
    toast: toastSlice,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware).concat(accountDBApi.middleware).concat(nfiBCApi.middleware).concat(queryBCApi.middleware),
});

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);


