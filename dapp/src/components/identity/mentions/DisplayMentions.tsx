 import {Box, Divider, HStack, Spacer, Tooltip, VStack, Flex,   Accordion,
     AccordionItem,
     AccordionButton,
     AccordionPanel,
     AccordionIcon,} from "@chakra-ui/react";
import moment from "moment";
import {BsCircleFill} from "react-icons/bs";
import * as React from "react";
import {FC, useMemo} from "react";
import {useAppSelector} from "../../../app/hooks";

interface Interface {
    mentionsFullDisplayWindowBool: boolean
}

export const DisplayMentions: FC<Interface>=({mentionsFullDisplayWindowBool})=> {

    const allMentionsArr = useAppSelector((state) => state.mentions.allMentions);

    const sortedMentionArr = useMemo(() => {
        const sortMentionsArr = [...allMentionsArr];
        sortMentionsArr.sort((a, b) => {
            return (b.timeStamp - a.timeStamp)
        });
        return (sortMentionsArr)
    }, [allMentionsArr])

    return (
        <Box
            //border={'1px solid'}
            // borderColor={'pmpurple.4'}
            // borderRadius={'5px'}
            // bgColor={'pmpurple.2'}
            // p="5px"
            // m={'0px'}
            h={mentionsFullDisplayWindowBool ? '75vH' : '100%'}
            w={'100%'}
            // overflow={'auto'}
        >
            {sortedMentionArr.map((mention) => {
                    const timeStampFormatted = moment(mention.timeStamp).format('MMM DD YYYY, hh:mm:ss a');
                    const timeStampShortFormatted = moment(mention.timeStamp).format('MMM DD YYYY');
                    return (
                        <Box
                            //border={'2px solid red'}
                            // p="0px"
                            // mb={'12px'}
                            //w={'100%'}
                            // fontSize={'15px'}
                        >
                            <Accordion allowToggle>
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                                Section 1 title
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                    </AccordionPanel>
                                </AccordionItem>

                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                                Section 2 title
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>

                            <HStack>

                                <Box
                                    //border={'2px solid red'}
                                    color={'pmpurple.15'}
                                    overflow={'none'}
                                >
                                    {mention.fromWallet}
                                </Box>
                                <Spacer/>
                                <Tooltip label={timeStampFormatted} aria-label='A tooltip'>
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
                                    noOfLines={3}
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
        </Box>
    )
};

export default DisplayMentions;