import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {AccountPageInterface, ParamsURLInterface} from './AccountDBSlice.types'


export const accountsApi = createApi({
    reducerPath: 'accountsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com' }),
    endpoints: (builder) => ({
        getAccountByChainIdWalletAcc: builder.query<AccountPageInterface, ParamsURLInterface>({
            query: ({chainIdURL, paramsWalletURL}:ParamsURLInterface) => `account/${chainIdURL}/${paramsWalletURL}`,
        }),
    }),
})
export const { useGetAccountByChainIdWalletAccQuery } = accountsApi