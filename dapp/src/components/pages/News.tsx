import React from 'react';
import {useState, useEffect} from "react";
import type {FC} from 'react'
import {Box, Flex, Button, FormControl, FormLabel, Grid, GridItem, Input, Stack} from '@chakra-ui/react';
import RoutesRoutes from "../../app/RoutesRoutes";
import {Route, Routes} from "react-router-dom";
import PageForum from "./PageForum";


export const News:FC=()=>{

    // const NewsForumPage = [
    //     <PageForum title={'PaperMaster News'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'New Features'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'Updated Features'} body={'dfgfdhdftgyertg'}/>,
    //     <PageForum title={'Future Features'} body={'bdfkljgiuertywrebfbfshjteruerter'}/>,
    // ]
        return (
            <Flex>
                {/*<Flex >*/}
                {/*    <RoutesRoutes/>*/}
                {/*</Flex>*/}
                <Box flex='auto'  style={{border: '8px solid white'}}>
                    <PageForum title={"News"} body={"New Features"}/>
                </Box>
            </Flex>
        )
    };


export default News;