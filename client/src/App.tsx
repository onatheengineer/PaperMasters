import React, {FunctionComponent} from 'react';
import logo from './legoLavendarheadercroped.png';
import 'antd/dist/antd.css';
import './App.css';
import {useState} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


const App:FunctionComponent=()=>{

    return (

        <Layout>
            <Header className="header" >
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">About Blockchain Legitimacy</Menu.Item>
                    <Menu.Item key="2">Get Minted</Menu.Item>
                    <Menu.Item key="3">Artist Portfolios & Artwork</Menu.Item>
                    <Menu.Item key="4">About Us</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Blockchain Legitimacy</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={250}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="Blockchain Legitimacy">
                                <Menu.Item key="1">Protocol</Menu.Item>
                                <Menu.Item key="2">DeRegulation</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Copyrights">
                                <Menu.Item key="3">Protection</Menu.Item>
                                <Menu.Item key="4">Punishment</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<NotificationOutlined />} title="Fraudulent Artists">
                                <Menu.Item key="10">Reporting</Menu.Item>
                                <Menu.Item key="11">List</Menu.Item>
                                <Menu.Item key="12">option11</Menu.Item>
                                <Menu.Item key="13">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Veil Research, Corp. ©2019 Created by The PaperMasters - Establishing Legitimacy on the Blockchain</Footer>
        </Layout>
    );

}

export default App;
