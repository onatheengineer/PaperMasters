import { Box, Flex, Heading } from '@chakra-ui/react';
import type { FC } from 'react';
import React from 'react';

import PageForum from '../PageForum';

export const CommunitySupport: FC = () => {
  // const LearnForumPage [
  //     <PageForum title={'CommunitySupport about NFIs'} body={'dfgfdhdftgyertg'}/>,
  //     <PageForum title={'What is a Non-Fungiable-Identity (NFI)'} body={'dfgfdhdftgyertg'}/>,
  //     <PageForum title={'What is the difference between a NFT and PaperMasters NFI'} body={'dfgfdhdftgyertg'}/>,
  //     <PageForum title={'What are the benefits of having a PaperMasters NFI?'} body={'dfgfdhdftgyertg'}/>,
  //     <PageForum title={'Mint PaperMasters NFI required fields'} body={'using your name field combined with the ' +
  //         'description field and an arbatary seceret word obtained via a hidden generator is used to create a uniqiue ' +
  //         '64bit hash (66 charactors onces the 0x is added to it)'}/>,
  // ]

  return (
    <Flex w={'100%'}>
      <Box
        flex={'auto'}
        border={'2px solid'}
        borderColor={'pmpurple.10'}
        bgColor={'pmpurple.1'}
        borderRadius={'10px'}
        m={30}
      >
        <Box flexGrow={1} m={8}>
          <Heading
            textAlign={'center'}
            fontSize={'30px'}
            fontWeight={'500'}
            fontStyle={'bold'}
          >
            Community Support
          </Heading>
        </Box>
        <PageForum
          title={'Blockchain Protection and Legitimacy'}
          subtitle={'Authentic and Transparent'}
          body={
            'NFIs are transparent identities, just like the Blockchain keeps a ' +
            'public ledger, identities keep your wallet address transparent as well. I hope that the community will see value in becoming a PaperMaster and' +
            'show off the integrity of their wallet address.'
          }
        />
        <PageForum
          title={'Community Guidelines'}
          subtitle={'Please be nice'}
          body={
            'Please do not Validate or Report anyone that you personally have not done ' +
            'business with. If you have information to offer to the community about a shady account, please use the Mentions feature.'
          }
        />
        <PageForum
          title={'Benefits of becoming a PaperMaster?'}
          subtitle={'Account Integrity'}
          body={
            'Providing fellow Blockchainers with a reputable reputation is vital to ' +
            'keeping the community safe so no accounts get hurt. Being a PaperMaster helps validate your integrity and support of honest ' +
            'business transactions by sending them to your PaperMasters identity page with a live account ledger, any past contracts you ' +
            'helped create and mentions by your fellow Blockchains showing that you are the honest trustworthy person you are telling them you are.'
          }
        />
        <PageForum
          title={'What is NFI Protection and Validation?'}
          subtitle={'Protecting our Community'}
          body={
            'Validating and reporting a wallet address helps your fellow Blockchainers to determine if it is safe or not to conduct business with that wallet address.'
          }
        />
        <PageForum
          title={'How to add a wallet account'}
          subtitle={"View a Blockchainer's Activity"}
          body={
            'Go to the search page and type in a Chain Id of the wallet account you wish to add, then add the wallet account number, remember account ' +
            'addresses are at least 26 characters'
          }
        />
      </Box>
    </Flex>
  );
};

export default CommunitySupport;
