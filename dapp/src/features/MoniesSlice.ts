import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FeeState{
    deposit: number;
    baseMintFee: number;
    reportFee: number;
    validationFee: number;
    validationFeeToNFI: number;
    supportPMDonation: number;
};

const initialState: FeeState = {
    deposit: 0,
    baseMintFee: 10000000000000000000,
    reportFee: 1,
    validationFee: 1,
    validationFeeToNFI: 2,
    supportPMDonation: 0,
};

const MoniesSlice = createSlice( {
   name: 'fees',
   initialState,
    reducers: {
        totalDepositsToContract(state, action){
           state.deposit = action.payload
       },
        currentMintFee(state, action){
           state.baseMintFee = action.payload
        },
        reportNFIFee(state, action){
            state.reportFee = action.payload
        },
        validateNFIFee(state, action){
            state.validationFee = action.payload
        },
        validationFeeToNFIOwner(state, action){
            state.validationFeeToNFI = action.payload
        },
        totalDonationsToPM(state, action){
           state.supportPMDonation = action.payload
        },
    },
});

export const { totalDepositsToContract, currentMintFee, totalDonationsToPM } = MoniesSlice.actions;

export const totalDepositsToContractAsyncAction = createAction<{}>('DEPOSIT_TO_CONTRACT_SAGA');
export const currentMintFeeAsyncAction = createAction<{}>('BASE_MINT_FEE_SAGA');
export const   reportNFIFeeAsyncAction = createAction<{}>('REPORT_NFI_FEE_SAGA');
export const   validateNFIFeeAsyncAction = createAction<{}>('VALIDATE_NFI_FEE_SAGA');
export const   validationFeeToNFIOwnerAsyncAction = createAction<{}>('VALIDATE_NFI_FEE_TO_OWNER_SAGA');
export const   totalDonationsToPMAsyncAction = createAction<{}>('DONATIONS_TO_PM_SAGA');

