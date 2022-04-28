import { createApi, fetchBaseQuery,   buildCreateApi, BaseQueryFn, fakeBaseQuery,
    coreModule,
    reactHooksModule } from '@reduxjs/toolkit/query/react'
import {AccountDBInterface, AccountPageInterface, ParamsURLInterface} from '../accountDB/AccountDBSlice.types'
import MintABI from "../../abiFiles/PaperMastersNFI.json";
import {BCStruct} from "../accountBC/AccountBCSlice.types";
import chainIdNetworks from "../JSON/chainId.networks.json";
import Web3 from "web3";
import {mentionsInterface, mentionsStateDictionaryInterface} from "../accountDB/mentions/MentionsSlice";

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

export const { useGetSingleAccountQuery, useGetAllAccountQuery} = accountDBApi
export const { useGetIdentityBCQuery } = nfiBCApi
export const { useGetMentionsQuery } = mentionsApi