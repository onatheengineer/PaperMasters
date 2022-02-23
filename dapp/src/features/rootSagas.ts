import {all, call} from "redux-saga/effects";
import {watchRequestAccountsSaga} from './requestAccountsSaga';
import {watchMintNFISaga} from "./mintNFISaga";
import {watchDepositToContractSaga} from "./depositToContractSaga";

export default function* rootSaga() {
    yield all([ call(watchRequestAccountsSaga), call(watchMintNFISaga), call(watchDepositToContractSaga)]);
}