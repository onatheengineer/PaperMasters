/* eslint-disable no-param-reassign */
import { createAction, createSlice } from '@reduxjs/toolkit';

interface FeeState {
  supportDeposit: number;
  baseMintFee: number;
  NFIMintFee: number;
  supportPMDonation: number;
}

const initialState: FeeState = {
  supportDeposit: 0,
  baseMintFee: 10000000000000000000,
  NFIMintFee: 1,
  supportPMDonation: 0,
};

const MintNFIFunctionsSlice = createSlice({
  name: 'functions',
  initialState,
  reducers: {
    // this is the support PM function, then I can visually show it on their page...OR the contract page
    supportDeposit(state, action) {
      state.supportDeposit = action.payload;
    },
    NFIMintFee(state, action) {
      state.NFIMintFee = action.payload;
    },
  },
});

export const { supportDeposit, NFIMintFee } = MintNFIFunctionsSlice.actions;

export const depositsToContractAction = createAction(
  'DEPOSIT_TO_CONTRACT_SAGA',
);
export const withdrawAction = createAction('WITHDRAW__SAGA');
export const mintFeeAction = createAction('BASE_MINT_FEE_SAGA');
export const reportNFIFeeAction = createAction('REPORT_NFI_FEE_SAGA');
export const validateNFIFeeAction = createAction('VALIDATE_NFI_FEE_SAGA');
export const validationFeeToNFIOwnerAction = createAction(
  'VALIDATE_NFI_FEE_TO_OWNER_SAGA',
);
export const totalDonationsToPMAction = createAction('DONATIONS_TO_PM_SAGA');

export default MintNFIFunctionsSlice.reducer;
