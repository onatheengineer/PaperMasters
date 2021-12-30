import React, {FunctionComponent, useEffect} from 'react';
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
import Identities from "./pages/Identities";
import MintIdentity from "./contracts/MintIdentity.json";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const App:FunctionComponent=()=>{

    const [accounts, setAccounts] = useState<string[]>([]);
    const [contract, setContract] = useState<any>(undefined);
    const [totalSupply, setTotalSupply] = useState<any>(undefined);
    const [balance, setBalanceOf] = useState<any>(undefined);
    console.log("WEB3 Test");
    console.log(Web3.givenProvider)

    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    console.log(web3);
    useEffect(() => {
        web3.eth.requestAccounts().then((acc) => {
            console.log("ACCOUNTS");
            console.log(acc)
            setAccounts(acc)
        });
    },[]);

    useEffect(() => {
        if (accounts.length > 0) {
            const contract = new web3.eth.Contract(MintIdentity.abi as any, "0x1549f9e9FB6e5437f1855CF31B4B029D3C87f767");

            setContract(contract);
            console.log(contract)
        }
    },[accounts])

    useEffect(() => {
        if (contract !== undefined) {
           contract.methods.totalSupply().call().then((ts: any) => {
                setTotalSupply(ts);
            });
           contract.methods.balanceOf(accounts[0]).call().then((balance: any) => {
               console.log("BALANCE!");
               console.log(balance);
               setBalanceOf(balance);
           })

        }
    },[contract]);
    useEffect(() => {
        if (balance !== undefined) {
            const tokenPromises = []
            for (let i = 0; i < balance; i++) {
                tokenPromises.push( contract.methods.tokenOfOwnerByIndex(accounts[0],i).call());
            }

            Promise.all(tokenPromises).then((values) => {
                console.log("VALUES");
                console.log(values);
                const identityPromises: any[] = [];
                for (let i = 0; i < values.length; i++) {
                    console.log("PUSH ",i)
                    identityPromises.push(contract.methods.getTokenIdentity(values[i]).call());
                }
                Promise.all(identityPromises).then((identities) => {
                    console.log("IDENTITIES");
                    console.log(identities);
                })
            })


        }
    },[balance]);

    return (<BrowserRouter>
        <Layout>
            <Header className="header" >
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to='/Legitimacy'>Blockchain Legitimacy</Link> </Menu.Item>
                    <Menu.Item key="2"><Link to='/GetMinted'>Get Minted</Link> </Menu.Item>
                    <Menu.Item key="3"><Link to='/ArtistWork'>Artist Portfolios and Artwork</Link> </Menu.Item>
                    <Menu.Item key="4"><Link to='/AboutUs'>About Us</Link> </Menu.Item>
                    <Menu.Item key="5" style={{backgroundColor:"green"}}><Link to='/Identities'>My Identities {accounts.length} {balance}</Link> </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>

                <Routes>
                    <Route path="/" element={<div>home page</div>} />
                    <Route path="/Legitimacy" element={<Legitimacy/>} />
                    <Route path="/GetMinted" element={<GetMinted/>} />
                    <Route path="/ArtistWork" element={<ArtistWork/>} />
                    <Route path="/AboutUs" element={<AboutUs/>} />
                    <Route path="/Identities" element={<Identities/>} />
                </Routes>
                </Content>
            <Footer style={{ textAlign: 'center' }}>Veil Research, Corp. ©2019 Created by The PaperMasters - Establishing Legitimacy on the Blockchain </Footer>
        </Layout>
    </BrowserRouter>
    );

}

export default App;
