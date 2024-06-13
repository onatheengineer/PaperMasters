import {
  Box,
  Button,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import React from 'react';
import { MdManageAccounts } from 'react-icons/md';
import { Link as ReachLink } from 'react-router-dom';
import Sparkle from 'react-sparkle';
import { put } from 'redux-saga/effects';
import {
  chainId,
  configureChains,
  createClient,
  defaultChains,
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  WagmiConfig,
} from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  accountArrMetaMaskAction,
  accountArrStatus,
  chainIdStatus,
} from '../../../features/accountBC/AccountBCSlice';
import { showToast } from '../../../features/toast/ToastSlice';

const alchemyId = 'mEUzvPVY6xECwMieu01t9D3fuYyOYGCl';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

export const ConnectWallet = () => {
  console.log('am I getting in here');

  console.log('client.conectors:', client.connectors);
  console.log('am I getting in here');

  const dispatch = useAppDispatch();
  const chainIdProviderProvider = useAppSelector(
    (state) => state.accountBC.chainIdProvider,
  );
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);
  return (
    <Stack
      flex={{ base: 1, lg: 'none' }}
      justify={'flex-end'}
      direction={'row'}
      spacing={6}
      // border={'1px solid green'}
    >
      {/* this box in necessary for sparkle to work correctly */}
      <Box>
        {accountArrArr.length === 0 ? (
          <Box
            style={{ position: 'relative' }}
            // border={'1px solid red'}
          >
            <Menu>
              <MenuButton
                as={Button}
                fontSize={'md'}
                fontWeight={400}
                role={'connectWallet'}
                display={{ base: 'inline-flex', md: 'inline-flex' }}
                // bg={'pmpurple.2'}
                // href={'#'}
                _hover={{
                  bg: 'pmpurple.2',
                }}
                // onClick={() => {
                //   dispatch(accountArrMetaMaskAction());
                // }}
              >
                <Text>Connect Wallet</Text>
              </MenuButton>
              <Sparkle
                color="#694b69"
                count={15}
                minSize={5}
                maxSize={10}
                overflowPx={0}
                fadeOutSpeed={20}
                flicker={false}
                // newSparkleOnFadeOut={false}
                // flickerSpeed="fast"
              />
              <MenuList>
                <MenuItem
                  onClick={() => {
                    dispatch(accountArrMetaMaskAction());
                  }}
                >
                  Injected
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(accountArrMetaMaskAction());
                  }}
                >
                  Coinbase
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(accountArrMetaMaskAction());
                  }}
                >
                  GameStop
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(accountArrMetaMaskAction());
                  }}
                >
                  MetaMask
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(accountArrMetaMaskAction());
                  }}
                >
                  WalletConnect
                </MenuItem>
                <Sparkle
                  color="#694b69"
                  count={15}
                  minSize={5}
                  maxSize={10}
                  overflowPx={0}
                  fadeOutSpeed={20}
                  flicker={false}
                  // newSparkleOnFadeOut={false}
                  // flickerSpeed="fast"
                />
              </MenuList>
            </Menu>
          </Box>
        ) : (
          <Box
            display={{ base: 'inline-flex', md: 'inline-flex' }}
            fontSize={'md'}
            fontWeight={400}
            color={'pmpurple.8'}
            // href={'#'}
            //         _hover={{
            //             bg: 'pmpurple.3',
            // }}
          >
            <HStack>
              {/* <SiSololearn fontSize={'16px'}/> */}
              <Text>Connected</Text>
            </HStack>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

// const dispatch = useAppDispatch();
// const { connect, connectors, error, isConnecting, pendingConnector } =
//   useConnect();
// const { disconnect } = useDisconnect();
// const { data: account, data, isError, isLoading, isSuccess } = useAccount();
// const { data: ensName } = useEnsName({ address: account?.address });
//
// if (isLoading) {
//   dispatch(accountArrStatus('loading'));
//   dispatch(chainIdStatus('loading'));
// }
// if (isError) {
//   dispatch(accountArrStatus('failed'));
//   dispatch(chainIdStatus('failed'));
//   put(
//     showToast({
//       title: 'Disable all wallet plugin except the one you want to use',
//       status: 'error',
//     }),
//   );
// }
// const dataConnector = data?.connector;
// if (data?.account && data?.account !== undefined) {
//   //connect.chainId();
//   const chainIdDecimal: number = parseInt(chains, 16);
//   console.log('chainIdDecimal', chainIdDecimal);
//
//   console.log(`Connected to: {ensName ?? account.address}`);
//   // TODO: remember, ethersjs doesn't follow ASCII !!!
//   const accArrChecksum: string[] = [ethers.utils.getAddress(account[0])];
//   console.log('accArrChecksum', accArrChecksum);
// }
// return (
//   <Box>
//     {connectors.map((connector) => (
//       <Button
//         disabled={!connector.ready}
//         key={connector.id}
//         onClick={() => {
//           data?.connector ? connect(connector) : disconnect;
//         }}
//       >
//         {connector.name}
//         {!connector.ready && ' (unsupported)'}
//         {isConnecting &&
//           connector.id === pendingConnector?.id &&
//           ' (connecting)'}
//       </Button>
//     ))}
//
//     {error && <Box>{error.message}</Box>}
//   </Box>

export default ConnectWallet;
