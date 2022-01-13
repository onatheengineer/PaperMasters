import { Button, Card, message, Row, Col } from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import type {FC} from 'react';
import {useState, useEffect} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';
import Avatar from '../../../../dapp/src/components/UI/molecules/Avatar';
import Web3 from "web3";
import MintIdentity from "../../contracts/MintIdentity.json"
import Fail from '../result/fail/index.tsx';

const fieldLabels = {
  name: 'Identity Name',
  aka: 'Familiar Name',
  slogan: 'Slogan',
  organization: 'Organization',
  description: 'Description',
  url: 'Webpage'
};

const BasicForm: FC<Record<string, any>> = () => {
  const [name, setName] = useState<string | null>(null);
  const [familiarName, setFamiliarName] = useState<string | null>(null);
  const [slogan, setSlogan] = useState<string | null>(null);
  const [org, setOrg] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [account, setAccount] = useState([]);
  const [identities, setIdentities] = useState({});
  const [error, setError] = useState(false);


  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const contract = new web3.eth.Contract(MintIdentity.abi as any, MintIdentity.networks['5777'].address);
  console.log(MintIdentity);

  useEffect(()=> {
    web3.eth.requestAccounts().then((acc) => {setAccount(acc)});
    contract.methods.totalSupply().call().then((ts: any) => {
      console.log(ts);
     }, (error)=>{console.log(error)})
  }, []);

  useEffect(()=>{
    console.log("accoutn use effect");
    console.log(account);
    account.map((eachAcc)=>{
      console.log(eachAcc);
      contract.methods.balanceOf(eachAcc).call().then((values: any) => {
        console.log(values);
        for (let i = 0; i < values; i++) {
          console.log(i)
         contract.methods.getTokenIdentity(i).call().then((ident: any) => {
            console.log(ident);
         });
        }
      }, (error)=>{
        console.log(error);
      })
    })

  }, [account]);


  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('Submitted Successfully');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    run(values); //pop-up "up to a minute"
  };

  const nameChange = (evt) => {setName(evt.target.value);};
  const familiarNameChange = (evt) => {setFamiliarName(evt.target.value);};
  const sloganChange = (evt) => {setSlogan(evt.target.value);};
  const orgChange = (evt) => {setOrg(evt.target.value);};
  const descChange = (evt) => {setDesc(evt.target.value);};
  const urlChange = (evt) => {setUrl(evt.target.value);};

  if(error){
  return(<Fail/>);
  }

  return (
    <PageContainer content="Mint yourself or your company and use your unique NFT Identification Number to become a legitimate Artist on the Blockchain.">
      {JSON.stringify(account, null, 3)}
     <Row gutter={6}>
       <Col span={12}>
      <Card bordered={false} title={"Identity Identification Number (NFT ID)"}>
        <ProForm
          hideRequiredMark={false}
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="vertical"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >
          <ProFormText
            onChange={nameChange}
            width="md"
            label={fieldLabels.name}
            name="name"
            rules={[
              {
                required: true,
                message: 'Name',
              },
            ]}
            placeholder="First and Last/Surname name/Company Name"
          />
          <ProFormText
            onChange={familiarNameChange}
            width="md"
            label={fieldLabels.aka}
            name="AKA"
            rules={[
              {
                required: false,
                message: 'known by',
              },
            ]}
            placeholder="Also Known As, informal name"
          />
          <ProFormText
            onChange={orgChange}
            width="md"
            label={fieldLabels.organization}
            name="Organization"
            rules={[
              {
                required: false,
                message: 'Organization',
              },
            ]}
            placeholder="Organization"
          />
          <ProFormText
            onChange={sloganChange}
            width="md"
            label={fieldLabels.slogan}
            name="Slogan"
            rules={[
              {
                required: false,
                message: 'Tagline',
              },
            ]}
            placeholder="Moto"
          />
          <ProFormText
            onChange={urlChange}
            label={fieldLabels.url}
            name="url"
            rules={[{ required: false, message: '请选择' }]}
            fieldProps={{
              style: { width: '75%' },
              //addonBefore: 'http://',
              //addonAfter: '.com',
            }}
            placeholder="personal or company url"
          />
          <ProFormTextArea
            onChange={descChange}
            //onChange = {maxLength}
            width="lg"
            label={fieldLabels.description}
            name="goal"
            rules={[
              {
                required: true,
                message: 'What you want people to know',
              },
            ]}
            placeholder="What you want people to know"
            //maxLengh={50}//add max number of characters
            //needs enter or wrap around after so many characters
          />
        </ProForm>
      </Card>
       </Col>
       <Col span={12}>

           <Card bordered={false} title={"Your unique PaperMasters NFT Identification"} style={{boxShadow: "inset 0 0 10px purple"}}>
           <Avatar name={name} familiarName={familiarName} slogan={slogan} organization={org} url={url} description={desc}/>
         </Card>

       </Col>
     </Row>
    </PageContainer>
  );
};

export default BasicForm;
