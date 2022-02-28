import { call, put, takeEvery, delay, all, takeLatest, select, fork} from 'redux-saga/effects';
import {unRegisteredNoIdentityAction} from "./IdentityStateSlice";


function* unRegisteredNoIdentitySaga(actionObject: any):any {


}




export function* watchIdentityStateSliceSaga() {
    yield takeLatest(unRegisteredNoIdentityAction.type, unRegisteredNoIdentityAction);

}

