import * as React from 'react';
import {useState, useEffect, useCallback, useMemo, MouseEventHandler, ChangeEventHandler} from "react";
import Web3 from "web3";
import type {FC} from 'react';
import {
    Box,
    Flex,
    MenuButton,
    Input,
    Button,
    HStack,
    InputGroup,
    InputRightAddon,
    Text,
    FormControl
} from '@chakra-ui/react';
import {useAppSelector} from "../../app/hooks";
import DataTable, {ExpanderComponentProps, TableColumn} from 'react-data-table-component';
import {Route, Routes, useNavigate} from "react-router-dom";
import Sidebar from "../Sidebar";
import {Link as ReachLink} from "react-router-dom";
import {MdManageAccounts} from "react-icons/md";
import {HiOutlineDocumentReport} from "react-icons/hi";
import {MdOutlineLibraryAddCheck} from "react-icons/md";
import {SiSololearn} from "react-icons/si";
import IdentityEntryModal from "../../utils/IdentityEntryModal";


interface DataRow {
    name: string;
    IdNFI: string;
    validations: number;
    mentions: number;
    originDate: string;
    profession: string;
    reported: number;
    ownedTokens: number;
};

interface interfaceFilterComponent{
    filterText: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    onFilter: ChangeEventHandler<HTMLInputElement>,
    text: string,
    placeHolder: string,
    idType: string,
    activateButton: boolean,
}

const FilterComponent: FC<interfaceFilterComponent> = ( { filterText, onClick, onFilter, text , placeHolder, idType, activateButton}) => (

    <Box>
        <HStack>
            <InputGroup>
            <Input focusBorderColor='pmpurple.8' color={'pmpurple.13'} border={'1px solid'} borderColor={'pmpurple.3'} id={idType} type="text" placeholder={placeHolder} aria-label="Search Input" value={filterText} onChange={onFilter} />
                <InputRightAddon
                    p='0' borderColor={"pmpurple.4"} bg={'pmpurple.2'}
                    children={<Button bg={'pmpurple.5'} color={"pmpurple.13"} disabled={activateButton} onClick={onClick} >{text}</Button>} />
            </InputGroup>
        </HStack>
    </Box>

)

