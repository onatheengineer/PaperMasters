import * as React from 'react';
import {useState, useEffect, useMemo, MouseEventHandler, ChangeEventHandler, useRef, FormEvent} from "react";
import type {FC} from 'react';
import {
    Box, Flex, Input, Button, HStack,
    InputGroup, InputRightAddon, Text,
    Tooltip, Heading, Table, Thead,
    Tbody, Tr, Th, Td, Center, VStack, Stack,
    Popover, PopoverBody, PopoverContent, PopoverTrigger,
    Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, toast,
} from '@chakra-ui/react';
import {Link as ReachLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import  {ExpanderComponentProps} from 'react-data-table-component';
import IdentityEntryModal from "../../utils/IdentityEntryModal";
import AvatarNFI from "../avatar/AvatarNFI";
import {allAccountDictionaryDBAction, allNFIReceiptDBAction} from "../../features/accountDB/AccountDBSlice";
import {BCStruct} from "../../features/accountBC/AccountBCSlice.types";
import {accountArr, allStructBCAction} from "../../features/accountBC/AccountBCSlice";
import {useTable, Column, useSortBy, usePagination} from "react-table";
import {
    useGetAllAccountQuery,
    useGetIdentityBCQuery,
} from "../../features/reactQuery/RTKQuery";
import {HiOutlineDocumentReport} from "react-icons/hi";
import {MdOutlineLibraryAddCheck} from "react-icons/md";
import chainIdNetworkJSON from '../../features/JSON/chainId.networks.json'
import {PMsvgIcon} from "../../assets/icons/PMSvgIcon";
import {showToast} from "../../features/toast/ToastSlice";
import {TriangleDownIcon, TriangleUpIcon} from "@chakra-ui/icons";

interface interfaceFilterComponent{
    filterText: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    onFilter: ChangeEventHandler<HTMLInputElement>,
    text: string,
    placeHolder: string,
    idType: string,
    activateButton: boolean,
}

const FilterComponent: FC<interfaceFilterComponent> = ( { filterText, onClick, onFilter, text ,
                                                        placeHolder, idType, activateButton}) => (
    <Box>
        <HStack>
            <InputGroup>
            <Input focusBorderColor='pmpurple.8'
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
                            color={"pmpurple.13"}
                            onClick={onClick}
                            fontSize={14}
                        >
                            {text}
                        </Button>}
                    />
                </InputGroup>
        </HStack>
    </Box>
)

// data provides access to your row data
// interface DataRow {
//     chainId: string;
//     walletAccount?: string;
//     name?: string;
//     validations: number;
//     originDate: string;
//     profession?: string;
//     reported: number;
//     identityStruct<BCStruct>;
// }

// const ExpandedAvatarComponent: FC<ExpanderComponentProps<BCStruct[]>> = ({ data }) => {
//     console.log("this is Search - Data", data)
//     const addressHasIdentityBoolBool = useAppSelector((state) => state.accountBC.addressHasIdentityBool);
//     if (!addressHasIdentityBoolBool) {
//         return null;
//     }
//     const getAllStructBCBC = useAppSelector((state) => state.accountBC.getAllStructBC);
//     const dispatch = useAppDispatch();
//     dispatch(allStructBCAction);
//     const identityStruct = data['getAllStructBCBC']
//     if (getAllStructBCBC[0].length === 0) {
//         return null;
//     }
//     return (
//         identityStruct.map(
//             <AvatarNFI
//                 walletAccount={identityStruct[0]}
//                 name={identityStruct[1].split("|||")[0]}
//                 nameColor={identityStruct[1].split("|||")[1]}
//                 email={identityStruct[2].split("|||")[0]}
//                 emailColor={identityStruct[2].split("|||")[1]}
//                 profession={identityStruct[3].split("|||")[0]}
//                 professionColor={identityStruct[3].split("|||")[1]}
//                 organization={identityStruct[4].split("|||")[0]}
//                 organizationColor={identityStruct[4].split("|||")[1]}
//                 slogan={identityStruct[5].split("|||")[0]}
//                 sloganColor={identityStruct[5].split("|||")[1]}
//                 website={identityStruct[6].split("|||")[0]}
//                 websiteColor={identityStruct[6].split("|||")[1]}
//                 uniqueYou={identityStruct[7].split("|||")[0]}
//                 uniqueYouColor={identityStruct[7].split("|||")[1]}
//                 avatarBG={identityStruct[8]}
//                 originDate={parseInt(identityStruct[9])}
//             />
//         )
//     )
// };

