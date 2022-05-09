import {Box, Flex, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Stack, Spacer} from "@chakra-ui/react";
import * as React from "react";
import {FC, useEffect, useMemo} from "react";
import {useAppDispatch} from "../../../app/hooks";
import {useParams} from "react-router-dom";
import {useGetQueryMainnetQuery} from "../../../features/reactQuery/RTKQuery";
import {ParamsURLInterface} from "../../../features/accountDB/AccountDBSlice.types";


export const AccountLedger:FC<ParamsURLInterface>=({chainIdURL, paramsWalletURL})=> {
    const getLedger = useGetQueryMainnetQuery({
        chainIdURL: chainIdURL!,
        paramsWalletURL: paramsWalletURL!
    });
    console.log("getLedger", getLedger)
//const timeStampFormatted = moment(txHash.timeStamp).format('MMM DD YYYY, hh:mm:ss a');


    // const ethereumLedger = useMemo(() => {
    //
    //     if () {
    //{txHash}
    //
    //             return (
    //
    //             )
    //         }
    // }, [])

    return (
        <Flex align="center" mb="20px"
              border={'1px solid pink'}
              flexGrow={1}
        >
            <Stack>
                {getLedger.isSuccess && getLedger.data.map((el:any) => {
                    return (
                        <Stack>
                            <HStack>
                                <Text
                                    //noOfLines={1}
                                    fontSize="md"
                                    color="gray.500"
                                    fontWeight="400"
                                >
                                    {el.from}
                                </Text>
                                <Spacer/>
                                <Text
                                    //noOfLines={1}
                                    fontSize="md"
                                    color="gray.500"
                                    fontWeight="400"
                                >
                                    {el.hash}
                                    {/*{el.from}*/}
                                    {/*{el.to}*/}
                                    {/*{el.timestamp}*/}
                                    {/*{el.value}*/}

                                </Text>
                            </HStack>
                        </Stack>
                    )
                })
                }
            </Stack>
        </Flex>
    )
};

export default AccountLedger;