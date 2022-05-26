const { ethers } = require('ethers');

(async () => {
  try {
    const network = 'homestead';

    const provider = await ethers.getDefaultProvider(network, {
      //Etherscan homestead, ropsten, rinkeby, goerli and kovan
      //provider = new EtherscanProvider(null, 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q');
      //provider = new EtherscanProvider("homestead", apiKey);
      etherscan: 'RYVBB5ZI138MHIX2JJVWBT6MVTGXJT133Q',

      //Infura homestead, ropsten, rinkeby, goerli, kovan, matic, maticmum, optimism, optimism-kovan, arbitrum and arbitrum-rinkeby.
      //endpoints:
      // 'https://mainnet.infura.io/v3/c97ad56e08674161a95ba16c6f855b6a'
      infura: {
        projectId: 'c97ad56e08674161a95ba16c6f855b6a',
        projectSecret: 'b3dd75968bba439d80769d163ce14fc9',
      },

      //Alchemy homestead, ropsten, rinkeby, goerli, kovan, matic, maticmum, optimism, optimism-kovan, arbitrum and arbitrum-rinkeby.
      alchemy: 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl',
      //endpoints:
      // 'https://eth-mainnet.alchemyapi.io/v2/mEUzvPVY6xECwMieu01t9D3fuYyOYGCl'

      //pochet gateway homestead
      // https://eth-mainnet.gateway.pokt.network/v1/lb/6241ead37fec60003a0bd795
      pocket: {
        applicationId:
          '329ee9f55d37f7ef7a54f84a4df341d096004450263af1d40cc4650e47e26609',
        applicationSecretKey: 'efdef876fc22bbd3068e3ba4066f3bd5',
      },

      //ankr homestead, matic and arbitrum
      //ankr: YOUR_ANKR_API_KEY
      // https://rpc.ankr.com/eth
      //https://rpc.ankr.com/avalanche
    });

    const accBalance = await provider.getBalance(
      '0x197A701b9f1d41d29EeB0684FaA593f8FDa3673a',
    );
    console.log(accBalance);
    //await provider.getTransactionCount("0x7C097941487f53bBdd39fddea7Bed9AEf3312ED5.eth");
  } catch (error) {
    console.log(error);
  }
})();
