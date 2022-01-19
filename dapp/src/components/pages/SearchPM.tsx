import React from 'react';
import {useState, useEffect} from "react";
import type {FC} from 'react'
import {Button, FormControl, FormLabel, Grid, GridItem, Input, Stack} from '@chakra-ui/react';
import SimpleSidebar from "../molecules/Sidebar";



interface Interface {

}

export const Search:FC<Interface>=()=>{

    return(
        <SimpleSidebar>
            <Grid
                w={'1800px'}
                h='900px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                {/*<GridItem rowSpan={2} colSpan={1} bg='tomato' />*/}
                <GridItem colSpan={2} bg='whitesmoke' />
                <GridItem colSpan={2} bg='whitesmoke' />
                <GridItem colSpan={2} bg='whitesmoke' />
                <GridItem colSpan={2} bg='whitesmoke' />
                {/*<GridItem colSpan={4} bg='tomato' />*/}
            </Grid>


        </SimpleSidebar>
    )
};

export default Search;


// useEffect(() => {
//     console.log("accoutn use effect");
//     console.log(account);
//     account.map((eachAcc) => {
//         console.log(eachAcc);
//         contract.methods.balanceOf(eachAcc).call().then((values: any) => {
//             console.log(values);
//             for (let i = 0; i < values; i++) {
//                 console.log(i)
//                 contract.methods.getTokenIdentity(i).call().then((ident: any) => {
//                     console.log(ident);
//                 });
//             }
//         }, (error: any) => {
//             console.log(error);
//         })
//     })
//
// }, [account]);

// contract.methods.totalSupply().call().then((ts: any) => {
//     console.log(ts);
// }, (error: any) => {
//     console.log(error)
// })
//