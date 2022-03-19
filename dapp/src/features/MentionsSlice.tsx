import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


export interface mentionsStateDictionaryInterface {
    walletAcc: string;
    fromWallet: string;
    messageBody: string;
    radioType: -1 | 1 | 0;
    fakeDelete: boolean;
    timeStamp: number;
    mentionId: string,
    replyToMentionId: string;
}



interface mentionsInterface {
    errorMessage: string;
    singleMention:  mentionsStateDictionaryInterface;
    allMentions: mentionsStateDictionaryInterface[]
}

const initialState: mentionsInterface = {
    errorMessage: "",
    singleMention: { walletAcc: "", fromWallet: "", messageBody: "", radioType: -1,
         fakeDelete: false, timeStamp: 0, replyToMentionId: "", mentionId: "", },
    allMentions: []
}

const mentionsSlice = createSlice ({
    name: 'mentions',
    initialState,
    reducers: {
        errorMessage(state, action) {
            state.errorMessage = action.payload
        },
        singleMention(state, action) {
            state.singleMention = action.payload
        },
        allMentions(state, action) {
            state.allMentions = action.payload
        },
    }
});

export const { errorMessage, singleMention, allMentions } = mentionsSlice.actions;

export const allMentionsAction = createAction<string>  ("ALL_MENTIONS");
export const singleMentionAction = createAction<mentionsStateDictionaryInterface>("SINGLE_MENTION");


export default mentionsSlice.reducer;