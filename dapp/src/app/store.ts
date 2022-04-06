import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import registerSlice from "../features/UserWalletSlice";
import mintSlice from '../features/MintNFISlice';
import mintedSlice from '../features/MintedNFISlice';
import identUseParamsSlice from '../features/IdentityPageUseParamsSlice';
import createSaga from "redux-saga";
import rootSaga from "../features/rootSagas";
import logger from 'redux-logger';
import accountSlice from "../features/AccountSlice";
import {watchIdentUseParamsSaga} from "../features/identityPageUseParamsSaga";
import mentionsSlice from "../features/MentionsSlice";
import contractFunctionsSlice from '../features/ContractFunctionsSlice'
import toastSlice from "../features/toast/redux/toastSlice";



const sagaMiddleware = createSaga();

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(sagaMiddleware),
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
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

