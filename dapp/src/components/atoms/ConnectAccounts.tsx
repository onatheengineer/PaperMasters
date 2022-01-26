import React, {useState, useEffect} from "react"
import Web3 from "web3";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {accountsArr, statusOfArr} from '../../features/CreateSlice';
import { Menu } from "@chakra-ui/react";
import detectEthereumProvider from '@metamask/detect-provider';
import { MetamaskStateProvider } from "use-metamask";
import { ethers } from "ethers";
import { useMetamask } from "use-metamask";
const { connect, getAccounts, getChain, metaState } = useMetamask();


//entry into web3 API, communicating with blockchain. find out how to use givenProvider and who it currently is set to...ie. ethernet, one, etc.
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

export const ConnectAccounts =()=> {

    const { connect, metaState } = useMetamask();

//     const provider = await detectEthereumProvider();

//     if (provider) {
//     // From now on, this should always be true:
//     // provider === window.ethereum
//     startApp(provider); // initialize your app
// } else {
//     console.log('Please install MetaMask!');
// }
//
//     ethereumButton.addEventListener('click', () => {
//         getAccount();
//     });
//
//     async function getAccount() {
//         const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//         const account = accounts[0];
//         showAccount.innerHTML = account;
//     }
//
//     const accounts = useAppSelector((state) => state.PMI.accounts);
//     const status = useAppSelector((state) => state.PMI.status);
//     const dispatch = useAppDispatch();
//
//
//     const ethereumButton = document.querySelector('.enableEthereumButton');
//     const showAccount = document.querySelector('.showAccount');
//
//     useEffect(() => {
//         if (!metaState.isConnected) {
//             (async () => {
//                 try {
//                     await connect(Web3);
//                 } catch (error) {
//                     console.log(error);
//                 }
//             })();
//         }
//     }, []);
//
//     useEffect(() => {
//         dispatch(statusOfArr('loading'));
//             web3.eth.requestAccounts()
//                 .then((acc: string[]) => {
//                     dispatch(accountsArr(acc));
//                     dispatch(statusOfArr('succeeded'));
//                 }, (error)=>{
//                     dispatch(accountsArr([]));
//                     dispatch(statusOfArr('failed'))
//                 });
//     },[])
//
//
//     useEffect(() => {
//         if (metaState.isAvailable) {
//             (async () => {
//                 try {
//                     /* you can get the information directly
//                      * by assigning them to a variable,
//                      * or from metaState.account and metaState.chain
//                     */
//                     let account = await getAccounts();
//                     let chain = await getChain();
//                 } catch (error) {
//                     console.log(error);
//                 }
//             })();
//         }
//     }, []);
//
//
//     useEffect(() => {
//         console.log('account has changed');
//         console.log(accounts);
//     },[accounts])
//
//
//     return (
//
//             <Menu>
//                 <div>{accounts?.map((el) => {
//                     return <div>Account: {el}</div>
//                 })}</div>
//             </Menu>
//
//
//     );
};

export default ConnectAccounts;