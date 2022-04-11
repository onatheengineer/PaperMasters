import { configureStore} from '@reduxjs/toolkit';
import registerSlice from "../features/accountBC/AccountBCSlice";
import mintSlice from '../features/contractsBC/mintNFI/MintNFISlice';
import createSaga from "redux-saga";
import rootSaga from "../features/rootSagas";
import accountSlice from "../features/accountDB/AccountDBSlice";
import mentionsSlice from "../features/accountDB/mentions/MentionsSlice";
import contractFunctionsSlice from '../features/contractsBC/mintNFI/MintNFIFunctionsSlice'
import toastSlice from "../features/toast/redux/toastSlice";

const sagaMiddleware = createSaga();

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  reducer: {
    register: registerSlice,
    mint: mintSlice,
    structBC: structBCSlice,
    account: accountSlice,
    identUseParams: identUseParamsSlice,
    mentions: mentionsSlice,
    functions: contractFunctionsSlice,
    toast: toastSlice,
  },
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


