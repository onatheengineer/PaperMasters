import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { put, takeEvery } from "redux-saga/effects";
import { showFriendlyToast, showToast } from "./ToastSlice"
import {UseToastOptions} from "@chakra-ui/react";

export const toastConfig: UseToastOptions = {
    isClosable: true,
    variant: "subtle",
    position: "bottom",
};

export function* makeFriendlyToast({ payload}: PayloadAction<UseToastOptions>): SagaIterator {
    const {title, status} = payload;
    const friendlyTitle = `Hi! ${title}`;
    yield put(showToast({title: friendlyTitle, status}));
}

// not very useful, didn't even bother to add to root saga
export function* watchFriendlyToast(): SagaIterator {
    yield takeEvery(showFriendlyToast.type, makeFriendlyToast);
}