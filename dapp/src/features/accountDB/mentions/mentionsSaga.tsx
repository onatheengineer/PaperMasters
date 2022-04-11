import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import axios from "axios";
import {
    singleMentionAction, allMentionsAction, errorMessage, allMentions, mentionsStateDictionaryInterface
} from "./MentionsSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import {ToastOptions} from "../../toast/redux/toastSlice.types";
import {SagaIterator} from "redux-saga";

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

function* singleMentionSaga({payload}: PayloadAction<mentionsStateDictionaryInterface>): SagaIterator {
    yield put(errorMessage(""))
    try {
        if(payload.hasOwnProperty('messageBody')){
            console.log('singleMentionBodyHasProperty', payload)
            if(payload.messageBody.length > 0){
                const putActualMention = yield call(axios.put,`${baseURL}/mentions`, payload)
                yield put(allMentionsAction(payload.walletAcc))
            }
        }
    } catch (sendMentionsFalied: any) {
        console.log('sendMentionsFalied:', sendMentionsFalied);
        yield put(errorMessage(sendMentionsFalied.message));
    }
}

function* allMentionsSaga({payload}: PayloadAction<string>): SagaIterator {
    console.log('payloadAllMentions', payload)
    yield put(errorMessage(""))
    try {
        const allMentionsArr = yield call(axios.get, `${baseURL}/mentions/${payload}`);
        console.log('allMentionsArr:', allMentionsArr);
        yield put(allMentions(allMentionsArr.data.Items));

    } catch (getMentionsFAILED: any) {
        console.log('getMentionsFAILED:', getMentionsFAILED);
    yield put(errorMessage(getMentionsFAILED.message));
    }
}

export function* watchMentionsSaga(): SagaIterator {
        yield takeLatest(singleMentionAction.type, singleMentionSaga);
        yield takeLatest(allMentionsAction.type, allMentionsSaga);
    }