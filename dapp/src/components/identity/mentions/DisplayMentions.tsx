import {Box, Divider, HStack, Spacer, VStack} from "@chakra-ui/react";
import moment from "moment";
import {BsCircleFill} from "react-icons/bs";
import * as React from "react";
import {FC} from "react";
import {useAppSelector} from "../../../app/hooks";


interface Interface {

}

export const DisplayMentions: FC<Interface>=()=> {

    const allMentionsArr = useAppSelector((state) => state.mentions.allMentions);

    return (

        <Box
            border={'1px solid'}
            borderColor={'pmpurple.4'}
            borderRadius={'5px'}
            bgColor={'pmpurple.2'}
            p="5px"
            m={'0px'}
            h={'75vH'}
            w={'100%'}
            overflow={'auto'}
        >
            {allMentionsArr.map((mention) => {
                    const timeStampFormatted = moment(mention.timeStamp).format('MMM DD YYYY, hh:mm:ss a');
                    return (
                        <Box
                            //border={'2px solid red'}
                            p="0px"
                            mb={'12px'}
                            w={'100%'}
                            fontSize={'15px'}
                        >
                            <HStack>
                                <Box
                                    color={'pmpurple.15'}
                                >
                                    {mention.fromWallet}
                                </Box>
                                <Spacer/>
                                <Box
                                    color={'pmpurple.8'}
                                    fontSize={'12px'}
                                >
                                    {timeStampFormatted}
                                </Box>
                            </HStack>

                            <HStack>
                                <Box
                                    isTruncated={true}
                                    color={'pmpurple.12'}
                                >
                                    {mention.messageBody}
                                </Box>
                                <Spacer/>
                                <Box>

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
}

export default DisplayMentions;