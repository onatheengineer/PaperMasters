import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import Web3 from "web3";
import {totalDepositsToContract, totalDepositsToContractAsyncAction} from "./FeesNFISlice";
import MintABI from "../abiFiles/PaperMastersNFI.json";

export const getFilledAccountsArr = (state: any) => state.register.accounts;

function* depositToContractSaga(actionObject: any): any {
    const filledAccountsArr: string[] = yield select(getFilledAccountsArr);
    const web3 = new Web3(Web3.givenProvider);
    const papermastersNFIContract = new web3.eth.Contract(MintABI.abi as any, MintABI.networks['1666700000'].address);
    const makingDonationToContract = yield call(papermastersNFIContract.methods.deposit(filledAccountsArr[0]).send, {from: filledAccountsArr[0]});

    //capture the DonationMade event...
}

export function* watchDepositToContractSaga(){
    yield takeEvery(totalDepositsToContractAsyncAction.type, depositToContractSaga);
};

//
// function deposit() public payable {
//     _supportPMDonations[msg.sender] += msg.value;
//     emit donationMade(amount, address(this).balance, msg.sender);
// }
// event DonationMade(uint256 amount, uint balance, address donationSender);