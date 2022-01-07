import React, {FunctionComponent, useEffect} from 'react';
import {useSelector,  useDispatch} from "react-redux";
import HomePage from "./pages/homePage/homepage.component";
import Header from "./components/header/header.component";
import logo from '../../dapp/src/assets/PaperMastersLogo.png';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css';
import {useState} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import MintIdentity from "./contracts/MintIdentity.json";
import {asyncGetConnectedAccounts, selectAccounts, selectIdentities, selectTotalSupply} from "./store/slices";

const { SubMenu } = Menu;
const { Header, Footer, Content, Sider } = Layout;

const App:FunctionComponent=()=> {

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
    }, []);

    /* useEffect(() => {
        if (contract !== undefined) {
            console.log("GET TS and BALANCE")
           contract.methods.totalSupply().call().then((ts: any) => {
                setTotalSupply(ts);
            });
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
                Promise.all(identityPromises).then((manageIdentities) => {
                    console.log("IDENTITIES");
                    console.log(manageIdentities);
                })
            })
        }
    },[balance]);
    */


    return(
        <>
            <Layout>
                <Header className="purple-header">
                    <Menu className="purple-header" mode="horizontal">
                        <Menu.Item key="1"><Link to='/'><img src={logo}/></Link> </Menu.Item>

                        <SubMenu key="2" style={{ marginLeft: 'auto' }} icon={<MailOutlined />} title={<Link to='/Legitimacy'>Blockchain Legitimacy</Link>}>
                            <Menu.ItemGroup key="g1" title="Item 1">
                                <SubMenu key="sub1" icon={<UserOutlined />} title="Legitimacy">
                                    <Menu.Item key="1">Protocol</Menu.Item>
                                    <Menu.Item key="2">DeRegulation</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Intellectual Property">
                                    <Menu.Item key="3">Protection</Menu.Item>
                                    <Menu.Item key="4">Punishment</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="Fraudulent Artists">
                                    <Menu.Item key="5">Reporting</Menu.Item>
                                    <Menu.Item key="6">List</Menu.Item>
                                </SubMenu>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>


                        <SubMenu key="3" icon={<MailOutlined />} title={<Link to='/Identities'>Identities {accounts.length}</Link>}>
                            <Menu.ItemGroup key="g1" title="Item 1">
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>

                        <SubMenu key="4" icon={<MailOutlined />} title={<Link to='/GetMinted'>Get Minted - Total Minted: {totalSupply}</Link>}>
                            <Menu.ItemGroup key="g1" title="Item 1">
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>

                        <SubMenu key="5" icon={<MailOutlined />} title={<Link to='/ArtistWork'>Artist Portfolios and Artwork</Link>}>
                            <Menu.ItemGroup key="g1" title="Item 1">
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>

                        <SubMenu key="6" icon={<MailOutlined />} title={<Link to='/AboutUs'>About Us</Link>}>
                            <Menu.ItemGroup key="g1" title="Item 1">
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>

                    </Menu>
                </Header>
                <Header className="purple-content white-footer site-layout-banner" style={{ textAlign: 'center' }}> The Standard for Legitimate Blockchain Identities</Header>
                <Content className="purple-header site-layout-content">

                    <Routes>
                        <Route path="/" element={<div>HomePage</div>} />
                        <Route path="/Legitimacy" element={<Legitimacy/>} />
                        <Route path="/Identities" element={<Identities/>} />
                        <Route path="/Mint" element={<Mint/>} />
                        <Route path="/Manage" element={<Manage/>} />
                    </Routes>
                </Content>

                <Footer className="purple-content white-footer" style={{ textAlign: 'center' }}> ©2019 Veil Research, Corp. ~ Produced by The PaperMasters <br/> Establishing Legitimacy on the Blockchain</Footer>
            </Layout>
        </>
    );
};

export default function App()