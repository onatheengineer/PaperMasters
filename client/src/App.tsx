import React, {FunctionComponent, useEffect} from 'react';
import {useSelector,  useDispatch} from "react-redux";

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
import {asyncGetConnectedAccounts, selectAccounts, selectIdentities, selectTotalSupply} from "./store/slices";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


const App:FunctionComponent=()=>{

    const dispatch = useDispatch();

   // const [accounts, setAccounts] = useState<string[]>([]);
   // const [contract, setContract] = useState<any>(undefined);
   // const [totalSupply, setTotalSupply] = useState<any>(undefined);
   // const [balance, setBalanceOf] = useState<any>(undefined);


    // Redux Global Slice State - see store/slice/Web3
    const accounts = useSelector(selectAccounts);

    // Redux Global SLice State for Total Supply - see store/slice/Web3
    const totalSupply = useSelector(selectTotalSupply);


    // Redux Global Slice of the Users Identities
    const identities = useSelector(selectIdentities);

    // Initial Load of the Page, we dispatch to get the connected Meta Mask Accounts
    // If no Account is linked, this will fail or be 0.. It will prompt the user
    // to select an account to link
    useEffect(() => {
        dispatch(asyncGetConnectedAccounts());
    },[]);


    return (
        <Layout>
            <Header className="header" >
                <div className="logo" />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1"><Link to='/Legitimacy'>Blockchain Legitimacy</Link> </Menu.Item>

                    <Menu.Item key="3"><Link to='/ArtistWork'>Artist Portfolios and Artwork</Link> </Menu.Item>
                    <Menu.Item key="4"><Link to='/AboutUs'>About Us</Link> </Menu.Item>
                    <Menu.Item key="2"><Link to='/GetMinted'>Get Minted</Link> </Menu.Item>
                    <Menu.Item key="5" style={{backgroundColor:"green"}}><Link to='/Identities'>My Identities {accounts.length}</Link> </Menu.Item>

                </Menu>

            </Header>
            <Content style={{ padding: '0 50px' }}>

                <Routes>
                    <Route path="/" element={<div>HomePage</div>} />
                    <Route path="/Legitimacy" element={<Legitimacy/>} />
                    <Route path="/GetMinted" element={<GetMinted/>} />
                    <Route path="/ArtistWork" element={<ArtistWork/>} />
                    <Route path="/AboutUs" element={<AboutUs/>} />
                    <Route path="/Identities" element={<Identities/>} />
                </Routes>
                </Content>
            <Footer style={{ textAlign: 'center' }}>Veil Research, Corp. ©2019 Created by The PaperMasters - Establishing Legitimacy on the Blockchain </Footer>
        </Layout>
    );

}

export default App;
