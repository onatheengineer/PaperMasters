import { configureStore} from '@reduxjs/toolkit';
import registerSlice from "../features/accountArr/getAccountArrSlice";
import mintSlice from '../features/mintNFI/MintNFISlice';
import mintedSlice from '../features/MintedNFISlice';
import identUseParamsSlice from '../features/IdentityPageUseParamsSlice';
import createSaga from "redux-saga";
import rootSaga from "../features/rootSagas";
import accountSlice from "../features/account/AccountSlice";
import mentionsSlice from "../features/mentions/MentionsSlice";
import contractFunctionsSlice from '../features/mintNFI/MintNFIFunctionsSlice'
import toastSlice from "../features/toast/redux/toastSlice";

const sagaMiddleware = createSaga();

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  reducer: {
    register: registerSlice,
    mint: mintSlice,
    minted: mintedSlice,
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


