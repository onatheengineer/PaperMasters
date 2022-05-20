//import ethers from "ethers";
import MintABI from "../abiFiles/PaperMastersNFI.json"
import chainIdNetworks from "../features/JSON/chainId.networks.json";
import {BCStruct} from "../features/reactQuery/RTKQuery";
import {BigNumber} from "ethers";

const ethers = require('ethers');

describe("ContractTesting", () => {
    test('One Supported Blockhain', () => {
        const results = Object.keys(MintABI.networks).map(async (chainId) => {
            const chainIdSupportedArr = chainIdNetworks.filter((el) => {
                return el.chainId === parseInt(chainId)
            });
            expect(chainIdSupportedArr.length).toBe(1);


        });



    });
    test('Network Supported', () => {
        const results = Object.keys(MintABI.networks).map(async (chainId) => {
            const chainIdSupportedArr = chainIdNetworks.filter((el) => {
                return el.chainId === parseInt(chainId)
            });
            const network = chainIdSupportedArr[0].name.toLowerCase();
            expect(network).toBeDefined();
        });
    });

    test('Provider ChainId Matched', () => {
        const results = Object.keys(MintABI.networks).map(async (chainId) => {
            const chainIdSupportedArr = chainIdNetworks.filter((el) => {
                return el.chainId === parseInt(chainId)
            });
            const network = chainIdSupportedArr[0].name.toLowerCase();
            const provider = ethers.getDefaultProvider(network, {
                etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
                infura: 'c97ad56e08674161a95ba16c6f855b6a',
                alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
                pocket: '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609'
            });
            return provider.getNetwork().then((ntw: any) => expect(`${ntw.chainId}`).toEqual(chainId))
        });
    });


    test('Contract Total Supply > 0', () => {
        const results = Object.keys(MintABI.networks).map(async (chainId) => {
            const chainIdSupportedArr = chainIdNetworks.filter((el) => {
                return el.chainId === parseInt(chainId)
            });
            const network = chainIdSupportedArr[0].name.toLowerCase();
            const provider = ethers.getDefaultProvider(network, {
                etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
                infura: 'c97ad56e08674161a95ba16c6f855b6a',
                alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
                pocket: '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609'
            });
            const ntw  = MintABI.networks as {[cid: string]: { address:string }};
            const NFIContract = new ethers.Contract(ntw[chainId].address, MintABI.abi, provider);
            NFIContract.totalSupply().then((supply: BigNumber) => { expect(supply.toNumber()).toBeGreaterThan(0)});
        });
    });

    test('Identity 0 Defined', () => {
        const results = Object.keys(MintABI.networks).map(async (chainId) => {
            const chainIdSupportedArr = chainIdNetworks.filter((el) => {
                return el.chainId === parseInt(chainId)
            });
            const network = chainIdSupportedArr[0].name.toLowerCase();
            const provider = ethers.getDefaultProvider(network, {
                etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
                infura: 'c97ad56e08674161a95ba16c6f855b6a',
                alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
                pocket: '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609'
            });
            const ntw  = MintABI.networks as {[cid: string]: { address:string }};
            const NFIContract = new ethers.Contract(ntw[chainId].address, MintABI.abi, provider);
            NFIContract.tokenIDtoIdentityStruct(0).then((identity: any) => {  expect(identity.walletAccount).toBeDefined()});
        });
    });

});