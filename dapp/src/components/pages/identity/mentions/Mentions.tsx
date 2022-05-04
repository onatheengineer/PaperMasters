import React, {useMemo, useState} from 'react';
import type {FC} from 'react';
import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
    Box, Divider, Flex, HStack, Spacer, Tooltip, Heading, VStack
} from '@chakra-ui/react';
import {accountsApiInterface, getMentionInterface, useGetMentionQuery} from '../../../../features/reactQuery/RTKQuery';
import moment from "moment";
import {BsCircleFill} from "react-icons/bs";
import {mentionsStateDictionaryInterface} from "../../../../features/accountDB/mentions/MentionsSlice";
import {useAppSelector} from "../../../../app/hooks";
import * as timers from "timers";


interface interfaceMentions{
    chainIdURL: string,
    paramsWalletURL: string,
    mentionsFullDisplayWindowBool: boolean
}
export const Mentions:FC<interfaceMentions> =({chainIdURL, paramsWalletURL, mentionsFullDisplayWindowBool})=> {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);
    const {data, isLoading, isError, error} = useGetMentionQuery({chainIdURL, paramsWalletURL});
    console.log("data:", data)
    if (isLoading) {
        return (
            <Heading
                pt={'50px'}
                fontSize={'20px'}
                textAlign={'center'}
            >
                Loading...
            </Heading>
        )
    }
    if (isError) {
        return (
            <Heading
                pt={'50px'}
                fontSize={'20px'}
                textAlign={'center'}
            >
                Something went wrong...{error}
            </Heading>
        )
    }
    if (!chainIdURL) return null;

    // const allMentionsArr = useAppSelector((state) => state.mentions.allMentions);
    //
    // const sortedMentionArr = useMemo(() => {
    //     const sortMentionsArr = [...allMentionsArr];
    //     sortMentionsArr.sort((a, b) => {
    //         return (b.timeStamp - a.timeStamp)
    //     });
    //     return (sortMentionsArr)
    // }, [allMentionsArr])


    return (
        <Flex
            h={'100%'}
            w={'100%'}
            px="0px"
            mt={'5px'}
            border={'1px solid orange'}
        >
            <VStack
            border={'2px solid green'}
            //flex={'auto'}
            //p={'0px'}
            //m={'0px'}
            w={'100%'}
            flexGrow={1}
            display={'flex'}
            overflow={'auto'}
        >
                {/*<Accordion*/}
                {/*    allowToggle*/}
                {/*    //defaultIndex={[0]}*/}
                {/*    allowMultiple={false}*/}
                {/*    w={'100%'}*/}
                {/*>*/}
            {data!.Items.map((mention:getMentionInterface) => {
                    const timeStampFormatted = moment(mention.timeStamp).format('MMM DD YYYY, hh:mm:ss a');
                    const timeStampShortFormatted = moment(mention.timeStamp).format('MMM DD YYYY');

                    return (
                        <Box
                            border={'2px solid red'}
                            // p="0px"
                            // mb={'12px'}
                            w={'100%'}
                            // fontSize={'15px'}
                        >
                                    {/*<AccordionItem*/}
                                    {/*//id={'mentionsApi'}*/}
                                    {/*>*/}
                                    {/*    <Heading>*/}
                                    {/*        <AccordionButton>*/}
                                    {/*            <AccordionIcon/>*/}
                                    {/*            <Box*/}
                                    {/*                flex='1'*/}
                                    {/*                textAlign='left'*/}
                                    {/*                whiteSpace="nowrap"*/}
                                    {/*                overflow={ "hidden !important"}*/}
                                    {/*                textOverflow={"ellipsis"}*/}
                                    {/*                pl={'20px'}*/}
                                    {/*                >*/}
                                    {/*                {mention.messageBody}*/}
                                    {/*            </Box>*/}
                                    {/*        </AccordionButton>*/}
                                    {/*    </Heading>*/}
                                    {/*    <AccordionPanel pb={4}>*/}
                                    {/*        {mention.messageBody}*/}
                                    {/*    </AccordionPanel>*/}
                                    {/*</AccordionItem>*/}
                            <HStack>
                                <Box
                                    //border={'2px solid red'}
                                    color={'pmpurple.15'}
                                    overflow={'none'}
                                >
                                    {mention.fromWallet}
                                </Box>
                                <Spacer/>
                                <Tooltip
                                    label={timeStampFormatted}
                                         aria-label='A tooltip'
                                    bg={'pmpurple.8'}
                                >
                                    <Box
                                        //border={'2px solid red'}
                                        color={'pmpurple.8'}
                                        fontSize={'12px'}
                                        overflow={'none'}
                                    >
                                        {timeStampShortFormatted}
                                    </Box>
                                </Tooltip>
                            </HStack>
                            <HStack
                                alignItems={'start'}
                            >
                                <Box
                                    isTruncated={true}
                                    color={'pmpurple.12'}
                                    overflow={'none'}
                                    whiteSpace={'pre-wrap'}
                                    textAlign={'justify'}
                                    noOfLines={1}
                                >
                                    {mention.messageBody}
                                </Box>
                                <Spacer/>
                                <Box
                                    pt={'8px'}
                                >
                                    {mention.radioType === 1 ?
                                        <HStack>
                                            <BsCircleFill color={'green'} size={'8px'}/>
                                            <BsCircleFill color={'grey'} size={'8px'}/>
                                            <BsCircleFill color={'grey'} size={'8px'}/>
                                        </HStack>
                                        :
                                        mention.radioType === 0 ?
                                            <HStack>
                                                <BsCircleFill color={'grey'} size={'8px'}/>
                                                <BsCircleFill color={'red'} size={'8px'}/>
                                                <BsCircleFill color={'grey'} size={'8px'}/>
                                            </HStack>
                                            :
                                            <HStack>
                                                <BsCircleFill color={'grey'} size={'8px'}/>
                                                <BsCircleFill color={'grey'} size={'8px'}/>
                                                <BsCircleFill color={'blue'} size={'8px'}/>
                                            </HStack>
                                    }
                                </Box>
                            </HStack>
                            <Divider/>
                        </Box>
                    )
                }
            )}
                {/*</Accordion>*/}
            </VStack>
        </Flex>
    )
}

export default Mentions;