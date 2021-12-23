import React, {FunctionComponent} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const Legitimacy:FunctionComponent=()=>{
    return(
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
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Intellectual Property">
                    <Menu.Item key="3">Protection</Menu.Item>
                    <Menu.Item key="4">Punishment</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<NotificationOutlined />} title="Fraudulent Artists">
                    <Menu.Item key="10">Reporting</Menu.Item>
                    <Menu.Item key="11">List</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
    </Layout>)

};

export default Legitimacy;


