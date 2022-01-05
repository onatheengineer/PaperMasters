import React, {FunctionComponent} from 'react';
import {Layout, Menu, Breadcrumb, Input, Button} from 'antd';
// @ts-ignore

import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux";
import {selectIdentities} from "../store/slices";
import {Form} from 'antd';
import {Row, Col} from 'antd';

const Identities:FunctionComponent=()=>{
    /*
     string memory name,
        string memory aka,
        string memory org,
        string memory slogan,
        string memory description,
        string memory url,
        string memory bio
     */

    const identities = useSelector(selectIdentities); // Identities from the Redux


    const updateIdentity = (update: any)  => {
            console.log("UPDATE IDENTITY");
            console.log(update);
    }

    return(<div>
        <Row>
            <Col span={10}>
                <h2>  My Identities</h2>
            </Col>
        </Row>


        {Object.keys(identities).map((acc,i) => {

            return <Row gutter={16}>
                {identities[acc as any].map((ident: any, j: any) => {
                    const dateCreated = new Date(0);
                    dateCreated.setUTCSeconds(ident['created']);

                    const dateUpdated = new Date(0);
                    dateUpdated.setUTCSeconds(ident['lastupdated']);

                    return <Col span={8}>
                            <Form>
                                <h3>UniqueID: {ident['uniqueid']}</h3>
                                <h6>Date Created:{dateCreated.toLocaleDateString()} {dateCreated.toLocaleTimeString()} </h6>
                                <h6>Last Updated:{dateUpdated.toLocaleDateString()} {dateUpdated.toLocaleTimeString()} </h6>
                                <div>
                                    <Input addonBefore={<div style={{width:'100px'}}>Name</div>} defaultValue={ident['name']} />
                                </div>
                                <div>
                                    <Input addonBefore={<div style={{width:'100px'}}>Alias</div>} defaultValue={ident['aka']} />
                                </div>
                                <div>
                                   <Input addonBefore={<div style={{width:'100px'}}>Organization</div>} defaultValue={ident['org']} />
                                </div>
                                <div>
                                    <Input addonBefore={<div style={{width:'100px'}}>Slogan</div>} defaultValue={ident['slogan']} />
                                </div>
                                <div>
                                    <Input addonBefore={<div style={{width:'100px'}}>Description</div>} defaultValue={ident['description']} />
                                </div>
                                <div>
                                    <Input addonBefore={<div style={{width:'100px'}}>URL</div>} defaultValue={ident['url']} />
                                </div>
                                <div>
                                    <Input addonBefore={<div style={{width:'100px'}}>Bio</div>} defaultValue={ident['bio']} />
                                </div>
                                <div style={{textAlign:"right"}}>
                                    <Button type="primary" htmlType="submit" onClick={updateIdentity}>
                                        Update Identity
                                    </Button>
                                </div>
                            </Form>
                        </Col>;
                    })}

            </Row>
        })}


    </div>)
};

export default Identities;