// data provides access to your row data
const ExpandedComponent: FC<ExpanderComponentProps<DataRow>> = ({ data }) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export const Search: FC=()=> {
    const getAccountsArr = useAppSelector((state) => state.register.accounts);
    const [filterText, setFilterText] = useState<string>('');
    const [searchWalletAccount, setWalletAccount] = useState<string>('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);
    const [isIdentityModalOpen, setIdentityModalOpen] = useState<boolean>(false);

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            reorder: true,
            center: true,
        },
        {
            name: 'NFI Identification',
            selector: row => row.IdNFI,
            sortable: true,
            reorder: true,
            center: true,
            style: {
                backgroundColor: '#f2eef2',
                fontWeight: 'bold'
            },
        },

        {
            name: 'Validations',
            selector: row => row.validations,
            sortable: true,
            reorder: true,
            center: true,
        },
        {
            name: 'Validate',
            sortable: true,
            reorder: true,
            button: true,
            center: true,
            cell: () => <Button as={ReachLink} to={'/validate'} bg={'#f2eef2'} fontSize={'12px'}>
                <MdOutlineLibraryAddCheck fontSize={'16px'}/>
                <Text ml={'6px'}> Validate </Text>
            </Button>,
        },
        {
            name: 'Origin Date',
            selector: row => row.originDate,
            sortable: true,
            reorder: true,
            center: true,
        },
        {
            name: 'Mentions',
            selector: row => row.mentions,
            sortable: true,
            reorder: true,
            center: true,
        },
        {
            name: 'Profession',
            selector: row => row.profession,
            sortable: true,
            reorder: true,
            center: true,
        },
        // {
        //     name: 'Owned Tokens',
        //     selector: row => row.ownedTokens,
        //     sortable: true,
        //     reorder: true,
        //     center: true,
        // },
        {
            name: 'Reported',
            selector: row => row.reported,
            sortable: true,
            reorder: true,
            center: true,
        },
        {
            name: 'Report',
            sortable: true,
            reorder: true,
            button: true,
            center: true,
            cell: () => <Button as={ReachLink} to={'/report'} bg={'#f2eef2'} fontSize={'12px'}> <HiOutlineDocumentReport
                fontSize={'16px'}/>
                <Text ml={'6px'}> Report </Text>
            </Button>,
        },

    ];

    const data: DataRow[] = [
        {
            name: 'andrwe niederhasuern',
            IdNFI: (getAccountsArr.length === 0 ? 'No NFI' : getAccountsArr[0]),
            profession: 'engineer',
            validations: 654654,
            mentions: 1,
            originDate: 'dec 30, 1976',
            ownedTokens: 3234,
            reported: 2,
        },
        {
            name: 'ramona',
            IdNFI: 'ytuytrtertr',
            profession: 'Beetlejuice',
            validations: 7,
            mentions: 2,
            originDate: 'dec 30, 1976',
            ownedTokens: 3234,
            reported: 2,
        },
        {
            name: 'ramona',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 654,
            mentions: 3,
            originDate: 'jan 08, 1958',
            ownedTokens: 3234,
            reported: 1,
        },
        {
            name: 'Nautica',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 4654,
            mentions: 4,
            originDate: 'mar 02, 2007',
            ownedTokens: 3234,
            reported: 0,
        },
        {
            name: 'ammon',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 65,
            mentions: 7,
            originDate: 'Sept 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'Kaleb',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 547,
            mentions: 5,
            originDate: 'Aug 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'Matthias',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 645,
            mentions: 6,
            originDate: 'june 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'werwe',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 698,
            mentions: 10,
            originDate: 'July 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'Elijah',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 61,
            mentions: 11,
            originDate: 'April 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'Zechariah',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 60,
            mentions: 12,
            originDate: 'Feb 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'Atlas',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 78,
            mentions: 13,
            originDate: 'Jan 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'andrwe',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 654654,
            mentions: 1,
            originDate: 'dec 30, 1976',
            ownedTokens: 3234,
            reported: 2,
        },
        {
            name: 'ramona',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 7,
            mentions: 2,
            originDate: 'dec 30, 1976',
            ownedTokens: 3234,
            reported: 2,
        },
        {
            name: 'ramona',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 654,
            mentions: 3,
            originDate: 'jan 08, 1958',
            ownedTokens: 3234,
            reported: 1,
        },
        {
            name: 'Nautica',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 4654,
            mentions: 4,
            originDate: 'mar 02, 2007',
            ownedTokens: 3234,
            reported: 0,
        },
        {
            name: 'ammon',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 65,
            mentions: 7,
            originDate: 'Sept 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'Kaleb',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 547,
            mentions: 5,
            originDate: 'Aug 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'Matthias',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 645,
            mentions: 6,
            originDate: 'june 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'werwe',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 698,
            mentions: 10,
            originDate: 'July 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'Elijah',
            IdNFI: 'khjsfuyrtyrt9837453874535',
            profession: 'Beetlejuice',
            validations: 61,
            mentions: 11,
            originDate: 'April 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'Zechariah',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 60,
            mentions: 12,
            originDate: 'Feb 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'Atlas',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 78,
            mentions: 13,
            originDate: 'Jan 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
    ]


    const filteredItems = data.filter( item => {
            if (filterText.length === 0 && searchWalletAccount.length === 0) {
                return item;
            }
            if (filterText.length !== 0) {
                if (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) {
                    return item;
                }
                if (item.profession && item.profession.toLowerCase().includes(filterText.toLowerCase())) {
                    return item;
                }
                if (item.originDate && item.originDate.toLowerCase().includes(filterText.toLowerCase())) {
                    return item;
                }
                if (item.IdNFI && item.IdNFI.toLowerCase().includes(filterText.toLowerCase())) {
                        return item;
                    }
                }
            if (searchWalletAccount.length !== 0) {
                if (item.IdNFI && item.IdNFI.toLowerCase().includes(searchWalletAccount.toLowerCase()) && item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) {
                    return item;
                }
            }
        }
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        const addWalletAccountHandler = () => {
            setIdentityModalOpen(true)
        };

        return (
            <Box>
                <HStack>

                    <FilterComponent onFilter={(e: any) => setFilterText(e.target.value)} onClick={handleClear} activateButton={false}
                                     filterText={filterText} text={"reset"} placeHolder={"Search NFI"} idType={"Search"}/>

                    <FilterComponent onFilter={(e: any) => setWalletAccount(e.target.value)} onClick={addWalletAccountHandler} activateButton={(filteredItems.length !== 0)}
                                     filterText={searchWalletAccount} text={"Add Wallet Account"} placeHolder={"Search Wallet Account"} idType={"WalletAccount"}/>

                    <IdentityEntryModal title={'Create a profile for a Non-Registered'} text={'Enter Wallet Account'} placeHolder={'wallet account'}
                                        buttonText={'Create'} isOpen={isIdentityModalOpen} onClose={()=>{setIdentityModalOpen(false)}}/>
                </HStack>
            </Box>
        );
    }, [filterText, searchWalletAccount, resetPaginationToggle, filteredItems]);


    return (

        <Flex
            // justifyContent="center"
            //flex='auto'
            p={'16px'}

        >
            <Box
                // border={'1px'}
                // borderStyle={"solid"}
                // borderColor={'pmpurple.13'}
            >

                <DataTable
                    title="Non-Fungible-Identities"
                    columns={columns}
                    data={filteredItems}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    defaultSortFieldId={5}
                    fixedHeader={true}
                    fixedHeaderScrollHeight={'60vh'}
                    pagination={true}
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader={true}
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    paginationPerPage={20}
                    striped={true}
                />
            </Box>
        </Flex>
    )
};

export default Search;