import * as React from 'react';
import type { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import RoutesRoutes from '../../app/RoutesRoutes';
import { Route, Routes } from 'react-router-dom';

export const CommunityForum: FC = () => {
  // const SecurityForumPage = [
  //     <PageForum title={'Security and Protection'} body={'Security and Protectionis Everything, it provides trust'}/>,
  //     <PageForum title={'Blockchain Protection'} body={'dfgfdhdftgyertg'}/>,
  //     <PageForum title={'Blockchain Legitimacy'} body={'dfgfdhdftgyertg'}/>,
  //     <PageForum title={'Privacy Policy'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
  //     <PageForum title={'Terms of Service'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
  //     <PageForum title={'Community Guidelines'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
  // ]
  return (
    <Flex>
      <Box flex="auto" style={{ border: '8px solid white' }}></Box>
    </Flex>
  );
};

export default CommunityForum;
