import { Spinner, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';

export function Loading(): ReactElement {
    //useIsFetching returns an interger of the number of query calls currently in the fetching state
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();

    //inherit means fetching is true and the loading spinner will show
    const display = isFetching || isMutating ? 'inherit' : 'none';

    return (
        <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="olive.200"
            color="olive.800"
            role="status"
            position="fixed"
            zIndex="9999"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            display={display}
        >
            <Text display="none">Loading...</Text>
        </Spinner>
    );
}