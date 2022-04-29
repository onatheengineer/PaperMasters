import { createApi, fetchBaseQuery,   buildCreateApi, BaseQueryFn, fakeBaseQuery,
    coreModule,
    reactHooksModule } from '@reduxjs/toolkit/query/react'
import {AccountDBInterface, AccountPageInterface, ParamsURLInterface} from '../accountDB/AccountDBSlice.types'
import MintABI from "../../abiFiles/PaperMastersNFI.json";
import {BCStruct} from "../accountBC/AccountBCSlice.types";
import chainIdNetworks from "../JSON/chainId.networks.json";
import Web3 from "web3";
import {mentionsInterface, mentionsStateDictionaryInterface} from "../accountDB/mentions/MentionsSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import {SagaIterator} from "redux-saga";
import {call, put} from "redux-saga/effects";
import {addressHasIdentityBool, addressToTokenBool, addressToTokenID} from "../accountBC/AccountBCSlice";
import chainIdJSON from "../JSON/chainId.json";

export interface accountsApiInterface{
    Count: number,
    Items:AccountDBInterface[]
}
export const accountDBApi= createApi({
    reducerPath: 'accountDBApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com' }),
    tagTypes: ['accountApi'],
    endpoints: (builder) => ({
        getSingleAccount: builder.query<AccountDBInterface, ParamsURLInterface>({
            query: ({chainIdURL, paramsWalletURL}:ParamsURLInterface) => `account/${chainIdURL}/${paramsWalletURL}`,
        }),
        getAllAccount: builder.query<accountsApiInterface, void>({
            query: () => `account`,
        }),
    }),
})

export const mentionsApi= createApi({
    reducerPath: 'mentionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com' }),
    tagTypes: ['mentionsApi'],
    endpoints: (builder) => ({
        getMentions: builder.query<mentionsStateDictionaryInterface, void>({
            query: () => `mentions`
        }),
    }),
})

export const nfiBCApi = createApi({
    reducerPath: 'nfiBCApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['nfiApi'],
        endpoints: (builder) => ({
        getIdentityBC: builder.query<BCStruct[], void>({
            queryFn: fetchIdentities,
        }),
        getSingleIdentityBC: builder.query<Promise<fetchAddressToTokenInterface>, ParamsURLInterface>({
            queryFn: (arg, queryApi, extraOptions, baseQuery)=> {
                return {data:fetchAddressToToken(arg) }
            },
        }),
    }),
})

export async function fetchIdentities() {
    const results = await Promise.all(Object.keys(MintABI.networks).map(async (chainId): Promise<BCStruct[]> => {
            const chainIdSupportedArr = chainIdNetworks.filter((el) => {
                return el.chainId === parseInt(chainId)
            });
            console.log("chainIdSupportedArr", chainIdSupportedArr)
            const rpcSupported = chainIdSupportedArr[0].rpc[0];
            console.log("rpcsupported", rpcSupported)
            const web3 = new Web3(rpcSupported);
            const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[chainId].address);
            const identStructBC = await NFIContract.methods.allIdentityStructs().call();
            return (identStructBC);
        }
    ))
    console.log('results', results)
    return {data:results.flat()};
}
 export interface fetchAddressToTokenInterface{
     addressHasIdentityBool: boolean,
     tokenId: number,
     nfiIdentity: BCStruct | null
 }

export async function fetchAddressToToken({chainIdURL, paramsWalletURL}: ParamsURLInterface):Promise<fetchAddressToTokenInterface>{
    //TODO yield selector bring in accountAcc - also make an addressHasIdentity for the CONNECTED user to stop register
       const fetchDictionary={
           addressHasIdentityBool: false,
           tokenId: 0,
           nfiIdentity: null
    }
        if (paramsWalletURL.length > 0) {
            const web3 = new Web3(chainIdJSON[chainIdURL].rpc[0]);
            console.log("chainIdProviderProvider:", chainIdURL)
            if (Object.prototype.hasOwnProperty.call(MintABI.networks, `${chainIdURL}`)) {
                console.log("MintABI.networks[chainIdProviderProvider].address", MintABI.networks[chainIdURL].address)
                const NFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks[chainIdURL].address);
                const addressToTokenIDID = await NFIContract.methods.addressToTokenID(paramsWalletURL[0]).call();
                console.log("addresstotokenId:", addressToTokenIDID)
                const addressToTokenIDIDNUMBER = parseInt(addressToTokenIDID)
                //TODO if addresstoTikenID is a string then the below if statement needs changed
                if (addressToTokenIDIDNUMBER >= 1) {
                    fetchDictionary.addressHasIdentityBool = true;
                    fetchDictionary.tokenId = addressToTokenIDIDNUMBER;
                    const getStructBC = await NFIContract.methods.addressToIdentityStruct(paramsWalletURL).call()
                    fetchDictionary.nfiIdentity = getStructBC;
                }
            }
        }
        return fetchDictionary;
}

export const { useGetSingleAccountQuery, useGetAllAccountQuery} = accountDBApi
export const { useGetIdentityBCQuery, useGetSingleIdentityBCQuery } = nfiBCApi
export const { useGetMentionsQuery } = mentionsApi