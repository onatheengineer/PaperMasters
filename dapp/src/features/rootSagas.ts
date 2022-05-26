import { all, call } from 'redux-saga/effects';
import { watchMintNFISaga } from './mintNFI/mintNFISaga';
import { watchNFIFunctionsSaga } from './mintNFI/mintNFIFunctionsSaga';
import { watchAccountBCSaga } from './accountBC/accountBCSaga';
import { watchAccountDBSaga } from './accountDB/accountDBSaga';
import { watchMentionsSaga } from './accountDB/mentions/mentionsSaga';

export default function* rootSaga() {
  yield all([
    call(watchNFIFunctionsSaga),
    call(watchMintNFISaga),
    call(watchAccountDBSaga),
    call(watchMentionsSaga),
    call(watchAccountBCSaga),
  ]);
}
