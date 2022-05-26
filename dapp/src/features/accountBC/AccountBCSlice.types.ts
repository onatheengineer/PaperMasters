//this is coming from the BC
export interface BCStruct {
  chainId: string;
  walletAccount: string;
  name: string;
  email: string;
  profession: string;
  organization: string;
  slogan: string;
  website: string;
  uniqueYou: string;
  bgRGB: string;
  originDate: string;
}

export interface WalletConnectMetaMaskInterface {
  chainId: string;
  walletAccount: string[];
}
