import * as React from 'react';
import type {FC} from 'react';
import { Box, Flex} from '@chakra-ui/react';
import Sidebar from "../Sidebar";
import {Route, Routes} from "react-router-dom";




interface Interface {

}

export const CommunityForum: FC<Interface>=()=> {
    // const SecurityForumPage = [
    //     <ForumPages title={'Security and Protection'} body={'Security and Protectionis Everything, it provides trust'}/>,
    //     <ForumPages title={'Blockchain Protection'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPages title={'Blockchain Legitimacy'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPages title={'Privacy Policy'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
    //     <ForumPages title={'Terms of Service'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
    //     <ForumPages title={'Community Guidelines'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
    // ]
    return (

        <Flex>

            <Box flex='auto'  style={{border: '8px solid white'}}>



            </Box>
        </Flex>

    )
};

export default CommunityForum;