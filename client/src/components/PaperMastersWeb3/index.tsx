import Web3 from "web3";
import MintIdentity from "../../contracts/MintIdentity.json";

export const getWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    return web3;
}

export const getContract = () => {
    const web3 = getWeb3();
    if (web3) {
        const contract = new web3.eth.Contract(MintIdentity.abi as any, MintIdentity.networks['5777'].address);
        return contract;
    }
}
