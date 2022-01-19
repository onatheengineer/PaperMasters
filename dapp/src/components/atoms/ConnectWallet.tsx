import React, {useState, useEffect} from "react"
import Web3 from "web3";
//import { useAppSelector, useAppDispatch } from 'app/hooks';
import MintIdentity from "../../contracts/MintIdentity.json"



export const ConnectWallet=()=> {
    const [name, setName] = useState<string | null>(null);
    const [familiarName, setFamiliarName] = useState<string | null>(null);
    const [slogan, setSlogan] = useState<string | null>(null);
    const [org, setOrg] = useState<string | null>(null);
    const [desc, setDesc] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [identities, setIdentities] = useState({});


    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const contract = new web3.eth.Contract(MintIdentity.abi as any, MintIdentity.networks['5777'].address);
    console.log(MintIdentity);

    const [account, setAccount] = useState<string[]>([]);
    
        useEffect(() => {
            web3.eth.requestAccounts().then((acc: string[]) => {
                setAccount(acc)
            });
        }, []);


    useEffect(() => {
        console.log("accoutn use effect");
        console.log(account);
        account.map((eachAcc) => {
            console.log(eachAcc);
            contract.methods.balanceOf(eachAcc).call().then((values: any) => {
                console.log(values);
                for (let i = 0; i < values; i++) {
                    console.log(i)
                    contract.methods.getTokenIdentity(i).call().then((ident: any) => {
                        console.log(ident);
                    });
                }
            }, (error: any) => {
                console.log(error);
            })
        })

    }, [account]);
    
    };







    // contract.methods.totalSupply().call().then((ts: any) => {
        //     console.log(ts);
        // }, (error: any) => {
        //     console.log(error)
        // })
        //



export default ConnectWallet;