import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import Web3 from "web3";
import {mintNFIAsyncAction} from "./MintNFISlice";
import {
    mintFeeAction,
    reportNFIFeeAction,
    depositsToContractAction, totalDonationsToPMAction,
    validateNFIFeeAction, validationFeeToNFIOwnerAction
} from "./ContractFunctionsSlice";
import {createAction} from "@reduxjs/toolkit";

//events also bring in Pause, Upause, function pause and unpause
//also I have an import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
// import Web3 from "web3";
//
// event Withdraw

function* depositSaga(){

};


function* withdrawSaga(){

};

function* getBalanceSaga(){

};

function* mintFeeSaga(){

};

function* reportNFIFeeSaga(){

};

function* validateNFIFeeSaga(){

};

function* validationFeeToNFIOwnerSaga(){

};

function* totalDonationsToPMSaga(){

};


function* pauseSaga(){
    try{

    }catch (e) {

    }
};

function* setBaseURISaga(){

};




function* totalSupplySaga(){

};

export function* watchContractFunctionsSaga() {
    yield takeLatest(depositsToContractAction.type, depositSaga);
    yield takeLatest(mintFeeAction.type, mintFeeSaga);
    yield takeLatest(reportNFIFeeAction.type, reportNFIFeeSaga);
    yield takeLatest(validateNFIFeeAction.type, validateNFIFeeSaga);
    yield takeLatest(validationFeeToNFIOwnerAction.type, validationFeeToNFIOwnerSaga);
    yield takeLatest(totalDonationsToPMAction.type, totalDonationsToPMSaga);

}









