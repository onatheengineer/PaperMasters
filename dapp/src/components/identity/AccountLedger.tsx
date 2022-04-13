import {Box, Flex, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Stack, Spacer} from "@chakra-ui/react";
import * as React from "react";
import {FC, useEffect, useMemo} from "react";
import {useAppDispatch} from "../../app/hooks";
import {useParams} from "react-router-dom";


export const AccountLedger:FC=()=> {

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
        <Flex align="center" mb="20px">
            <Stack>
                <HStack>
                    {/*    <Text*/}
                    {/*        noOfLines={1}*/}
                    {/*        fontSize="md"*/}
                    {/*        color="gray.500"*/}
                    {/*        fontWeight="400"*/}
                    {/*    >*/}
                    {/*    this could also show the actual name if the accountDB assuming they've registered their accountDB or contract address*/}
                    {/*        From: {fromAcc}*/}
                    {/*    </Text>*/}
                    {/*    <Spacer/>*/}
                    {/*    <Text*/}
                    {/*        noOfLines={1}*/}
                    {/*        fontSize="md"*/}
                    {/*        color="gray.500"*/}
                    {/*        fontWeight="400"*/}
                    {/*    >*/}
                    {/*       {timeStampFormatted}*/}
                    {/*    </Text>*/}

                    {/*</HStack>*/}
                    <Stack>
                        {/*<HStack>*/}
                        {/*    <Text*/}
                        {/*        noOfLines={1}*/}
                        {/*        fontSize="md"*/}
                        {/*        color="gray.500"*/}
                        {/*        fontWeight="400"*/}
                        {/*    >*/}
                        {/*    this could also show the actual name if the accountDB assuming they've registered their accountDB or contract address OR get the name of the contract from the contract*/}
                        {/*        To: {toAcc}*/}
                        {/*    </Text>*/}
                        {/*    <Spacer/>*/}
                        {/*    <Text*/}
                        {/*        noOfLines={1}*/}
                        {/*        fontSize="md"*/}
                        {/*        color="gray.500"*/}
                        {/*        fontWeight="400"*/}
                        {/*    >*/}
                        {/*        txHash: {txHash}*/}
                        {/*    </Text>*/}

                        {/*</HStack>*/}
                    </Stack>
                    <Stack>
                        {/*<HStack>*/}
                        {/*    <Text*/}
                        {/*        noOfLines={1}*/}
                        {/*        fontSize="md"*/}
                        {/*        color="gray.500"*/}
                        {/*        fontWeight="400"*/}
                        {/*    >*/}
                        {/*    //show red or green depending on in or out*/}
                        {/*         {cost}*/}
                        {/*    </Text>*/}
                        {/*    <Spacer/>*/}
                        {/*    <Text*/}
                        {/*        noOfLines={1}*/}
                        {/*        fontSize="md"*/}
                        {/*        color="gray.500"*/}
                        {/*        fontWeight="400"*/}
                        {/*    >*/}
                        {/*        Something here: { something here}*/}
                        {/*    </Text>*/}
                        {/*</HStack>*/}
                    </Stack>
                    <Stack>
                        {/*<HStack>*/}
                        {/*    <Text*/}
                        {/*        noOfLines={1}*/}
                        {/*        fontSize="md"*/}
                        {/*        color="gray.500"*/}
                        {/*        fontWeight="400"*/}
                        {/*    >*/}
                        {/*    //show red or green depending on in or out*/}
                        {/*         {addressName}*/}
                        {/*    </Text>*/}
                        {/*    <Spacer/>*/}
                        {/*    <Text*/}
                        {/*        noOfLines={1}*/}
                        {/*        fontSize="md"*/}
                        {/*        color="gray.500"*/}
                        {/*        fontWeight="400"*/}
                        {/*    >*/}
                        {/*        tx count: {txCount}*/}
                        {/*    </Text>*/}
                        {/*</HStack>*/}
                    </Stack>
                </HStack>
            </Stack>
        </Flex>
    )
};

export default AccountLedger;