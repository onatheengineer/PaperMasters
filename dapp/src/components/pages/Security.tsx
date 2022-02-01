import * as React from 'react';
import type {FC} from 'react';
import { Box, Flex} from '@chakra-ui/react';
import Sidebar from "../molecules/Sidebar";
import {Route, Routes} from "react-router-dom";




interface Interface {

}

export const CommunityForum: FC<Interface>=()=> {
    // const SecurityForumPage = [
    //     <ForumPageTemplate title={'Security and Protection'} body={'Security and Protectionis Everything, it provides trust'}/>,
    //     <ForumPageTemplate title={'Blockchain Protection'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPageTemplate title={'Blockchain Legitimacy'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPageTemplate title={'Privacy Policy'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
    //     <ForumPageTemplate title={'Terms of Service'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
    //     <ForumPageTemplate title={'Community Guidelines'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
    // ]
    return (

        <Flex>

            <Box flex='auto'  style={{border: '8px solid white'}}>



            </Box>
        </Flex>

    )
};

export default CommunityForum;