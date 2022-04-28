import {createStandaloneToast} from "@chakra-ui/react";
const toast = createStandaloneToast();

function queryErrorHandler(error:unknown):void {
    const id = 'react-query-error';
    const title =
        error instanceof Error
        ? error.message
            : 'error connecting to server';
    //prevent duplicate toasts
    toast.closeAll();
    toast({id, title, status: 'error', variant: 'subtle', isClosable: true})
}

