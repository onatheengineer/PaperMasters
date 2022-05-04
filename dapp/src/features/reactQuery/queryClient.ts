import {createStandaloneToast} from "@chakra-ui/react";
//import { QueryClient } from 'react-query';

const toast = createStandaloneToast();

export function queryErrorHandler(error:unknown):void {
    const id = 'react-query-error';
    const title =
        error instanceof Error ? error.message : 'error connecting to server';
    //prevent duplicate toasts
    toast.closeAll();
    toast({id, title, status: 'error', variant: 'subtle', isClosable: true})
}

// export function generateQueryClient(): QueryClient {
//     return new QueryClient({
//         defaultOptions: {
//             queries: {
//                 onError: queryErrorHandler,
//                 staleTime: 600000, // 10 minutes
//                 cacheTime: 900000, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime
//                 refetchOnMount: false,
//                 refetchOnWindowFocus: false,
//                 refetchOnReconnect: false,
//             },
//             mutations: {
//                 onError: queryErrorHandler,
//             },
//         },
//     });
// }
//
// export const queryClient = generateQueryClient();

