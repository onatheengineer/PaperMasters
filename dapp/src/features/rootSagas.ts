import {all, call} from "redux-saga/effects";
import {watchMintNFISaga} from "./contractsBC/mintNFI/mintNFISaga";
import {watchNFIFunctionsSaga} from './contractsBC/mintNFI/mintNFIFunctionsSaga'
import {watchGetAccountArrSaga} from './accountBC/accountBCSaga'
import {watchAccountSaga} from './accountDB/accountDBSaga'
import {watchMentionsSaga} from "./accountDB/mentions/mentionsSaga";
import {watchLedgerSaga} from "./accountBC/ledger/LedgerSaga";
import {watchStructBCSaga} from "./receiptBC/structBCSaga";

export default function* rootSaga() {
    yield all([ call(watchNFIFunctionsSaga), call(watchMintNFISaga), call(watchGetAccountArrSaga), call(watchAccountSaga),
       call(watchMentionsSaga), call(watchLedgerSaga), call(watchStructBCSaga)]);
}
