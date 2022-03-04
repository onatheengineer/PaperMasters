import { call, put, takeEvery, delay, all, takeLatest, select, fork} from 'redux-saga/effects';
import {
    registeredIdentityAction,
    unRegisteredNoIdentityAction,
    unRegisteredWithIdentityAction,
    searchParamsAction,
} from "./IdentityStateSlice";


function* unRegisteredNoIdentitySaga(actionObject: any):any {

}

function* unRegisteredWithIdentitySaga(actionObject: any):any {

}

function* registeredIdentitySaga(actionObject: any):any {
}

function* searchWalletAccountEntrySaga(actionObject: any):any {

}


export function* watchIdentityStateSliceSaga() {
    yield takeLatest(unRegisteredNoIdentityAction.type, unRegisteredNoIdentitySaga);
    yield takeLatest(unRegisteredWithIdentityAction.type, unRegisteredWithIdentitySaga);
    yield takeLatest(registeredIdentityAction.type, registeredIdentitySaga);
    yield takeLatest(searchParamsAction.type, searchWalletAccountEntrySaga);

}

