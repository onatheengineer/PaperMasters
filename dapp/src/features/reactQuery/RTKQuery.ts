import { createApi, fetchBaseQuery,   buildCreateApi, BaseQueryFn, fakeBaseQuery,
    coreModule,
    reactHooksModule } from '@reduxjs/toolkit/query/react'
import {AccountDBInterface, AccountPageInterface, ParamsURLInterface} from '../accountDB/AccountDBSlice.types'
import MintABI from "../../abiFiles/PaperMastersNFI.json";
import chainIdNetworks from "../JSON/chainId.networks.json";
import Web3 from "web3";
import chainIdJSON from "../JSON/chainId.json";
import {BigNumber, ethers} from "ethers";
import {call} from "redux-saga/effects";

export interface accountsApiInterface{
    Count: number,
    Items:AccountDBInterface[]
}

export interface singleAccountsApiInterface{
    Item:AccountDBInterface
}

export interface postMentionInterface {
    chainId: string,
    walletAccount: string;
    fromChainId: string;
    fromWallet: string;
    replyToMentionId: string;
    fakeDelete: boolean;
    messageBody: string;
    radioType: -1 | 1 | 0;
}

export interface getMentionInterface {
    mentionId: string,
    chainId_walletAccount_Pkey: string,
    chainId: string,
    walletAccount: string;
    fromChainId: string;
    fromWallet: string;
    replyToMentionId: string;
    fakeDelete: boolean;
    messageBody: string;
    radioType: -1 | 1 | 0;
    timeStamp: number;
}

export interface getMentionsApiInterface{
    Count: number,
    Items:getMentionInterface[]
}
export const accountDBApi= createApi({
    reducerPath: 'accountDBApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com' }),
    tagTypes: ['singleAccountApi', 'allAccountApi', 'getMentionApi'],
    endpoints: (builder) => ({
        getSingleAccount: builder.query<singleAccountsApiInterface, ParamsURLInterface>({
            query: ({chainIdURL, paramsWalletURL}:ParamsURLInterface) => `account/${chainIdURL}/${paramsWalletURL}`,
            providesTags: ['singleAccountApi'],
        }),
        getAllAccount: builder.query<accountsApiInterface, void>({
            query: () => `account`,
            providesTags: ['allAccountApi']
        }),
        getMention: builder.query<getMentionsApiInterface, ParamsURLInterface>({
            query: ({chainIdURL, paramsWalletURL}:ParamsURLInterface) => `mentions/${chainIdURL}/${paramsWalletURL}`,
            providesTags: ['getMentionApi'],
            transformResponse: (response:getMentionsApiInterface, meta, arg) => {
                response.Items.sort((a,b)=>{
                    return b.timeStamp - a.timeStamp
                })
                return response
            }
        }),
        postAccountDictionary: builder.mutation<string, AccountDBInterface>({
            query: (accountDBBody:AccountDBInterface) => ({
                url: 'account',
                method: 'PUT',
                body: accountDBBody
            }),
            invalidatesTags: ['singleAccountApi', 'allAccountApi'],
        }),
        postMention: builder.mutation<string, postMentionInterface>({
            query: (mentionBody:postMentionInterface) => ({
                url: 'mentions',
                method: 'POST',
                body: mentionBody
            }),
            invalidatesTags: ['getMentionApi'],
        }),
    }),
})

export interface fetchAddressToTokenInterface{
    tokenId: number,
    nfiIdentity: BCStruct | null
}

export interface BCStruct{
    chainId: BigNumber;
    walletAccount: string;
    name: string;
    email: string;
    profession: string;
    organization: string;
    slogan: string;
    website: string;
    uniqueYou: string;
    bgRGB: string;
    originDate: BigNumber;
}

export const nfiBCApi = createApi({
    reducerPath: 'nfiBCApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['allNFIApi', 'singleNFIApi'],
        endpoints: (builder) => ({
        getIdentityBC: builder.query<BCStruct[], void>({
            queryFn: fetchIdentities,
            providesTags: ['allNFIApi']
        }),
        getSingleIdentityBC: builder.query<fetchAddressToTokenInterface, ParamsURLInterface>({
            queryFn: fetchAddressToToken,
            providesTags: ['singleNFIApi'],
            // transformResponse: (response:fetchAddressToTokenInterface) => {
            //     return response as fetchAddressToTokenInterface
            // }
        }),
    }),
})

export const queryBCApi = createApi({
    reducerPath: 'queryBCApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['etherScanApi', 'ropstenApi'],
    endpoints: (builder) => ({
        getQueryMainnet: builder.query<any, ParamsURLInterface>({
            queryFn: fetchEthereumTranastionsMainNet,
            providesTags: ['etherScanApi']
        }),
        getQueryRopsten: builder.query<any, ParamsURLInterface>({
            queryFn: fetchEthereumTranastionsRopsten,
            providesTags: ['ropstenApi']
        }),
    }),
})

