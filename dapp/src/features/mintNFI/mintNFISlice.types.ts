// this is sending to the BC from my register page
export interface MintingNFIStruct {
  name: string;
  email: string;
  profession: string;
  organization: string;
  slogan: string;
  website: string;
  uniqueYou: string;
  bgRGB: string;
}

export interface MintNFI {
  accBalance: number;
  accBalanceErr: string;
  mintSucceeded:
    | 'idle'
    | 'loading'
    | 'succeeded'
    | 'failed'
    | 'alreadyMinted'
    | undefined;
  mintErr: string;
  mintStatusBC: boolean;
  gasPrice: number;
  mintingFee: number;
}
