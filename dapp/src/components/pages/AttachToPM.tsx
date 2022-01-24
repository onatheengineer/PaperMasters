import React from 'react';
import {useState, useEffect} from "react";
import type {FC} from 'react'
import {Button, FormControl, FormLabel, Grid, GridItem, Input, Stack, Box} from '@chakra-ui/react';
import BoxBox from "../atoms/BoxBox";

interface Interface {

}

export const Attach:FC<Interface>=()=>{

    return(

        <BoxBox>
            This box doesn't show up
        </BoxBox>
    )
};

export default Attach;