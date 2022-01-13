import {useState, useEffect} from 'react';
import Web3 from 'web3';

// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';


const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

const [account, setAccount] = useState([]);
const [identities, setIdentities] = useState({});

useEffect(()=> {
  detectEthereumProvider().then((provider) => {/*initialize our dapp*/
  }, (error) => console.log('Please install MetaMask'));
};

useEffect(()=> {
  web3.eth.requestAccounts().then((acc) => {setAccount(acc)});
  contract.methods.totalSupply().call().then((ts: any) => {
    console.log(ts);
  }, (error)=>{console.log(error)})
}, []);

useEffect(()=>{
  console.log("account use effect");
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

