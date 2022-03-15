import {all, call} from "redux-saga/effects";
import {watchRequestAccountsSaga} from './requestAccountsSaga';
import {watchMintNFISaga} from "./mintNFISaga";
import {watchDepositToContractSaga} from "./depositToContractSaga";
import {watchMintedNFISaga} from "./mintedNFISaga";
import {watchAccountSaga} from "./accountSaga";
import {watchIdentUseParamsSaga} from "./identityPageUseParamsSaga";

export default function* rootSaga() {
    yield all([ call(watchRequestAccountsSaga), call(watchMintNFISaga), call(watchDepositToContractSaga), call(watchMintedNFISaga), call(watchAccountSaga), call(watchIdentUseParamsSaga)]);
}
