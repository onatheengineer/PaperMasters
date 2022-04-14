import { configureStore} from '@reduxjs/toolkit';
import createSaga from "redux-saga";
import rootSaga from "../features/rootSagas";
import accountDBSlice from "../features/accountDB/AccountDBSlice";
import accountBCSlice from "../features/accountBC/AccountBCSlice";
import mentionsSlice from "../features/accountDB/mentions/MentionsSlice";
import contractFunctionsSlice from '../features/contractsBC/mintNFI/MintNFIFunctionsSlice'
import nfiSlice from '../features/contractsBC/mintNFI/MintNFISlice';
import toastSlice from "../features/toast/ToastSlice";

const sagaMiddleware = createSaga();

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  reducer: {
    accountBC: accountBCSlice,
    accountDB: accountDBSlice,
    nfi: nfiSlice,
    mentions: mentionsSlice,
    functions: contractFunctionsSlice,
    toast: toastSlice,
  },
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


