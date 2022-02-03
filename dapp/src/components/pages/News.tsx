import React from 'react';
import {useState, useEffect} from "react";
import type {FC} from 'react'
import {Box, Flex, Button, FormControl, FormLabel, Grid, GridItem, Input, Stack} from '@chakra-ui/react';
import Sidebar from "../Sidebar";
import {Route, Routes} from "react-router-dom";
import ForumPages from "./ForumPages";



interface Interface {

}

export const News:FC<Interface>=()=>{

    // const NewsForumPage = [
    //     <ForumPages title={'PaperMaster News'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPages title={'New Features'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPages title={'Updated Features'} body={'dfgfdhdftgyertg'}/>,
    //     <ForumPages title={'Future Features'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
    // ]

        return (

            <Flex>

                <Flex >
                    <Sidebar/>
                </Flex>
                <Box flex='auto'  style={{border: '8px solid white'}}>
                    <ForumPages title={"New Features"} body={"sdfhdkjfghierugerjk"} forumPageHeader={'News'}/>
                </Box>
            </Flex>

        )
    };


export default News;