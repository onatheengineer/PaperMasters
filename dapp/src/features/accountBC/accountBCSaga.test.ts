import {call, put, takeEvery, select, takeLatest, all} from 'redux-saga/effects';
import {PayloadAction} from "@reduxjs/toolkit";
import Web3 from "web3";
import {
    chainIdProvider,
    chainIdStatus,
    chainIdSupportedBool,
    accountArr,
    accountArrStatus,
    addressHasIdentityBool,
    getStructBC,
    addressToTokenID,
    addressToTokenAction,
    singleStructBCAction,
    accountArrAction,
    addressToTokenBool, accountArrMetaMaskAction,
} from "./AccountBCSlice";
import {accountArrDBAction} from '../accountDB/AccountDBSlice';
import axios from "axios";
import chainIdJSON from "../JSON/chainId.json";
import chainIdNetworks from "../JSON/chainId.networks.json";
import {SagaIterator} from "redux-saga";
import MintABI from "../../abiFiles/PaperMastersNFI.json";
import {ParamsURLInterface} from "../accountDB/AccountDBSlice.types";
import {WalletConnectMetaMaskInterface} from "./AccountBCSlice.types";
import { ethers } from "ethers";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {showToast} from "../toast/ToastSlice";
import {expectSaga} from "redux-saga-test-plan";
import {accountArrSaga,accountArrMetaMaskSaga } from './accountBCSaga';
import {fireEvent, render, screen} from '@testing-library/react';
import Navbar from "../../components/Navbar";

// const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';
//
// //testing nav connect button
// test('button initially has, connect wallet, text', ()=>{
//     render(<Navbar/>);
//     screen.getAllByRole('button', {name: 'connect wallet'});
//
// });
// test('button opens metamask or wallet connect when clicked', ()=>{
//     fireEvent.click()
// });
// test('button changes text to, connected, when clicked', ()=>{
//
// });