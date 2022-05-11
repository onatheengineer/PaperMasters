import {
    Box,
    Flex,
    Heading,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Stack,
    Spacer,
    Tooltip
} from "@chakra-ui/react";
import * as React from "react";
import {FC, useEffect, useMemo} from "react";
import {useAppDispatch} from "../../../app/hooks";
import {useParams} from "react-router-dom";
import {useGetQueryMainnetQuery} from "../../../features/reactQuery/RTKQuery";
import {ParamsURLInterface} from "../../../features/accountDB/AccountDBSlice.types";
import moment from "moment";
import {ethers} from "ethers";

export const AccountLedger:FC<ParamsURLInterface>=({chainIdURL, paramsWalletURL})=> {
    const getLedger = useGetQueryMainnetQuery({
        chainIdURL: chainIdURL!,
        paramsWalletURL: paramsWalletURL!
    });
    console.log("getLedger", getLedger)


    return (
        <Flex align="center"
              //border={'1px solid pink'}
              h={'90%'}
              w={'100%'}
              flexGrow={1}
              overflow={'none'}
        >
            <Box
                w={'100%'}
                h={'100%'}
                overflow={'auto'}
            >
                <Stack
                    w={'100%'}
                >
                    {getLedger.isSuccess && getLedger.data.map((el: any) => {
                        const timeStampFormatted = moment(el.timestamp*1000).format('MMM DD YYYY, hh:mm:ss a');
                        const timeStampShort = moment(el.timestamp*1000).format('MMM DD YYYY');
                        const valueFormatted =
                             parseFloat(ethers.utils.formatEther(el.value)) + parseFloat(ethers.utils.formatEther(el.gasPrice))
                        console.log("valueFormatted",valueFormatted)
                        return (
                            <Box
                                flex={'max-content'}
                                w={'100%'}
                                //border={'1px solid red'}
                                borderBottom={'1px solid'}
                                borderColor={'pmpurple.4'}
                                px={2}
                            >
                                <Stack>
                                    <HStack>
                                            <HStack>
                                                <Text
                                                pr={'2px'}
                                                color={'pmpurple.13'}
                                                fontSize={'14px'}
                                                whiteSpace={'nowrap'}
                                                >
                                                    Transaction Hash:
                                                </Text>
                                                <Text
                                                    isTruncated={true}
                                                    width={'300px'}
                                                    color={'pmpurple.13'}
                                                    fontSize={'14px'}
                                                    whiteSpace={'nowrap'}
                                                >
                                                    {el.hash}
                                                </Text>
                                            </HStack>
                                        <Spacer/>
                                        <Tooltip
                                            label={timeStampFormatted}
                                            aria-label='A tooltip'
                                            bg={'pmpurple.8'}
                                        >
                                        <Text
                                            //noOfLines={1}
                                            fontSize={'14px'}
                                            color={'pmpurple.13'}
                                            fontWeight="400"
                                            whiteSpace={'nowrap'}
                                        >
                                            {timeStampShort}
                                        </Text>
                                        </Tooltip>
                                        <Box
                                            //border={'1px solid orange'}
                                            bg={'pmpurple.2'}
                                            borderRadius={'2px'}
                                        >
                                            <Text
                                                isTruncated={true}
                                                width={'100px'}
                                                color={'pmpurple.13'}
                                                fontSize={'14px'}
                                                whiteSpace={'nowrap'}
                                                title={valueFormatted.toString()}
                                            >
                                                {valueFormatted}
                                            </Text>
                                        </Box>
                                    </HStack>
                                    <HStack>
                                    <HStack>
                                        <Text
                                            pr={'2px'}
                                            color={'pmpurple.13'}
                                            fontSize={'14px'}
                                            whiteSpace={'nowrap'}
                                        >
                                            From:
                                        </Text>
                                        <Text
                                            isTruncated={true}
                                            width={'300px'}
                                            color={'pmpurple.13'}
                                            fontSize={'14px'}
                                            whiteSpace={'nowrap'}
                                        >
                                            {el.from}
                                        </Text>
                                    </HStack>
                                    <Spacer/>
                                    <HStack>
                                        <Text
                                            pr={'2px'}
                                            color={'pmpurple.13'}
                                            fontSize={'14px'}
                                            whiteSpace={'nowrap'}
                                        >
                                            To:
                                        </Text>
                                        <Text
                                            isTruncated={true}
                                            width={'300px'}
                                            color={'pmpurple.13'}
                                            fontSize={'14px'}
                                            whiteSpace={'nowrap'}
                                        >
                                            {el.to !== null ?
                                                el.to
                                                :  <Text
                                                    color={'pmpurple.27'}
                                                >
                                                Contract Creation
                                                </Text>
                                            }
                                        </Text>
                                    </HStack>
                                    </HStack>
                                </Stack>
                            </Box>
                        )
                    })
                    }
                </Stack>
            </Box>
        </Flex>
    )
};

export default AccountLedger;