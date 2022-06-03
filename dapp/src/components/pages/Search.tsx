import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from '@chakra-ui/react';
import type { FC } from 'react';
import * as React from 'react';
import {
  ChangeEventHandler,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import { Column, usePagination, useSortBy, useTable } from 'react-table';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PMsvgIcon } from '../../assets/icons/PMSvgIcon';
import { allStructBCAction } from '../../features/accountBC/AccountBCSlice';
import { BCStruct } from '../../features/accountBC/AccountBCSlice.types';
import {
  allAccountDictionaryDBAction,
  allNFIReceiptDBAction,
} from '../../features/accountDB/AccountDBSlice';
// eslint-disable-next-line import/extensions
import chainIdNetworkJSON from '../../features/JSON/chainId.networks.json';
import {
  useGetAllAccountQuery,
  useGetIdentityBCQuery,
} from '../../features/reactQuery/RTKQuery';
import { showToast } from '../../features/toast/ToastSlice';

interface interfaceFilterComponent {
  filterText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onFilter: ChangeEventHandler<HTMLInputElement>;
  text: string;
  placeHolder: string;
  idType: string;
  activateButton: boolean;
}

const FilterComponent: FC<interfaceFilterComponent> = ({
  filterText,
  onClick,
  onFilter,
  text,
  placeHolder,
  idType,
  activateButton,
}) => (
  <Box>
    <HStack>
      <InputGroup>
        <Input
          focusBorderColor="pmpurple.8"
          color={'pmpurple.13'}
          border={'1px solid'}
          borderColor={'pmpurple.6'}
          id={idType}
          type="text"
          fontSize={14}
          placeholder={placeHolder}
          aria-label="Search Input"
          value={filterText}
          onChange={onFilter}
          borderRadius={'5px'}
        />
        <InputRightAddon
          p={0}
          bg={'pmpurple.2'}
          children={
            <Button
              bg={'pmpurple.6'}
              borderRightRadius={'5px'}
              borderLeftRadius={0}
              color={'pmpurple.13'}
              onClick={onClick}
              fontSize={14}
            >
              {text}
            </Button>
          }
        />
      </InputGroup>
    </HStack>
  </Box>
);

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [filterWallets, setFilterWallets] = useState<string>('');
  // const [searchWalletAccount, setWalletAccount] = useState<string>('');
  const [resetPaginationToggle, setResetPaginationToggle] =
    useState<boolean>(false);
  const [isIdentityModalOpen, setIdentityModalOpen] = useState<boolean>(false);
  const initialRef = useRef<HTMLInputElement>(null);
  const initialRefChain = useRef<HTMLInputElement>(null);
  const [typedText, setTypedText] = useState<string>('');
  const [typedTextChainId, setTypedTextChainId] = useState<string>('');
  const accountArrArr = useAppSelector((state) => state.accountBC.accountArr);

  useEffect(() => {
    dispatch(allAccountDictionaryDBAction());
    dispatch(allNFIReceiptDBAction());
    dispatch(allStructBCAction());
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState<BCStruct[]>([]);
  const accountQuery = useGetAllAccountQuery();
  const nfiQuery = useGetIdentityBCQuery();

  type Cols = {
    shortName: string;
    chainId: string;
    creation: number | null;
    wallet: string;
    name: string | undefined;
    origin: string | undefined;
    profession: string | undefined;
  };

  const data = useMemo((): Cols[] => {
    console.log(accountQuery);
    console.log('nfiQuery', nfiQuery);
    if (!accountQuery.isSuccess) return [];
    const predata = accountQuery.data.Items.map((el) => {
      console.log('el', el);
      let name = 'non-registered account';
      let originDate = '';
      let profession = '';
      if (nfiQuery.isSuccess) {
        const nfiArr = nfiQuery.data.filter((elel) => {
          return (
            elel.chainId.toString() === el.chainId &&
            elel.walletAccount === el.walletAccount
          );
        });
        console.log('nfiArr', nfiArr);
        if (nfiArr.length > 0) {
          const nameName = nfiArr[0].name.split('|||')[0];
          name = nameName;
          originDate = nfiArr[0].originDate.toString();
          [profession] = nfiArr[0].profession.split('|||');
          if (el.ownerName && el.ownerName.length > 0) {
            name = el.ownerName as string;
          }
        }
      }
      const chainArr = chainIdNetworkJSON.filter((chainN: any) => {
        return chainN.chainId.toString() === el.chainId;
      });
      const chainName =
        chainArr.length > 0 ? chainArr[0].shortName : el.chainId;
      return {
        shortName: chainName,
        chainId: el.chainId,
        creation: el.createDate,
        wallet: el.walletAccount,
        name,
        origin: originDate,
        profession,
      };
    });
    console.log(filterWallets);
    if (filterWallets.length === 0) {
      return predata;
    }
    const predatapredata = predata.filter((item) => {
      if (filterWallets.length !== 0) {
        if (
          item.name &&
          item.name.toLowerCase().includes(filterWallets.toLowerCase())
        ) {
          return true;
        }
        if (
          item.profession &&
          item.profession.toLowerCase().includes(filterWallets.toLowerCase())
        ) {
          return true;
        }
        if (
          item.origin &&
          item.origin.toLowerCase().includes(filterWallets.toLowerCase())
        ) {
          return true;
        }
        if (
          item.wallet &&
          item.wallet.toLowerCase().includes(filterWallets.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
    return predatapredata;
  }, [accountQuery, nfiQuery, filterWallets]);

  const columns: Column<Cols>[] = useMemo(
    () => [
      {
        Header: (
          <Center>
            {' '}
            <Text style={{ whiteSpace: 'nowrap' }}> Chain </Text>{' '}
          </Center>
        ),
        accessor: 'shortName',
        Cell: (el) => (
          <Center>
            <Text fontSize={'12px'}>
              {' '}
              {el.row.original.shortName.toUpperCase()}{' '}
            </Text>
          </Center>
        ),
      },
      {
        Header: (
          <Center>
            <Text style={{ whiteSpace: 'nowrap' }}> Origin Date </Text>
          </Center>
        ),
        accessor: 'creation',
        Cell: (el) => {
          if (el.row.original.creation !== null) {
            const creationDateObject = new Date(el.row.original.creation);
            const creationDateFormatted = `${creationDateObject.toLocaleString(
              'en-us',
              { month: 'long' },
            )} ${creationDateObject.getDate()}, ${creationDateObject.getFullYear()}`;
            const originD = el.row.original.origin;
            console.log('originD', originD);
            if (originD === null || originD === undefined || originD === '') {
              return (
                <Center>
                  <Text fontSize={'12px'} style={{ whiteSpace: 'nowrap' }}>
                    {' '}
                    {creationDateFormatted}{' '}
                  </Text>
                </Center>
              );
            }
            const originDateObject = new Date(parseInt(originD!, 10) * 1000);
            const originDateFormatted = `${originDateObject.toLocaleString(
              'en-us',
              { month: 'long' },
            )} ${originDateObject.getDate()}, ${originDateObject.getFullYear()}`;
            return (
              <>
                <Center>
                  <VStack>
                    <Tooltip
                      // hasArrow
                      label={originDateFormatted}
                      placement={'bottom-end'}
                      border={'1px solid #694b69'}
                      borderRadius={'3px'}
                      bg="pmpurple.5"
                      color="pmpurple.13"
                      m={'-6px'}
                      aria-label="A tooltip"
                      bgColor={'white'}
                      fontSize={'12px'}
                    >
                      <span>
                        <PMsvgIcon width="28" height="28" viewBox="0 0 28 28" />
                      </span>
                    </Tooltip>
                    <Text fontSize={'12px'} style={{ whiteSpace: 'nowrap' }}>
                      {' '}
                      {creationDateFormatted}
                    </Text>
                  </VStack>
                </Center>
              </>
            );
          }
          return null;
        },
      },
      {
        Header: (
          <Center>
            {' '}
            <Text style={{ whiteSpace: 'nowrap' }}> Wallet Account </Text>
          </Center>
        ),
        accessor: 'wallet',
        Cell: (el) => {
          return (
            <>
              <Center>
                <Text fontSize={'12px'} style={{ whiteSpace: 'nowrap' }}>
                  {' '}
                  {el.row.original.name}
                </Text>
              </Center>
              <Popover trigger={'hover'}>
                <PopoverTrigger>
                  <Center>
                    <Button
                      as={ReachLink}
                      to={`/identity/${el.row.original.chainId}/${el.row.original.wallet}`}
                      bg={'#f2eef2'}
                      color={'pmpurple.13'}
                      width={'130px'}
                      height={'24px'}
                      overflow={'hidden !important'}
                      textAlign={'left'}
                      borderRadius={'5px'}
                      textOverflow={'ellipsis'}
                    >
                      <Center>
                        <Text
                          whiteSpace="nowrap"
                          overflow={'hidden !important'}
                          textOverflow={'ellipsis'}
                          fontSize={'12px'}
                          width={'118px'}
                        >
                          {el.row.original.wallet}
                        </Text>
                      </Center>
                    </Button>
                  </Center>
                </PopoverTrigger>
                <PopoverContent
                  whiteSpace="nowrap"
                  width={'400px'}
                  border={'1px solid #694b69'}
                  // borderRadius={'3px'}
                  color="pmpurple.13"
                  pl={'1px'}
                  overflow={'hidden !important'}
                  textAlign={'center'}
                >
                  <PopoverBody
                    whiteSpace="nowrap"
                    width={'140px'}
                    textAlign={'center'}
                  >
                    {el.row.original.wallet}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </>
          );
        },
      },
      {
        Header: (
          <Center>
            <Text style={{ whiteSpace: 'nowrap' }}> Profession </Text>
          </Center>
        ),
        accessor: 'profession',
        Cell: ({ value }) => (
          <Center>
            <Text fontSize={'12px'} style={{ whiteSpace: 'nowrap' }}>
              {' '}
              {value}{' '}
            </Text>
          </Center>
        ),
      },
    ],
    [],
  );
  const handleClear = () => {
    if (filterWallets) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterWallets('');
    }
  };
  const addWalletAccountHandler = () => {
    setIdentityModalOpen(true);
  };
  const inputTextHandler = (e: FormEvent<HTMLInputElement>) => {
    setTypedText(e.currentTarget.value);
  };
  const inputTextChainIdHandler = (e: FormEvent<HTMLInputElement>) => {
    setTypedTextChainId(e.currentTarget.value);
  };
  const navToProfilePageHandler = () => {
    if (accountArrArr.length === 0) {
      dispatch(
        showToast({
          title:
            'You need to connect your own account before you can add ' +
            'someone elses wallet account',
          status: 'error',
        }),
      );
    } else {
      navigate(
        `/identity/${initialRefChain.current?.value}/${initialRef.current?.value}`,
      );
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy, usePagination);

  if (!accountQuery.data) return <div />;
  if (accountQuery.isLoading) return <Heading>isLoading...</Heading>;
  if (accountQuery.isError)
    return (
      <Heading>
        Nooo...something went wrong!<Text>{accountQuery.error.toString()}</Text>
      </Heading>
    );
  return (
    <Flex
      justifyContent="center"
      flex={{ base: 1, md: 'auto' }}
      // flex={'auto'}
      w={'100%'}
      // border={'1px solid red'}
      m={5}
      bg={'pmpurple.1'}
      border={'3px solid'}
      borderColor={'pmpurple.13'}
      borderRadius={'6px'}
    >
      <Stack
        spacing={0}
        w={'100%'}
        // border={'1px solid red'}
      >
        <Box p={4} mt={3}>
          <Center>
            <Text fontSize={22} color={'pmpurple.13'} fontWeight={'bold'}>
              Wallet Account Search Table
            </Text>
          </Center>
        </Box>

        <Box justifyItems={'end'} justifyContent={'right'} py={4}>
          <Box>
            <HStack justifyContent={'end'} mr={6}>
              <FilterComponent
                onFilter={(e: any) => setFilterWallets(e.target.value)}
                onClick={handleClear}
                activateButton={data.length !== 0}
                filterText={filterWallets}
                text={'reset'}
                placeHolder={'Search Wallet Account'}
                idType={'Search'}
              />
              <Button
                bg={'pmpruple.2'}
                border={'1px solid'}
                borderColor={'pmpurple.5'}
                onClick={addWalletAccountHandler}
              >
                <Text fontSize={12} textColor={'pmpurple.13'}>
                  Add Wallet Account
                </Text>
              </Button>
            </HStack>
            <Box>
              <Modal
                initialFocusRef={initialRef}
                isOpen={isIdentityModalOpen}
                onClose={() => {
                  setIdentityModalOpen(false);
                }}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader textColor={'pmpurple.13'}>
                    Create a profile for a Non-Registered
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={4}>
                    <FormControl mt={4}>
                      <FormLabel textColor={'pmpurple.13'}>Chain Id</FormLabel>
                      <Input
                        onChange={inputTextChainIdHandler}
                        focusBorderColor="pmpurple.6"
                        border={'1px solid'}
                        borderColor={'pmpurple.8'}
                        ref={initialRefChain}
                        placeholder="chain Id"
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel textColor={'pmpurple.13'}>
                        Enter Wallet Account
                      </FormLabel>
                      <Input
                        onChange={inputTextHandler}
                        focusBorderColor="pmpurple.6"
                        border={'1px solid'}
                        borderColor={'pmpurple.8'}
                        ref={initialRef}
                        placeholder="Must be greater than 26 characters"
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      bg={'pmpurple.8'}
                      disabled={
                        typedText.length <= 26 || typedTextChainId.length < 1
                      }
                      border={'1px solid'}
                      borderColor={'pmpurple.13'}
                      color={'pmpurple.1'}
                      mr={3}
                      onClick={navToProfilePageHandler}
                    >
                      Create
                    </Button>
                    <Button
                      bg={'pmpurple.2'}
                      border={'1px solid'}
                      borderColor={'pmpurple.4'}
                      color={'pmpurple.13'}
                      mr={3}
                      onClick={() => {
                        setIdentityModalOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Box>
        </Box>

        <Box
          // border={'1px solid red'}
          h={'100%'}
        >
          <Table {...getTableProps()}>
            <Thead position={'sticky'}>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps()}
                      // isNumeric={column.isNumeric}
                    >
                      {column.render('Header')}
                      {/* <span pl='4'> */}
                      {/*    {column.isSorted ? ( */}
                      {/*        column.isSortedDesc ? ( */}
                      {/*            <TriangleDownIcon aria-label='sorted descending' /> */}
                      {/*        ) : ( */}
                      {/*            <TriangleUpIcon aria-label='sorted ascending' /> */}
                      {/*        ) */}
                      {/*    ) : null} */}
                      {/* </span> */}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody
              {...getTableBodyProps()}
              overflowY={'auto'}
              overflowX={'hidden'}
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <Td
                        {...cell.getCellProps()}
                        // isNumeric={cell.column.isNumeric}
                      >
                        {cell.render('Cell')}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Search;
