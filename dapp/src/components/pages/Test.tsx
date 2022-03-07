import React, {FC} from 'react';
import {Button} from '@chakra-ui/react'
import axios from "axios";

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com/receipt';
const Test = () => {

    const onClickTest = () => {

        const dataToSend = {
            walletAccount: "0x435667768hjrtrefdgbhghghj",
            gasUsed: 538638638386,
            contractAccount: 'hhhhh56565656hjhjhjhjhj',
            transactionHash: "0x323556cffgghhhhhhhg",
            tokenID: 1
        }
        axios.put(baseURL, dataToSend)
            .then(
                (response) => {
                    console.log(response.data)
                },
                (error) => {
                    console.log(error)
                });
    }
    return <div>
        <Button onClick={onClickTest}>Test</Button>
    </div>
}

export default Test;