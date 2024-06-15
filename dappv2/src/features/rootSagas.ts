import { all, call } from 'redux-saga/effects';

import { watchAccountBCSaga } from './accountBC/accountBCSaga';
import { watchAccountDBSaga } from './accountDB/accountDBSaga';
import { watchMentionsSaga } from './accountDB/mentions/mentionsSaga';
import { watchNFIFunctionsSaga } from './mintNFI/mintNFIFunctionsSaga';
import { watchMintNFISaga } from './mintNFI/mintNFISaga';

export default function* rootSaga() {
  yield all([
    call(watchNFIFunctionsSaga),
    call(watchMintNFISaga),
    call(watchAccountDBSaga),
    call(watchMentionsSaga),
    call(watchAccountBCSaga),
  ]);
}
