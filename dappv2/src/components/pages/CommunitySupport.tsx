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
            '   Providing fellow Blockchainers with a reputable reputation found\n' +
            '              on your PaperMasters Identity page, including a live account\n' +
            '              ledger, any past contracts you helped create, and links to your\n' +
            '              social media pages, provides the way you need to authenticate that\n' +
            '              you are the honest trustworthy person the rest of us know you are.'
          }
        />
        <PageForum
          title={'What is NFI Protection and Validation?'}
          subtitle={'Protecting our Community'}
          body={
            '     Let us all keep the Blockchain beautiful! By using the Mentions\n' +
            '              feature found on the Identity page, you can vaidate or report a\n' +
            '              wallet address. This helps your fellow Blockchainers determine if it is safe to conduct\n' +
            '              business with that wallet address.'
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
