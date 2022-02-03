import {all, call} from "redux-saga/effects";
import {watchRequestAccountsSaga} from './requestAccountsSaga';

export default function* rootSaga() {
    yield all([ call(watchRequestAccountsSaga)]);
}
