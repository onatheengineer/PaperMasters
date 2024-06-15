import { UseToastOptions } from '@chakra-ui/react';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { showToast, startToast, ToastOptions } from './ToastSlice';

const baseURL = 'https://ociuozqx85.execute-api.us-east-1.amazonaws.com';

export const sendToAnalytics = (title: string): void => {
  const postErrorAxios = call(axios.post, `${baseURL}/errors}`);
  console.error('Got Error Toast!', title);
};

export function* logErrorToastSaga({
  payload,
}: PayloadAction<ToastOptions>): SagaIterator {
  const { title, status } = payload;
  if (status === 'error') {
    yield call(sendToAnalytics, title);
  }
  yield put(showToast({ title, status }));
}

export function* watchToasts(): SagaIterator {
  yield takeEvery(startToast.type, logErrorToastSaga);
}
