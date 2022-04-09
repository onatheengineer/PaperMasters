import {all, call} from "redux-saga/effects";
import {watchMintNFISaga} from "./mintNFI/mintNFISaga";
import {watchNFIFunctionsSaga} from './mintNFI/mintNFIFunctionsSaga'
import {watchGetAccountArrSaga} from './accountArr/getAccountArrSaga'
import {watchAccountSaga} from './account/identityPageSaga'
import {watchMentionsSaga} from "./mentions/mentionsSaga";
import {watchLedgerSaga} from "./ledger/LedgerSaga";

export default function* rootSaga() {
    yield all([ call(watchNFIFunctionsSaga), call(watchMintNFISaga), call(watchGetAccountArrSaga), call(watchAccountSaga),
       call(watchMentionsSaga), call(watchLedgerSaga)]);
}