export const Search:FC =()=> {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [filterWallets, setFilterWallets] = useState<string>('');
    //const [searchWalletAccount, setWalletAccount] = useState<string>('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [isIdentityModalOpen, setIdentityModalOpen] = useState<boolean>(false);
    const initialRef = useRef<HTMLInputElement>(null)
    const initialRefChain = useRef<HTMLInputElement>(null)
    const [typedText, setTypedText] = useState<string>("");
    const [typedTextChainId, setTypedTextChainId] = useState<string>("");


    useEffect(() => {
        dispatch(allAccountDictionaryDBAction());
        dispatch(allNFIReceiptDBAction());
        dispatch(allStructBCAction());
    }, []);

    const [currentPage, setCurrentPage] = useState(0);
    const [selectedWallet, setSelectedWallet] = useState<BCStruct[]>([]);
    const accountQuery = useGetAllAccountQuery();
    const nfiQuery = useGetIdentityBCQuery();

    // export function nfiBC({ identity }):BCStruct[] {
    // const { data, isLoading, isError, error } = useGetIdentityBCQuery(
    //     ["identityStruct", identity.walletAccount],
    //     () => ExpandedComponent(identity.walletAccount)
    // );

    // const rowsTable = useMemo(() => {
//     const receiptDictionary: NFIReceiptInterface["receipt"] = {};
//     if(getAllStructBCBC !== null){
//         getAllStructBCBC.map((el:BCStruct) => {
//             receiptDictionary[el.allAccountDictionaryDBDB.wallet_chain_Pkey] = el;
//         })
//         console.log('this is the receiptDictionary:', receiptDictionary);
//         const datarow: BCStruct[] = [];
//         receiptDictionary.map((element:any) => {
//             let name = "";
//             let profession = "";
//             let originDateFormatted = "";
//             let identityStruct:BCStruct[] = [];
//             if (Object.prototype.hasOwnProperty.call(receiptDictionary, element.walletAccount)) {
//                 console.log('this is the receiptdictionary walletaccount', receiptDictionary[element.walletAccount])
//                 if (Object.hasOwnProperty.call(receiptDictionary[element.walletAccount],'identityStruct')) {
//                     if (receiptDictionary[element.walletAccount]['identityStruct'].length >= 10) {
//                         identityStruct = receiptDictionary[element.walletAccount]['identityStruct']
//                         name = receiptDictionary[element.walletAccount]['identityStruct'][1].split('|||')[0]
//                         profession = receiptDictionary[element.walletAccount]['identityStruct'][3].split('|||')[0]
//                         const originDate = receiptDictionary[element.walletAccount]['identityStruct'][9]
//                         const originDateObject = new Date(originDate);
//                         originDateFormatted = `${originDateObject.toLocaleString('en-us',
//                             {month: 'long'})} ${originDateObject.getDate()}, ${originDateObject.getFullYear()}`
//                         console.log("this is the origin date from Search", originDate)
//                     }
//                 }
//             }
//             const singleWalletDictionary = {
//                 identityStruct: identityStruct,
//                 walletAccount: element.walletAccount,
//                 name: (name ? name : "non-registered"),
//                 profession: profession,
//                 validations: 0,
//                 originDate: originDateFormatted,
//                 reported: 0,
//             }
//             datarow.push(singleWalletDictionary);
//         })
//         return datarow;
//     }
//     return[];
// }, []);

    type Cols = {
        shortName: string,
        chainId: string,
        creation: number | null,
        wallet: string,
        name: string | undefined,
        origin: string | undefined,
        profession: string | undefined,
        validations: number | undefined,
        validate: string,
        reported: number | undefined,
        report: string
    };

    const data = useMemo((): Cols[] => {
        console.log(accountQuery)
        console.log("nfiQuery", nfiQuery)
        if (!accountQuery.isSuccess) return []
        return (accountQuery.data.Items.map((el) => {
            console.log("el", el)
            let name = "non-registered account";
            let originDate = "";
            let profession = "";
            if (nfiQuery.isSuccess) {
                const nfiArr = nfiQuery.data.filter((elel) => {
                    return (elel.chainId.toString() === el.chainId && elel.walletAccount === el.walletAccount)
                });
                console.log("nfiArr", nfiArr)
                if (nfiArr.length > 0) {
                    const nameName = nfiArr[0].name.split("|||")[0];
                    name = nameName;
                    originDate = nfiArr[0].originDate.toString();
                    profession = nfiArr[0].profession.split("|||")[0];
                    if (el.ownerName && el.ownerName.length > 0) {
                        name = el.ownerName as string;
                    }
                }
            }
            const chainArr = chainIdNetworkJSON.filter((chainN) => {
                return (chainN.chainId.toString() === el.chainId)
            })
            const chainName = (chainArr.length > 0 ? chainArr[0].shortName : el.chainId)
            return ({
                shortName: chainName,
                chainId: el.chainId,
                creation: el.createDate!,
                wallet: el.walletAccount,
                name: name,
                origin: originDate,
                profession: profession,
                validations: el.validations,
                validate: '',
                reported: el.reported,
                report: '',
            })
        }))
    }, [accountQuery, nfiQuery])

    const columns: Column<Cols>[] = useMemo(() => [
        {
            Header: <Center> <Text style={{whiteSpace: 'nowrap'}}> Chain </Text> </Center>,
            accessor: 'shortName',
            Cell: (el) => <Text fontSize={'12px'}> {el.row.original.shortName.toUpperCase()} </Text>
        },
        {
            Header: <Center><Text style={{whiteSpace: 'nowrap'}}> Origin Date </Text></Center>,
            accessor: 'creation',
            Cell: (el) => {
                if (el.row.original.creation !== null) {
                    const creationDateObject = new Date(el.row.original.creation);
                    const creationDateFormatted = `${creationDateObject.toLocaleString('en-us', {month: 'long'})} ${creationDateObject.getDate()}, ${creationDateObject.getFullYear()}`;
                    const originD = el.row.original.origin;
                    console.log("originD", originD)
                    if (originD === null || originD === undefined || originD === "") {
                        return (
                            <Center>
                                <Text fontSize={'12px'} style={{whiteSpace: 'nowrap'}}> {creationDateFormatted} </Text>
                            </Center>
                        )
                    } else {
                        const originDateObject = new Date(parseInt(originD!) * 1000);
                        const originDateFormatted = `${originDateObject.toLocaleString('en-us', {month: 'long'})} ${originDateObject.getDate()}, ${originDateObject.getFullYear()}`
                        return (
                            <>
                                <Center>
                                    <VStack>
                                        <Tooltip
                                            //hasArrow
                                            label={originDateFormatted}
                                            placement={'bottom-end'} border={'1px solid #694b69'}
                                            borderRadius={'3px'} bg='pmpurple.5' color='pmpurple.13' m={'-6px'}
                                            aria-label='A tooltip'
                                            bgColor={'white'}
                                            fontSize={'12px'}
                                        >
                                        <span>
                                           <PMsvgIcon
                                               width="28"
                                               height="28"
                                               viewBox="0 0 28 28"
                                           />
                                        </span>
                                        </Tooltip>
                                        <Text fontSize={'12px'}
                                              style={{whiteSpace: 'nowrap'}}> {creationDateFormatted}</Text>
                                    </VStack>
                                </Center>
                            </>
                        )
                    }
                }
            }
        },
        {
            Header: <Center> <Text style={{whiteSpace: 'nowrap'}}> Wallet Account </Text></Center>,
            accessor: 'wallet',
            Cell: (el) => {
                return (
                    <>
                        <Center><Text fontSize={'12px'}
                                      style={{whiteSpace: 'nowrap'}}> {el.row.original.name}</Text></Center>
                        <Popover
                            trigger={'hover'}
                        >
                            <PopoverTrigger>
                                <Button as={ReachLink}
                                        to={`/identity/${el.row.original.chainId}/${el.row.original.wallet}`}
                                        bg={'#f2eef2'}
                                        color={'pmpurple.13'}
                                        width={'128px'}
                                        height={'24px'}
                                        overflow={"hidden !important"}
                                        textAlign={'left'}
                                        borderRadius={'5px'}
                                        textOverflow={"ellipsis"}
                                >
                                    <Center>
                                        <Text
                                            whiteSpace="nowrap"
                                            overflow={"hidden !important"}
                                            textOverflow={"ellipsis"}
                                            fontSize={'12px'}
                                            width={'118px'}
                                        >
                                            {el.row.original.wallet}
                                        </Text>
                                    </Center>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                whiteSpace="nowrap"
                                width={'400px'}
                                border={'1px solid #694b69'}
                                //borderRadius={'3px'}
                                color='pmpurple.13'
                                pl={'1px'}
                                overflow={"hidden !important"}
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
                )
            }
        },
        {
            Header: <Center><Text style={{whiteSpace: 'nowrap'}}> Profession </Text></Center>,
            accessor: 'profession',
            Cell: ({value}) => <Center><Text fontSize={'12px'} style={{whiteSpace: 'nowrap'}}> {value} </Text></Center>
        },
        {
            Header: <Center><Text style={{whiteSpace: 'nowrap'}}> Validations </Text></Center>,
            accessor: 'validations',
        },
        {
            Header: <Center><Text style={{whiteSpace: 'nowrap'}}> Validate </Text></Center>,
            accessor: 'validate',
            Cell: (el) => {
                return (
                    <Center>
                        <Button as={ReachLink} to={`/validate/${el.row.original.chainId}/${el.row.original.wallet}`}
                                color={'pmpurple.13'} bg={'#f2eef2'} fontSize={'12px'}>
                            <MdOutlineLibraryAddCheck fontSize={'16px'}/>
                            <Text fontSize={'12px'} ml={'6px'}> Validate </Text>
                        </Button>
                    </Center>
                )
            },
        },
        {
            Header: <Center><Text style={{whiteSpace: 'nowrap'}}> Reported </Text></Center>,
            accessor: 'reported',
        },
        {
            Header: <Center><Text style={{whiteSpace: 'nowrap'}}> Report </Text></Center>,
            accessor: 'report',
            Cell: (el) => {
                return (
                    <Center>
                        <Button as={ReachLink} to={`/report/${el.row.original.chainId}/${el.row.original.wallet}`}
                                color={'pmpurple.13'} bg={'#f2eef2'} fontSize={'12px'}>
                            <HiOutlineDocumentReport fontSize={'16px'}/>
                            <Text fontSize={'12px'} ml={'6px'}> Report </Text>
                        </Button>
                    </Center>
                )
            },
        },
    ], [])

    const filteredItems = data.filter(item => {
            if (filterWallets.length === 0 && setFilterWallets.length === 0) {
                return item;
            }
            if (filterWallets.length !== 0) {
                if (item.name && item.name.toLowerCase().includes(filterWallets.toLowerCase())) {
                    return item;
                }
                if (item.profession && item.profession.toLowerCase().includes(filterWallets.toLowerCase())) {
                    return item;
                }
                if (item.origin && item.origin.toLowerCase().includes(filterWallets.toLowerCase())) {
                    return item;
                }
                if (item.wallet && item.wallet.toLowerCase().includes(filterWallets.toLowerCase())) {
                    return item;
                }
            }
            if (setFilterWallets.length !== 0) {
                if (item.wallet && item.wallet.toLowerCase().includes(filterWallets.toLowerCase())
                    && item.name && item.name.toLowerCase().includes(filterWallets.toLowerCase())) {
                    return item;
                }
            }
        }
    );
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterWallets) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterWallets('');
            }
        };
        const addWalletAccountHandler = () => {
            setIdentityModalOpen(true)
        };
        const inputTextHandler = (e: FormEvent<HTMLInputElement>) => {
            setTypedText(e.currentTarget.value);
        };
        const inputTextChainIdHandler = (e: FormEvent<HTMLInputElement>) => {
            setTypedTextChainId(e.currentTarget.value);
        };
        const navToProfilePageHandler = () => {
            if (accountArr.length === 0) {
                dispatch(showToast({
                    title: 'You need to connect your own account before you can add ' +
                        'someone elses wallet account', status: 'error'
                }))
            } else {
                navigate(`/identity/${initialRefChain.current?.value}/${initialRef.current?.value}`);
            }
        };
        return (
            <Box>
                <HStack
                    justifyContent={'end'}
                    mr={2}
                >
                    <FilterComponent onFilter={(e: any) => setFilterWallets(e.target.value)}
                                     onClick={handleClear}
                                     activateButton={(filteredItems.length !== 0)}
                                     filterText={filterWallets}
                                     text={"reset"}
                                     placeHolder={"Search Wallet Account"}
                                     idType={"Search"}/>
                    <Button
                        bg={'pmpruple.2'}
                        border={'1px solid'}
                        borderColor={'pmpurple.5'}
                        onClick={addWalletAccountHandler}
                    >
                        <Text fontSize={12} textColor={'pmpurple.13'}
                        >Add Wallet Account</Text>
                    </Button>
                </HStack>
                <Box>
                    <Modal
                        initialFocusRef={initialRef}
                        isOpen={isIdentityModalOpen}
                        onClose={() => {
                            setIdentityModalOpen(false)
                        }}
                    >
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader textColor={'pmpurple.13'}>Create a profile for a Non-Registered</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody pb={4}>
                                <FormControl mt={4}>
                                    <FormLabel textColor={'pmpurple.13'}>Chain Id</FormLabel>
                                    <Input
                                        onChange={inputTextChainIdHandler}
                                        focusBorderColor='pmpurple.6'
                                        border={'1px solid'} borderColor={'pmpurple.8'}
                                        ref={initialRefChain} placeholder='chain Id'
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel textColor={'pmpurple.13'}>Enter Wallet Account</FormLabel>
                                    <Input
                                        onChange={inputTextHandler}
                                        focusBorderColor='pmpurple.6'
                                        border={'1px solid'} borderColor={'pmpurple.8'}
                                        ref={initialRef} placeholder='Must be greater than 26 characters'
                                    />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button bg={'pmpurple.8'}
                                        disabled={(typedText.length <= 26 || typedTextChainId.length < 1)}
                                        border={'1px solid'}
                                        borderColor={'pmpurple.13'} color={'pmpurple.1'} mr={3}
                                        onClick={navToProfilePageHandler}
                                >
                                    Create
                                </Button>
                                <Button bg={'pmpurple.2'} border={'1px solid'} borderColor={'pmpurple.4'}
                                        color={'pmpurple.13'} mr={3} onClick={() => {
                                    setIdentityModalOpen(false)
                                }}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Box>
        );
    }, [filterWallets, resetPaginationToggle, filteredItems]);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
        useTable({columns, data}, useSortBy, usePagination);

    if (!accountQuery.data) return <div/>
    if (accountQuery.isLoading) return (<Heading>isLoading...</Heading>);
    if (accountQuery.isError) return (
        <Heading>Nooo...something went wrong!<Text>{accountQuery.error.toString()}</Text></Heading>);
    return (
        <Flex
            justifyContent="center"
            flex={{base: 1, md: 'auto'}}
            //flex={'auto'}
            w={'100%'}
            //border={'1px solid red'}
            m={5}
            bg={'pmpurple.1'}
            border={'3px solid'}
            borderColor={'pmpurple.13'}
            borderRadius={'6px'}
        >
            <Stack
                spacing={0}
                w={'100%'}
                //border={'1px solid red'}
            >
                <Box
                p={2}
                >
                    <Center>
                        <Text
                            fontSize={20}
                            color={'pmpurple.13'}
                            fontWeight={'bold'}
                        >
                            Wallet Account Search Table
                        </Text>
                    </Center>
                </Box>

                <Box
                    justifyItems={'end'}
                    justifyContent={'right'}
                    py={4}
                >
                    {subHeaderComponentMemo}
                </Box>

                <Box
                    //border={'1px solid red'}
                    h={'100%'}
                >
                    <Table {...getTableProps()}                    >
                            <Thead
                            position={'sticky'}
                            >
                                {headerGroups.map((headerGroup) => (
                                    <Tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <Th
                                                {...column.getHeaderProps()}
                                                // isNumeric={column.isNumeric}
                                            >
                                                {column.render('Header')}
                                                {/*<span pl='4'>*/}
                                                {/*    {column.isSorted ? (*/}
                                                {/*        column.isSortedDesc ? (*/}
                                                {/*            <TriangleDownIcon aria-label='sorted descending' />*/}
                                                {/*        ) : (*/}
                                                {/*            <TriangleUpIcon aria-label='sorted ascending' />*/}
                                                {/*        )*/}
                                                {/*    ) : null}*/}
                                                {/*</span>*/}
                                            </Th>
                                        ))}
                                    </Tr>
                                ))}
                            </Thead>
                            <Tbody {...getTableBodyProps()}
                            overflowY={'auto'}
                                   overflowX={'hidden'}
                            >
                                {rows.map((row) => {
                                    prepareRow(row)
                                    return (
                                        <Tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <Td {...cell.getCellProps()}
                                                    // isNumeric={cell.column.isNumeric}
                                                >
                                                    {cell.render('Cell')}
                                                </Td>
                                            ))}
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                    </Table>
                </Box>
            </Stack>
        </Flex>
    )
};

export default Search;

{/*<Box     >*/}
{/*<DataTable*/}
{/*    title="Non-Fungible-Identities"*/}
{/*    columns={columns}*/}
{/*    data={filteredItems}*/}
{/*    expandableRows*/}
{/*    expandableRowsComponent={ExpandedComponent}*/}
{/*    defaultSortFieldId={5}*/}
{/*    fixedHeader={true}*/}
{/*    fixedHeaderScrollHeight={'60vh'}*/}
{/*    pagination={true}*/}
{/*    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1*/}
{/*    subHeader={true}*/}
{/*    subHeaderComponent={subHeaderComponentMemo}*/}
{/*    persistTableHead*/}
{/*    paginationPerPage={12}*/}
{/*    striped={true}*/}
{/*    highlightOnHover={true}*/}
{/*    //selectableRows*/}
{/*/>*/}


