import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import type { FC } from 'react';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../app/hooks';

export const ValidationsReports: FC = () => {
  const { walletAccount } = useParams();

  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);

  return (
    // TODO total number of validations add total number of reports here
    <Heading>
      <Tabs isFitted variant="enclosed">
        <TabList color={'pmpurple.13'}>
          <Tab>Validations</Tab>
          <Tab>Reports</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text
              textAlign={'left'}
              fontSize="sm"
              color={'pmpurple.8'}
              fontWeight="600"
              mb="12px"
            >
              GIFTED BY ACCOUNT: coming soon...
            </Text>
            {/* <ValidateAvatar giver={} giverColor={} receiver={} receiverColor={} comment={} commentColor={} originDate={} /> */}
            {/* <Flex align="center" mb="20px"> */}
            {/*    <Switch colorScheme="purple" me="10px"/> */}
            {/*    <Text */}
            {/*        noOfLines={1} */}
            {/*        fontSize="md" */}
            {/*        color="gray.500" */}
            {/*        fontWeight="400" */}
            {/*    > */}
            {/*        Email me when someone Validates me */}
            {/*    </Text> */}
            {/* </Flex> */}
          </TabPanel>
          <TabPanel>
            <Text
              textAlign={'left'}
              fontSize="sm"
              color={'pmpurple.8'}
              fontWeight="600"
              mb="12px"
            >
              REPORTED BY ACCOUNT: coming soon...
            </Text>
            {/* <Flex align="center" mb="20px"> */}
            {/*    <Switch colorScheme="purple" me="10px"/> */}
            {/*    <Text */}
            {/*        noOfLines={1} */}
            {/*        fontSize="md" */}
            {/*        color="gray.500" */}
            {/*        fontWeight="400" */}
            {/*    > */}
            {/*        Email me when someone REPORTS me */}
            {/*    </Text> */}
            {/* </Flex> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Heading>
  );
};

export default ValidationsReports;
