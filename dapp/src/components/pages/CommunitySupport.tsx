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
            'Let us all keep the Blockchain beautiful, validating and reporting ' +
            'a wallet address helps your fellow Blockchainers known that the wallet address is safe, or not safe, to do business with. These Validations and Reports ' +
            'are Non-Fungible Tokens permanently attached to the wallet address. '
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
        <PageForum
          title={'Cookies Policy'}
          subtitle={'Authentication'}
          body={
            <span>
              I use cookies to verify your account and determine analytics.
              Security site and product integrity <br /> I may use Cookies to
              keep your account and data safe and secure.
              <br /> <h5 style={{ fontWeight: 650 }}>Advertising</h5> Nope, not
              interested, also I will never sell your information. <br />
              <h5 style={{ fontWeight: 650 }}> Site features and services </h5>I
              may use cookies to enable help me increase functionality of the
              site to provide a better user experience.{' '}
              <h5 style={{ fontWeight: 650 }}>Performance </h5>I am use cookies
              to provide you with the best experience possible.
              <h5 style={{ fontWeight: 650 }}> Analytics and research </h5>I use
              cookies to better understand how people use the site so that it
              can improve it.
            </span>
          }
        />
      </Box>
    </Flex>
  );
};

export default CommunitySupport;
