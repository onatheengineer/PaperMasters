import {all, call} from "redux-saga/effects";
import {watchUserWalletSaga} from './accountArr/getAccountArrSaga';
import {watchMintNFISaga} from "./mintNFI/mintNFISaga";
import {watchMintedNFISaga} from "./mintedNFISaga";
import {watchAccountSaga} from "./account/accountSaga";
import {watchIdentUseParamsSaga} from "./identityPageUseParamsSaga";
import {watchContractFunctionsSaga} from "./mintNFI/mintNFIFunctionsSaga";
import {watchMentionsSaga} from "./mentions/mentionsSaga";

export default function* rootSaga() {
    yield all([ call(watchUserWalletSaga), call(watchMintNFISaga), call(watchMintedNFISaga), call(watchAccountSaga),
        call(watchIdentUseParamsSaga), call(watchMentionsSaga), call(watchContractFunctionsSaga)]);
}
