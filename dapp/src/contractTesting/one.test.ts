//import ethers from "ethers";
import MintABI from '../abiFiles/PaperMastersNFI.json';
import chainIdNetworks from '../features/JSON/chainId.networks.json';
import { BCStruct } from '../features/reactQuery/RTKQuery';
import { BigNumber } from 'ethers';

const ethers = require('ethers');

describe('ContractTesting', () => {
  test('One Supported Blockhain', () => {
    expect.assertions(Object.keys(MintABI.networks).length);
    const results = Object.keys(MintABI.networks).map(async (chainId) => {
      const chainIdSupportedArr = chainIdNetworks.filter((el) => {
        return el.chainId === parseInt(chainId);
      });
      return expect(chainIdSupportedArr.length).toBe(1);
    });
  });
  test('Network Supported', async () => {
    expect.assertions(Object.keys(MintABI.networks).length);
    const results = await Promise.all(
      Object.keys(MintABI.networks).map(async (chainId) => {
        const chainIdSupportedArr = chainIdNetworks.filter((el) => {
          return el.chainId === parseInt(chainId);
        });
        const network = chainIdSupportedArr[0].name.toLowerCase();
        return expect(network).toBeDefined();
      }),
    );
  });

  test('Provider ChainId Matched', async () => {
    expect.assertions(Object.keys(MintABI.networks).length);
    const results = await Promise.all(
      Object.keys(MintABI.networks).map(async (chainId) => {
        const chainIdSupportedArr = chainIdNetworks.filter((el) => {
          return el.chainId === parseInt(chainId);
        });
        const network = chainIdSupportedArr[0].name.toLowerCase();
        const provider = ethers.getDefaultProvider(network, {
          etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
          infura: 'c97ad56e08674161a95ba16c6f855b6a',
          alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
          pocket:
            '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609',
        });
        return provider
          .getNetwork()
          .then((ntw: any) => expect(`${ntw.chainId}`).toEqual(chainId));
      }),
    );
  });

  test('Contract Total Supply > 0', async () => {
    expect.assertions(Object.keys(MintABI.networks).length);
    const results = await Promise.all(
      Object.keys(MintABI.networks).map(async (chainId) => {
        const chainIdSupportedArr = chainIdNetworks.filter((el) => {
          return el.chainId === parseInt(chainId);
        });
        const network = chainIdSupportedArr[0].name.toLowerCase();
        const provider = ethers.getDefaultProvider(network, {
          etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
          infura: 'c97ad56e08674161a95ba16c6f855b6a',
          alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
          pocket:
            '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609',
        });
        const ntw = MintABI.networks as { [cid: string]: { address: string } };
        const NFIContract = new ethers.Contract(
          ntw[chainId].address,
          MintABI.abi,
          provider,
        );
        return await NFIContract.totalSupply().then((supply: BigNumber) => {
          return expect(supply.toNumber()).toBeGreaterThan(0);
        });
      }),
    );
  });

  test('Identity 0 Defined', async () => {
    expect.assertions(Object.keys(MintABI.networks).length);

    const results = await Promise.all(
      Object.keys(MintABI.networks).map(async (chainId) => {
        const chainIdSupportedArr = chainIdNetworks.filter((el) => {
          return el.chainId === parseInt(chainId);
        });
        const network = chainIdSupportedArr[0].name.toLowerCase();
        const provider = ethers.getDefaultProvider(network, {
          etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
          infura: 'c97ad56e08674161a95ba16c6f855b6a',
          alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
          pocket:
            '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609',
        });
        const ntw = MintABI.networks as { [cid: string]: { address: string } };
        const NFIContract = new ethers.Contract(
          ntw[chainId].address,
          MintABI.abi,
          provider,
        );
        return await NFIContract.tokenIDtoIdentityStruct(0).then(
          (identity: any) => {
            return expect(identity.walletAccount).toBeDefined();
          },
        );
      }),
    );
  });

  test('Identity Fee 0.1 Eth', async () => {
    expect.assertions(Object.keys(MintABI.networks).length);
    const result = await Promise.all(
      Object.keys(MintABI.networks).map(async (chainId) => {
        const chainIdSupportedArr = chainIdNetworks.filter((el) => {
          return el.chainId === parseInt(chainId);
        });
        const network = chainIdSupportedArr[0].name.toLowerCase();
        const provider = ethers.getDefaultProvider(network, {
          etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',
          infura: 'c97ad56e08674161a95ba16c6f855b6a',
          alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
          pocket:
            '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609',
        });
        const ntw = MintABI.networks as { [cid: string]: { address: string } };
        const NFIContract = new ethers.Contract(
          ntw[chainId].address,
          MintABI.abi,
          provider,
        );
        return await NFIContract.getIdentityFee().then((fee: BigNumber) => {
          return expect(fee.toHexString()).toEqual('0x016345785d8a0000');
        });
      }),
    );
  });
});
