import {all, call} from "redux-saga/effects";
import {watchUserWalletSaga} from './userWalletSaga';
import {watchMintNFISaga} from "./mintNFISaga";
import {watchMintedNFISaga} from "./mintedNFISaga";
import {watchAccountSaga} from "./accountSaga";
import {watchIdentUseParamsSaga} from "./identityPageUseParamsSaga";
import {watchMoniesSaga} from "./moniesSaga";
import {watchMentionsSaga} from "./mentionsSaga";

export default function* rootSaga() {
    yield all([ call(watchUserWalletSaga), call(watchMintNFISaga), call(watchMintedNFISaga), call(watchAccountSaga),
        call(watchIdentUseParamsSaga), call(watchMentionsSaga), call(watchMoniesSaga)]);
}
