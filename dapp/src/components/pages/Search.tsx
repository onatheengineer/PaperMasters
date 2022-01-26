import * as React from 'react';
import {useState, useEffect, useCallback, useMemo} from "react";
import Web3 from "web3";
import type {FC} from 'react';
import { Box, Flex,} from '@chakra-ui/react';
import {useAppSelector} from "../../app/hooks";
import DataTable, {ExpanderComponentProps, TableColumn} from 'react-data-table-component';
import {Route, Routes} from "react-router-dom";
import SidebarSearch from "../molecules/Sidebars/SidebarSearch";




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

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            reorder: true,
        },
        {
            name: 'NFI Identification',
            selector: row => row.IdNFI,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Validations',
            selector: row => row.validations,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Mentions',
            selector: row => row.mentions,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Origin Data',
            selector: row => row.originDate,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Profession',
            selector: row => row.profession,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Reported',
            selector: row => row.reported,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Owned Tokens',
            selector: row => row.ownedTokens,
            sortable: true,
            reorder: true,
        },
    ];

    const data: DataRow[] = [
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
            name: 'rnatuica',
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
            name: 'vbn',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 547,
            mentions: 5,
            originDate: 'Aug 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'xcv',
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
            name: 'uyiuy',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 61,
            mentions: 11,
            originDate: 'April 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'fghf',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 60,
            mentions: 12,
            originDate: 'Feb 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },
        {
            name: 'dfg',
            IdNFI: '789345hjkgf897435jhkgdkjhdfg897ertjkhdfgfkjhdfg',
            profession: 'Beetlejuice',
            validations: 78,
            mentions: 13,
            originDate: 'Jan 09, 2010',
            ownedTokens: 324,
            reported: 9,
        },

    ]

// data provides access to your row data
const ExpandedComponent: FC<ExpanderComponentProps<DataRow>> = ({ data }) => {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

const [filterText, setFilterText] = useState('');
const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

const filteredItems = data.filter(
    item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
);

const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
    };

    return (
        <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
}, [filterText, resetPaginationToggle]);

export const Search: FC=()=> {

    return(
    <Flex>

        <Flex borderRight="1px solid " borderColor='#daceda'>
            <SidebarSearch/>
        </Flex>

        <Box
            border={'8px'}
            borderColor={"white"}
            justifyContent="center"
            flex='auto'
            p={'16px'}
            >

            <DataTable
                title="Non-Fungible-Identities"
                columns={columns}
                data={filteredItems}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                defaultSortFieldId={5}
                fixedHeader={true}
                fixedHeaderScrollHeight={'300px'}
                pagination={true}
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                selectableRows
                persistTableHead
            />

        </Box>
    </Flex>

    )
}

export default Search;