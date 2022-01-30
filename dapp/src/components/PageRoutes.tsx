import * as React from 'react';
import type {FC} from 'react';
import { Box, Flex} from '@chakra-ui/react';
import Sidebar from "./molecules/Sidebar";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Attach from "./pages/Attach";
import Identity from "./pages/Identity";


interface Interface {

}

export const PageRoutes: FC<Interface>=()=> {
    return (

        <Flex>
            <Sidebar/>

            <Box flex='auto' bg='#e6dee6' style={{border: '8px solid white'}}>

                <Routes>
                    <Route path ="profile" element={<Identity/>}/>

                    <Route path="register" element={<Register/>}/>

                    <Route path="attach" element={<Attach/>}/>

                </Routes>

            </Box>
        </Flex>

    )
};

export default PageRoutes;