import { expectSaga } from "redux-saga-test-plan";
import { makeFriendlyToast } from "./friendlyToastSaga"
import { showToast } from "./ToastSlice"
import {UseToastOptions} from "@chakra-ui/react";

export const toastConfig: UseToastOptions = {
    isClosable: true,
    variant: "subtle",
    position: "bottom",
};

const friendlyToastPayload: UseToastOptions = {
    title: "you're great",
    status: "info",
};

const friendlyToastAction = {
    type: "test", // not important to the makeFriendlyToast saga
    payload: friendlyToastPayload,
};

test("adds greeting before toast title", () => {
    return expectSaga(makeFriendlyToast, friendlyToastAction)
        .put(showToast({ title: "Hi! you're great", status: "info" }))
        .run();
});