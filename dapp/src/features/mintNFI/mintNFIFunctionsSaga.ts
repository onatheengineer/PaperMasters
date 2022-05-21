import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import Web3 from "web3";
import {
    mintFeeAction,
    reportNFIFeeAction,
    depositsToContractAction, totalDonationsToPMAction,
    validateNFIFeeAction, validationFeeToNFIOwnerAction
} from "./MintNFIFunctionsSlice";
import {createAction} from "@reduxjs/toolkit";

//events also bring in Pause, Upause, function pause and unpause
//also I have an import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
// import Web3 from "web3";
//
// event Withdraw

function* depositSaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}


function* withdrawSaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}

function* getBalanceSaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}

function* mintFeeSaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}

function* reportNFIFeeSaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}

function* validateNFIFeeSaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}

function* validationFeeToNFIOwnerSaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}

function* totalDonationsToPMSaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}

function* pauseSaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}

function* setBaseURISaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}

function* totalSupplySaga(){
    try{
        yield console.log('saga')
    }catch (e) {
        console.error('saga Error', e)
    }
}

export function* watchNFIFunctionsSaga() {
    yield takeLatest(depositsToContractAction.type, depositSaga);
    yield takeLatest(mintFeeAction.type, mintFeeSaga);
    yield takeLatest(reportNFIFeeAction.type, reportNFIFeeSaga);
    yield takeLatest(validateNFIFeeAction.type, validateNFIFeeSaga);
    yield takeLatest(validationFeeToNFIOwnerAction.type, validationFeeToNFIOwnerSaga);
    yield takeLatest(totalDonationsToPMAction.type, totalDonationsToPMSaga);

}