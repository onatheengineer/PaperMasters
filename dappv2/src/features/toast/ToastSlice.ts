/* eslint-disable no-param-reassign */
import type { UseToastOptions } from '@chakra-ui/react';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

export const toastConfig: UseToastOptions = {
  isClosable: true,
  variant: 'subtle',
  position: 'bottom',
};

export interface ToastOptions {
  title: string;
  status: 'error' | 'info' | 'warning' | 'success' | undefined;
}

export type ToastState = {
  toastOptions: ToastOptions | null;
};

const createToastSlice = (initialState: ToastState) =>
  createSlice({
    name: 'toast',
    initialState,
    reducers: {
      showToast(state, action: PayloadAction<ToastOptions>) {
        state.toastOptions = action.payload;
      },
      resetToast(state) {
        state.toastOptions = null;
      },
    },
  });

export const startToast = createAction<ToastOptions>('startToast');

const toastSlice = createToastSlice({ toastOptions: null });
export const { showToast, resetToast } = toastSlice.actions;
export default toastSlice.reducer;
