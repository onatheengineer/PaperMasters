import {all, call} from "redux-saga/effects";
import {watchRequestAccountsSaga} from './requestAccountsSaga';
import {watchMintIdentitySaga} from "./mintIdentitySaga";

export default function* rootSaga() {
    yield all([ call(watchRequestAccountsSaga), call(watchMintIdentitySaga), call(watchMintIdentitySaga)]);
}
