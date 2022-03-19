import { call, put, takeEvery, delay, all, takeLatest, select} from 'redux-saga/effects';
import axios from "axios";
import {
    singleMentionAction, allMentionsAction, errorMessage, allMentions
} from "./MentionsSlice";

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

function* singleMentionSaga(actionObject: any):any {
    yield put(errorMessage(""))
    try {
        if(actionObject.payload.hasOwnProperty('messageBody')){
            console.log('singleMentionBodyHasProperty', actionObject.payload)
            if(actionObject.payload.messageBody.length > 0){
                const putActualMention = yield call(axios.put,`${baseURL}/mentions`, actionObject.payload)
                yield put(allMentionsAction(actionObject.payload.walletAcc))
            }
        }
    } catch (sendMentionsFalied: any) {
        console.log('sendMentionsFalied:', sendMentionsFalied);
        yield put(errorMessage(sendMentionsFalied.message));
    }
}

function* allMentionsSaga(actionObject: any):any {
    console.log('actionObjectAllsMentions', actionObject)
    yield put(errorMessage(""))
    try {
        const allMentionsArr = yield call(axios.get, `${baseURL}/mentions/${actionObject.payload}`);
        console.log('allMentionsArr:', allMentionsArr);
        yield put(allMentions(allMentionsArr.data.Items));

    } catch (getMentionsFAILED: any) {
        console.log('getMentionsFAILED:', getMentionsFAILED);
    yield put(errorMessage(getMentionsFAILED.message));
    }
}


export function* watchMentionsSaga() {
        yield takeLatest(singleMentionAction.type, singleMentionSaga);
        yield takeLatest(allMentionsAction.type, allMentionsSaga);
    };