import React, {useState, useEffect} from "react"
import Web3 from "web3";
//import { useAppSelector, useAppDispatch } from 'app/hooks';
import MintIdentity from "../../contracts/MintIdentity.json"


export const ConnectAccounts=()=> {

    //entry into web3 API, communicating with blockchain.
    // find out how to use givenProvider and who it currently is set to...ie. ethernet, one, etc.
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const [account, setAccount] = useState<string[]>([]);

    useEffect(() => {
        web3.eth.requestAccounts()
            .then((acc: string[]) =>
            {
                setAccount(acc)
            });
    }, []);

};

export default ConnectAccounts;