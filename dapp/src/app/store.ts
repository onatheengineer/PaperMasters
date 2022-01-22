import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import PMIReducer from "../features/PMISlice";
import searchReducer from '../features/SearchSlice';
import think from 'redux-thunk';



export const store = configureStore({
  reducer: {
    PMI: PMIReducer,
    searchPMI: searchReducer,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


//create PM Identity
//
// export const PMIDENTITY_ADDED_AS_BLOCKCHAIN_TRANSACTION = 'PMIDENTITY_ADDED_AS_BLOCKCHAIN_TRANSACTION';
//
// export const PMIDENTITY_ADDED_TO_WALLET = 'PMIDENTITY_ADDED_TO_WALLET';
//
// export const PMIDENTITY_ADDED_TO_SEARCH = 'PMIDENTITY_ADDED_TO_SEARCH';
//
// export const PMIDENTITY_ADDED_TO_ACCOUNTPAGE = 'PMIDENTITY_ADDED_TO_ACCOUNTPAGE';

//transfer existing NTF to self with attached PM Identity #

// export const PMIDENTITY_ATTACHED_TO_EXISTING_NFT = 'PMIDENTITY_ATTACHED_TO_EXISTING_NFT';

//Search all NFT's from multiple persons account
//map over all accounts to find all exisiting PMI identiites as well as all non=PMI tokens

//mint new NFT with attached PM Identity

//attach minted 'validate' NFTs to existing PM Identities

