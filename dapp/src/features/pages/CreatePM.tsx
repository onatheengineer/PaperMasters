import React from 'react'
import SimpleSidebar from "../molecules/Sidebar";

import {FunctionComponent, useState, useEffect} from "react"
import Web3 from "web3";
import type {FC} from 'react';
import {Button, FormControl, FormLabel, Grid, GridItem, Input, Stack} from '@chakra-ui/react';
import MintIdentity from "../../../src/contracts/MintIdentity.json"


interface Interface {

}

export const Create:FunctionComponent<Interface>=()=>{

    const [name, setName] = useState<string | null>(null);
    const [familiarName, setFamiliarName] = useState<string | null>(null);
    const [slogan, setSlogan] = useState<string | null>(null);
    const [org, setOrg] = useState<string | null>(null);
    const [desc, setDesc] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [account, setAccount] = useState<string[]>([]);
    const [identities, setIdentities] = useState({});

    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const contract = new web3.eth.Contract(MintIdentity.abi as any, MintIdentity.networks['5777'].address);
    console.log(MintIdentity);

    useEffect(()=> {
        web3.eth.requestAccounts().then((acc : string[]) => {setAccount(acc)});
        contract.methods.totalSupply().call().then((ts: any) => {
            console.log(ts);
        }, (error: any)=>{console.log(error)})
    }, []);

    useEffect(()=>{
        console.log("accoutn use effect");
        console.log(account);
        account.map((eachAcc)=>{
            console.log(eachAcc);
            contract.methods.balanceOf(eachAcc).call().then((values: any) => {
                console.log(values);
                for (let i = 0; i < values; i++) {
                    console.log(i)
                    contract.methods.getTokenIdentity(i).call().then((ident: any) => {
                        console.log(ident);
                    });
                }
            }, (error: any)=>{
                console.log(error);
            })
        })

    }, [account]);


    const nameChange = (e: any) => {setName(e.target.value);};
    const familiarNameChange = (e: any) => {setFamiliarName(e.target.value);};
    const sloganChange = (e: any) => {setSlogan(e.target.value);};
    const orgChange = (e: any) => {setOrg(e.target.value);};
    const descChange = (e: any) => {setDesc(e.target.value);};
    const urlChange = (e: any) => {setUrl(e.target.value);};


    return(
        <SimpleSidebar>
            <Grid templateColumns='repeat(5, 1fr)' gap={1}>
                <GridItem rowSpan={2} colSpan={2} w='100%' h='1200' bg='#F8F8FA' />

                <FormControl isRequired>

                    <FormLabel htmlFor='first-name'>First name</FormLabel>
                    <Input id='first-name' placeholder='First name' />

                    <FormLabel htmlFor='familiar-name'>Familiar name</FormLabel>
                    <Input id='familiar-name' placeholder='Familiar name' />

                    <Stack direction='row' spacing={4}>
                        <Button
                            isLoading
                            loadingText='Submitting'
                            colorScheme='purple'
                            variant='outline'
                        >
                            Submit
                        </Button>
                    </Stack>

                </FormControl>

                <GridItem colStart={4} colEnd={6} h='1200' bg='#F8F8FA' />



            </Grid>
        </SimpleSidebar>
    )
};

export default Create;