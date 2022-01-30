import * as React from 'react';
import type {FC} from 'react';
import { Box, Flex} from '@chakra-ui/react';
import Sidebar from "../molecules/Sidebar";
import {Route, Routes} from "react-router-dom";




interface Interface {

}

export const CommunityForum: FC<Interface>=()=> {
    return (

        <Flex>

            <Flex >
                <Sidebar/>
            </Flex>
            <Box flex='auto'  style={{border: '8px solid white'}}>


            </Box>
        </Flex>

    )
};

export default CommunityForum;