/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

export interface mentionsStateDictionaryInterface {
  walletAcc: string;
  fromWallet: string;
  messageBody: string;
  radioType: -1 | 1 | 0;
  fakeDelete: boolean;
  timeStamp: number;
  mentionId: string;
  replyToMentionId: string;
}

export interface mentionsInterface {
  errorMessage: string;
  singleMention: mentionsStateDictionaryInterface;
  allMentions: mentionsStateDictionaryInterface[];
}

const initialState: mentionsInterface = {
  errorMessage: '',
  singleMention: {
    walletAcc: '',
    fromWallet: '',
    messageBody: '',
    radioType: -1,
    fakeDelete: false,
    timeStamp: 0,
    replyToMentionId: '',
    mentionId: '',
  },
  allMentions: [],
};

const mentionsSlice = createSlice({
  name: 'mentions',
  initialState,
  reducers: {
    errorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    singleMention(
      state,
      action: PayloadAction<mentionsStateDictionaryInterface>,
    ) {
      state.singleMention = action.payload;
    },
    allMentions(
      state,
      action: PayloadAction<mentionsStateDictionaryInterface[]>,
    ) {
      state.allMentions = action.payload;
    },
  },
});

export const { errorMessage, singleMention, allMentions } =
  mentionsSlice.actions;

export const allMentionsAction = createAction<string>('ALL_MENTIONS');
export const singleMentionAction =
  createAction<mentionsStateDictionaryInterface>('SINGLE_MENTION');

export default mentionsSlice.reducer;
