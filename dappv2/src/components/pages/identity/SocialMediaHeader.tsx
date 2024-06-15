import React, { FC, ReactElement } from 'react';

import { useGetSingleAccountQuery } from '../../../features/reactQuery/RTKQuery';
import { SocialButton } from '../home/Footers/Footer';

interface SocialMediaHeaderInterface {
  label:
    | 'linkedin'
    | 'twitter'
    | 'github'
    | 'reddit'
    | 'discord'
    | 'youtube'
    | 'instagram'
    | 'twitch'
    | 'facebook'
    | 'opensea'
    | 'socialButtonGeneric1'
    | 'socialButtonGeneric2';
  icon: ReactElement;
  chainIdURL: string;
  paramsWalletURL: string;
}

export const SocialMediaHeader: FC<SocialMediaHeaderInterface> = ({
  label,
  icon,
  chainIdURL,
  paramsWalletURL,
}) => {
  const useGetSingleAccountQueryQuery = useGetSingleAccountQuery({
    chainIdURL,
    paramsWalletURL,
  });
  return (
    <>
      {useGetSingleAccountQueryQuery.data !== undefined &&
        useGetSingleAccountQueryQuery.data.Item !== undefined &&
        useGetSingleAccountQueryQuery.data.Item.socialMediaLinks !==
          undefined &&
        (useGetSingleAccountQueryQuery.data.Item.socialMediaLinks[
          label
        ] as string) !== '' && (
          <SocialButton label={label} href={'#'}>
            <a
              href={
                useGetSingleAccountQueryQuery.data.Item.socialMediaLinks[label]
              }
              target={'_blank'}
            >
              {icon}
            </a>
          </SocialButton>
        )}
    </>
  );
};

export default SocialMediaHeader;
