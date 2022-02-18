import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import Web3 from "web3";
import RegisterSlice, {accountsArr, RequestAccountsAsyncAction, statusOfArr} from "./RegisterSlice";
import {mintIdentityAsyncAction} from "./MintSlice";
import MintABI from '../abiFiles/PaperMastersNFI.json'

// function mintNFI (
//     string memory _name,
//     string memory _email,
//     string memory _profession,
//     string memory _organization,
//     string memory _slogan,
//     string memory _website,
//     string memory _uniqueYou,
//     string memory _backGroundRGB,
//     uint _originDate,
//     string memory _linkToFinishedAvatar
// ) public virtual noReentrant payable whenNotPaused
// Replacing 'PaperMastersNFI'
// ---------------------------
// contract address:    0x674b59fD9353D6B8d0b0aA44B132e49F85299d90


export const getFilledAccountsArr = (state: any) => state.register.accounts

function* mintIdentitySaga(actionObject: any):any {

    if (actionObject.payload.name === null) {
        //TODO: handle error logging
        console.log("Name can not be empty");
        return;
    }

    const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
    console.log(filledAccountsArr);

    if (filledAccountsArr.length === 0) {
        console.log("Please Connect Wallet to mint an NFI");
        return;
    }

    yield console.log("my mint identity saga")
    yield console.table(actionObject)
    yield console.table(actionObject.payload)
    yield console.log(actionObject.payload.name)

    const web3 = new Web3(Web3.givenProvider);
    const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);

    const alreadyMinted = yield call(papermastersNFIContract.methods.addressHasToken(filledAccountsArr[0]).call, {from: filledAccountsArr[0]})
    if (alreadyMinted){
        console.log('Sorry, only one NFI per account')
        return;
    }

       const prepareResult= yield call(
           papermastersNFIContract.methods.mintNFI,
            actionObject.payload.name,
            actionObject.payload.email === null ? "" : actionObject.payload.email,
            actionObject.payload.profession === null ? "" : actionObject.payload.profession,
            actionObject.payload.org === null ? "" : actionObject.payload.org,
            actionObject.payload.slogan === null ? "" : actionObject.payload.slogan,
            actionObject.payload.website === null ? "" : actionObject.payload.website,
            actionObject.payload.uniqueYou === null ? "" : actionObject.payload.uniqueYou,
            actionObject.payload.colorBGAvatar === null ? "" : actionObject.payload.colorBGAvatar,
            actionObject.payload.originDate === null ? "" : actionObject.payload.originDate,
            "",
        )
    console.table(prepareResult);
    //TODO: get fee variable from contract and replace the 'value'
    const mintResult: any = yield call( prepareResult.send, {from: filledAccountsArr[0], value:50000000000000000});
    console.log("mint sent!");
    console.log(mintResult);
}

export function* watchMintIdentitySaga() {
    yield takeLatest(mintIdentityAsyncAction.type, mintIdentitySaga);
}

//web3.eth.sendTransaction({from: '0x123...', data: '0x432...'})
//.once('sending', function(payload){ ... })
//.once('sent', function(payload){ ... })
//.once('transactionHash', function(hash){ ... })
//.once('receipt', function(receipt){ ... })
//.on('confirmation', function(confNumber, receipt, latestBlockHash){ ... })
//.on('error', function(error){ ... })
//.then(function(receipt){
//// will be fired once the receipt is mined
//});

//|| 'https://api.s0.b.hmny.io'




