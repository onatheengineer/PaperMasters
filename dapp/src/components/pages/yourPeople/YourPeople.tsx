import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import React from 'react';
// import { baseImageUrl } from '../../axiosInstance/constants';
// import {imageRamona} from '../../..//assets/greenshirt'
// import {imageAndrew} from '../../../assets/pinkShirts'

// interface CardProps {
//     itemName: string;
//     image: ImageType;
//     cardContents: ReactNode;
// }
// export function Card({
//                          itemName,
//                          image,
//                          cardContents,
//                      }: CardProps): ReactElement {
//     return (
//         <Center py={12}>
//             <Box
//                 p={6}
//                 maxW="330px"
//                 w="full"
//                 bg="white"
//                 boxShadow="2xl"
//                 rounded="lg"
//                 pos="relative"
//                 zIndex={1}
//             >
//                 <Box rounded="lg" mt={-12} pos="relative" height="230px">
//                     <Image
//                         rounded="lg"
//                         height={230}
//                         width={282}
//                         objectFit="cover"
//                         src={`${baseImageUrl}/${image.fileName}`}
//                         alt={itemName}
//                     />
//                     <Text fontSize="xs" align="center">
//                         Photo by <Link href={image.authorLink}>{image.authorName}</Link>{' '}
//                         from <Link href={image.platformLink}>{image.platformName}</Link>
//                     </Text>
//                 </Box>
//                 <Stack pt={10}>
//                     <Heading textAlign="center" fontSize="2xl">
//                         {itemName}
//                     </Heading>
//                     {cardContents}
//                 </Stack>
//             </Box>
//         </Center>
//     );
// }
//
interface InterfaceYourPeople {
  texttest?: string;
  // card: typeof Card: CardProps
}

//
export const YourPeople: FC<InterfaceYourPeople> = () => {
  //     // const YourPeopleForumPage = [
  //     //     <PageForum title={'We want you to know who we are'} body={'dfgfdhdftgyertg'}/>,
  //     //     <PageForum title={'About Us'} body={'dfgfdhdftgyertg'}/>,
  //     //     <PageForum title={'Contact Us'} body={'dfgfdhdftgyertg'}/>,
  //     //     <PageForum title={'Support Project'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
  //     // ]
  return (
    <Flex w={'100%'}>
      {/* <Flex > */}
      {/*    <RoutesRoutes/> */}
      {/* </Flex> */}
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
            fontSize={'40px'}
            fontWeight={'600'}
            fontStyle={'bold'}
          >
            Your People
          </Heading>
        </Box>
        {/* <PageForum title={'About Us'} body={'We are a software development couple and loving it! Ramona codes 16 hours a day 7 days a week. Andrew enjoys his evening hours hanging out with the kids.'}/> */}
        {/* <PageForum title={' Support Us'} */}
        {/*           body={'    You are the reason we took on this project to protect the Blockchain.\n' +*/}
        {/*               '    You are what we care about.\n' +*/}
        {/*               '    You are what inspires us to keep delivering this product.\n' +*/}
        {/*               '    Without you, we don’t exist.\n' +*/}
        {/*               '    If you would like to support our efforts, here’s some specific ways to help.\n' +*/}
        {/*               '\n' +*/}
        {/*               '    .... you can contribute in several ways, spread the word about papermasters.io. Send a link to a friend. Add our link and/or logo to your favorite social media site. Our logo is located at the bottom of this page under \'logo kit\'.\n' +*/}
        {/*               '    Give a validation and support your fellow Papermaster.\n' +*/}
        {/*               '    We enjoy your comments and love building relationships with community.\n' +*/}
        {/*               '    We learn from your comments new ways to improve the service. By commenting, you help us close the feedback loop. Send us some feedback: ramonajenny.n@gmail.com\n' +*/}
        {/*               '    Link to us from your site. Adding a text link to our site from your site is a vote of confidence. It’s also a great way to share our resources with your visitors.'}/> */}
        {/* <PageForum title={'New & Updated Features'} body={'Stories to come...'}/> */}
        <Heading
          textAlign={'left'}
          fontSize={'20px'}
          fontWeight={'600'}
          fontStyle={'semi-bold'}
          px={20}
          color={'pmpurple.13'}
        >
          New, Updated and Future Features
        </Heading>
        <Text px={20} pb={5} color={'pmpurple.13'}>
          In the future I hope to make a linked Icon of your identity page so
          page so that you can use it to attached to your name outside of the
          PaperMasters site. Analytics are coming, of course I need data first
          :)
        </Text>
        {/* <Heading */}
        {/*  textAlign={'left'} */}
        {/*  fontSize={'20px'} */}
        {/*  fontWeight={'600'} */}
        {/*  fontStyle={'semi-bold'} */}
        {/*  px={20} */}
        {/*  color={'pmpurple.13'} */}
        {/* > */}
        {/*  Support the Project */}
        {/* </Heading> */}
        {/* <Text px={20} color={'pmpurple.13'}> */}
        {/*  You are the reason I took on this project to protect the Blockchain. I */}
        {/*  care about you, you inspire me to keep delivering this product. */}
        {/*  Without you, the PaperMasters doesn't exist. If you would like to */}
        {/*  support the effort, here’s some specific ways to help. Spread the word */}
        {/*  about papermasters.io. Send a link to a friend. Add our link and/or */}
        {/*  logo to to your website or your social media sites. Our logo is */}
        {/*  located at the bottom of this page in the footer. Adding a text link */}
        {/*  to your PaperMasters Identity page site from your social site is a */}
        {/*  vote of confidence. It’s also a great way to share PaperMasters */}
        {/*  resources with your people. Give a Validation or Report and support */}
        {/*  your fellow PaperMasters. I enjoy your comments and love building */}
        {/*  relationships with the community. I learn from your comments new ways */}
        {/*  to improve the site. Feel free to send me some feedback: */}
        {/*  ramonajenny.n@gmail.com. */}
        {/* </Text> */}
      </Box>
    </Flex>
  );
};

export default YourPeople;
