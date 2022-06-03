import type {
  CloseAllToastsOptions,
  ToastId,
  UseToastOptions,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetToast } from './ToastSlice';

interface UseCustomToastInterface {
  (options?: UseToastOptions | undefined): string | number | undefined;
  close: (id: ToastId) => void;
  closeAll: (options?: CloseAllToastsOptions | undefined) => void;
  update(id: ToastId, options: any): void;
  isActive: (id: ToastId) => boolean | undefined;
}

export const toastConfig: UseToastOptions = {
  isClosable: true,
  variant: 'subtle',
  position: 'bottom',
};

export function useGlobalToast() {
  const dispatch = useAppDispatch();
  const toast = useToast(toastConfig);
  const toastOptions = useAppSelector((state) => state.toast.toastOptions);

  useEffect(() => {
    if (toastOptions !== null) {
      const { title, status } = toastOptions;
      toast({ title, status });
      dispatch(resetToast());
    }
  }, [toastOptions]);
  return null;
}
