import {
    selectAccounts,
    setAccounts,
    setIdentities, setNumberIdentities,
    setSelectedAccount,
    setTotalSupply,
    setWeb3Busy,
    setWeb3Contract,
    setWeb3ContractAddress,
    setWeb3Error,

    setWeb3ErrorMessage
} from "./index";
import {getContract, getWeb3} from "../../../components/PaperMastersWeb3"
import {Dispatch} from "react";
import Web3 from "web3";
import MintIdentity from "../../../contracts/MintIdentity.json";
import {useSelector} from "react-redux";



// Async method to retrieve the metamask connect accounts, it will prompt for an account if one is not selected;
// If the user rejects the request an error is given (4001)
export const asyncGetConnectedAccounts = () => (dispatch: Dispatch<any>) => {
    const web3 = getWeb3();
    if (web3) {
        web3.eth.requestAccounts().then((acc) => {
            // Account successfully linked in metamask or accounts already linked;
            const accountIdents: any = {};
            const accountPromises = [];
            dispatch(setAccounts(acc));
            dispatch(asyncGetTotalSupply())
            const contract = getContract();
            if (contract !== undefined) {
                acc.map((account) => {
                    contract.methods.balanceOf(account).call().then((values: any) => {
                        const identityPromises: any[] = [];
                        for (let i = 0; i < values; i++) {
                            console.log("PUSH ", i)
                            identityPromises.push(contract.methods.getTokenIdentity(i).call());
                        }

                        Promise.all(identityPromises).then((identities) => {
                            accountIdents[account] = identities;
                            dispatch(setIdentities(accountIdents));
                        })
                    });
                })
            }

        }, (error) => {
            // Meta Mask Error, or User rejects the request
            dispatch(setWeb3Error(true));
            try {
                // If there is a message that web3 has given us lets capture it
                if (error.hasOwnProperty("message")) {
                    dispatch(setWeb3ErrorMessage(error.message));
                } else {
                    dispatch(setWeb3ErrorMessage("Unknown Error"));
                }
            } catch {
                dispatch(setWeb3ErrorMessage("Failed to Retrieve Error Message"));
            }

        });
    } else {
        console.log("NO WEB3")
    }
    return false;
};

// Async method to getTotal Supply (Number of Minted Identites) from Contract
export const asyncGetTotalSupply = () => (dispatch: Dispatch<any>) => {
    const contract = getContract();
    if (contract) {
        contract.methods.totalSupply().call().then((ts: any) => {
            dispatch(setTotalSupply(ts));
        }, (error: any) => {
            // Meta Mask Error, or User rejects the request
            dispatch(setWeb3Error(true));
            try {
                // If there is a message that web3 has given us lets capture it
                if (error.hasOwnProperty("message")) {
                    dispatch(setWeb3ErrorMessage(error.message));
                } else {
                    dispatch(setWeb3ErrorMessage("Unknown Error"));
                }
            } catch {
                dispatch(setWeb3ErrorMessage("Failed to Retrieve Error Message"));
            }

        });
    } else {
        console.log("NO WEB3")
    }
    return false;
};




