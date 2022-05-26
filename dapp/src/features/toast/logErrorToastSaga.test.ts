import { expectSaga } from 'redux-saga-test-plan';
import { logErrorToastSaga, sendToAnalytics } from './logErrorToastSaga';
import { ToastOptions } from './ToastSlice';

const errorToastOptions: ToastOptions = {
  title: "It's time to panic!!!",
  status: 'error',
};

const errorToastAction = {
  type: 'test',
  payload: errorToastOptions,
};

test('saga calls analytics when it receives error toast', () => {
  return expectSaga(logErrorToastSaga, errorToastAction)
    .call(sendToAnalytics, "It's time to panic!!!")
    .run();
});

const infoToastOptions: ToastOptions = {
  title: "It's not time to panic",
  status: 'info',
};

const infoToastAction = {
  type: 'test',
  payload: infoToastOptions,
};

test('saga does not call analytics when it receives info toast', () => {
  return expectSaga(logErrorToastSaga, infoToastAction)
    .not.call.fn(sendToAnalytics)
    .run();
});
