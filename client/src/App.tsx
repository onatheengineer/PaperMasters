import React, {FunctionComponent} from 'react';
import Web3 from 'web3';
import logo from './legoLavendarheadercroped.png';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css';
import {useState} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Legitimacy from "./pages/Legitimacy";
import GetMinted from "./pages/GetMinted";
import ArtistWork from "./pages/ArtistWork";
import AboutUs from "./pages/AboutUs";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
web3.eth.getAccounts().then(console.log);

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const App:FunctionComponent=()=>{

    return (
    <BrowserRouter>
        <Layout>
            <Header className="header" >
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to='/Legitimacy'>Blockchain Legitimacy</Link> </Menu.Item>
                    <Menu.Item key="2"><Link to='/GetMinted'>Get Minted</Link> </Menu.Item>
                    <Menu.Item key="3"><Link to='/ArtistWork'>Artist Portfolios and Artwork</Link> </Menu.Item>
                    <Menu.Item key="4"><Link to='/AboutUs'>About Us</Link> </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>

                <Routes>
                    <Route path="/" element={<div>home page</div>} />
                    <Route path="/Legitimacy" element={<Legitimacy/>} />
                    <Route path="/GetMinted" element={<GetMinted/>} />
                    <Route path="/ArtistWork" element={<ArtistWork/>} />
                    <Route path="/AboutUs" element={<AboutUs/>} />
                </Routes>
                </Content>
            <Footer style={{ textAlign: 'center' }}>Veil Research, Corp. ©2019 Created by The PaperMasters - Establishing Legitimacy on the Blockchain - </Footer>
        </Layout>
    </BrowserRouter>
    );

}

export default App;