export async function fetchEthereumTranastionsMainNet({chainIdURL, paramsWalletURL}: ParamsURLInterface){
    const chainIdSupportedArr = chainIdNetworks.filter((el) => {
        return el.chainId === parseInt(chainIdURL)
    });
    const providerEtherscanMainnet = new ethers.providers.EtherscanProvider(  chainIdSupportedArr[0].name.toLowerCase() , 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q' )
    console.log("providerEtherscanMainnet",providerEtherscanMainnet )
    const mainnetHistory = await providerEtherscanMainnet.getHistory(paramsWalletURL)
    console.log("mainnetHistory:", mainnetHistory)
    return {data: mainnetHistory};
}
export async function fetchEthereumTranastionsRopsten({chainIdURL, paramsWalletURL}: ParamsURLInterface){
    const chainIdSupportedArr = chainIdNetworks.filter((el) => {
        return el.chainId === parseInt(chainIdURL)
    });
    const providerEtherscanRopsten = new ethers.providers.EtherscanProvider( "ropsten" , 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl' )
    console.log("providerEtherscanRopsten",providerEtherscanRopsten )
    const ropstenHistory = await providerEtherscanRopsten.getHistory(paramsWalletURL)
    console.log("ropstenHistory:", ropstenHistory)
    return {data: ropstenHistory};
}

export async function fetchIdentities() {
    const results = await Promise.all(Object.keys(MintABI.networks).map(async (chainId): Promise<BCStruct[]> => {
            const chainIdSupportedArr = chainIdNetworks.filter((el) => {
                return el.chainId === parseInt(chainId)
            });
            console.log("chainIdSupportedArr", chainIdSupportedArr)
            const rpcSupported = chainIdSupportedArr[0].rpc[0];
            console.log("rpcsupported", rpcSupported)
        const network = chainIdSupportedArr[0].name.toLowerCase();
        const provider = ethers.getDefaultProvider(network, {
            etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
            infura: 'c97ad56e08674161a95ba16c6f855b6a',
            alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
            pocket: '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609'
        });
        console.log('provider TESTfetchIdentities:', provider);
        const NFIContract = new ethers.Contract(MintABI.networks[chainId].address, MintABI.abi as any, provider);
        console.log('NFIContract:', NFIContract);
            const identStructBC = await NFIContract.allIdentityStructs();
            console.log("identStructBC:",identStructBC)
            return (identStructBC);
        }
    ))
    console.log('results', results)
    return {data:results.flat()};
}

// export async function getBalanceFunction ({chainIdURL, paramsWalletURL}: ParamsURLInterface){
//     const chainIdSupportedArr = chainIdNetworks.filter((el) => {
//         return el.chainId === parseInt(chainIdURL)
//     });
//     const provider = ethers.getDefaultProvider(chainIdSupportedArr[0].name.toLowerCase(), {
//         etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
//         infura: 'c97ad56e08674161a95ba16c6f855b6a',
//         alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
//         pocket: '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609'
//     });
//     if(provider._isProvider){
//         const getBalance = await provider.getBalance(paramsWalletURL)
//         console.log('getBalancethisone', getBalance)
//         console.log('getBalanceSTRING', getBalance.toString())
//         const getBalanceDecimal = ethers.utils.formatEther(getBalance);
//         console.log('getBalanceHex', getBalanceDecimal)
//     }
//     console.log('results', getBalanceDecimal)
//     return {data:getBalanceDecimal.flat()};
// }

export async function fetchAddressToToken({chainIdURL, paramsWalletURL}: ParamsURLInterface){
    const fetchDictionaryReturn:fetchAddressToTokenInterface = {
        tokenId: 0,
        nfiIdentity: null
    }
    console.log('fetchAddressToToken:', fetchAddressToToken)
        if(paramsWalletURL.length > 0)
    {
        if (Object.prototype.hasOwnProperty.call(MintABI.networks, `${chainIdURL}`)) {
            const chainIdSupportedArr = chainIdNetworks.filter((el) => {
                return el.chainId === parseInt(chainIdURL)
            });
            const provider = ethers.getDefaultProvider(chainIdSupportedArr[0].name.toLowerCase(), {
                etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
                infura: 'c97ad56e08674161a95ba16c6f855b6a',
                alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
                pocket: '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609'
            });
            const NFIContract = new ethers.Contract(MintABI.networks[chainIdURL].address, MintABI.abi as any, provider);
            console.log('NFIContract:', NFIContract);
            const addressToTokenIDID = await NFIContract.addressToTokenID(paramsWalletURL);
            console.log("addresstotokenId:", addressToTokenIDID)
            const addressToTokenIDIDNUMBER = parseInt(addressToTokenIDID)
            if (addressToTokenIDIDNUMBER >= 1) {
               fetchDictionaryReturn.tokenId = addressToTokenIDIDNUMBER;
                fetchDictionaryReturn.nfiIdentity = await NFIContract.addressToIdentityStruct(paramsWalletURL);
                return {data: fetchDictionaryReturn};
            }
        }
    }
    //return {data: fetchDictionaryReturn};
    return { error: { status: 404, data: " NfI does not exist" } }
}

export interface validateInterface{
    giver: string,
    giverColor?: string,
    receiver: string,
    receiverColor?: string,
    comment: string,
    commentColor?: string,
    originDate: number
}

export const { useGetSingleAccountQuery, useGetAllAccountQuery, useGetMentionQuery, usePostAccountDictionaryMutation,
    usePostMentionMutation} = accountDBApi
export const { useGetIdentityBCQuery, useGetSingleIdentityBCQuery } = nfiBCApi
export const { useGetQueryMainnetQuery, useGetQueryRopstenQuery } = queryBCApi
