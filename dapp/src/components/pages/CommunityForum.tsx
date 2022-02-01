import * as React from 'react';
import type {FC} from 'react';
import { Box, Flex} from '@chakra-ui/react';
import Sidebar from "../molecules/Sidebar";
import {Route, Routes} from "react-router-dom";




interface Interface {

}

export const CommunityForum: FC<Interface>=()=> {
    // const CommunityForumPage = [
    //     <ForumPageTemplate title={'Community Forum'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPageTemplate title={'Community Discussion'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPageTemplate title={'Community Events'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPageTemplate title={'Report Suspicious Activity'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPageTemplate title={'Papermaster project Feedback'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
    // ]
    //
    return (

        <Flex>

            <Box flex='auto'  style={{border: '8px solid white'}}>



            </Box>
        </Flex>

    )
};

export default CommunityForum;