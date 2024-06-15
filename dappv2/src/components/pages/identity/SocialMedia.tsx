import { Box, HStack, Input } from '@chakra-ui/react';
import type { FC, ReactElement } from 'react';
import * as React from 'react';

import { SocialButton } from '../home/Footers/Footer';

interface socialMediaInterface {
  placeholder: string;
  valuevalue: string | undefined;
  type: string;
  role: string;
  icon: ReactElement;
  onChangeSocial: ({
    type,
    payload,
  }: {
    type: string;
    payload: string;
  }) => void;
}

export const SocialMediaComponent: FC<socialMediaInterface> = ({
  placeholder,
  valuevalue,
  type,
  role,
  onChangeSocial,
  icon,
}) => {
  // const [postAccount, data] = usePostAccountDictionaryMutation();
  const [socialName, setSocialName] = React.useState<string | undefined>(
    valuevalue,
  );
  return (
    <Box
      // border={'1px solid'}
      // borderColor={'pmpurple.13'}
      position={'relative'}
      p={'0px'}
      m={2}
      flexGrow={1}
    >
      <HStack>
        <SocialButton label={type} href={'#'}>
          <a href={socialName as string} target={'_blank'}>
            {icon}
          </a>
        </SocialButton>

        <Input
          focusBorderColor="pmpurple.9"
          border={'1px solid'}
          borderColor={'pmpurple.8'}
          bg={'pmpurple.2'}
          color="pmpurple.15"
          value={socialName}
          role={role}
          placeholder={placeholder}
          onChange={(e: any) => {
            setSocialName(e.currentTarget.value);
            onChangeSocial({
              type,
              payload: e.currentTarget.value,
            });
          }}
        />
      </HStack>
    </Box>
  );
};

// export const SocialMedia: FC = () => {
//   // const postSocialMediaDB = usePostAccountDictionaryMutation();
//   const [
//     updatePost, // This is the mutation trigger
//     { isLoading: isUpdating }, // This is the destructured mutation result
//   ] = usePostAccountDictionaryMutation();
//   return (
//     <Box
//       // border={'1px solid'}
//       // borderColor={'pmpurple.6'}
//       p={'0px'}
//       alignItems={'center'}
//       textAlign={'center'}
//       position={'relative'}
//       m={'0px'}
//     >
//       <HStack spacing={4} alignItems={'center'}>
//         <Stack direction="row" spacing={2}>
//           <Link as={ReachLink} to={data.twitter}>
//             <Icon as={FaTwitter} />
//           </Link>
//           <Link
//             as={ReachLink}
//             to={usePostAccountDictionaryMutation.data.twitter}
//           >
//             <Icon as={FaLinkedin} />
//           </Link>
//           <Link
//             as={ReachLink}
//             to={usePostAccountDictionaryMutation.data.twitter}
//           >
//             <Icon as={FaYoutube} />
//           </Link>
//           <Link
//             as={ReachLink}
//             to={usePostAccountDictionaryMutation.data.twitter}
//           >
//             <Icon as={FaInstagram} />
//           </Link>
//           <Link
//             as={ReachLink}
//             to={usePostAccountDictionaryMutation.data.twitter}
//           >
//             <Icon as={FaTwitch} />
//           </Link>
//           <Link
//             as={ReachLink}
//             to={usePostAccountDictionaryMutation.data.twitter}
//           >
//             <Icon as={FaFacebook} />
//           </Link>
//           <Link
//             as={ReachLink}
//             to={usePostAccountDictionaryMutation.data.twitter}
//           >
//             <Icon as={FaReddit} />
//           </Link>
//           <Link
//             as={ReachLink}
//             to={usePostAccountDictionaryMutation.data.twitter}
//           >
//             <Icon as={FaGithub} />
//           </Link>
//           <Link
//             as={ReachLink}
//             to={usePostAccountDictionaryMutation.data.twitter}
//           >
//             <Icon as={openseaIcon} />
//           </Link>
//           <Link
//             as={ReachLink}
//             to={usePostAccountDictionaryMutation.data.twitter}
//           >
//             <Icon as={MdOutlinePeopleOutline} />
//           </Link>
//           <Link
//             as={ReachLink}
//             to={usePostAccountDictionaryMutation.data.twitter}
//           >
//             <Icon as={MdOutlinePeopleOutline} />
//           </Link>
//         </Stack>
//       </HStack>
//     </Box>
//   );
// };

// export default SocialMedia;
