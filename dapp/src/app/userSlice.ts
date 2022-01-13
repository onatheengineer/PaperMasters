import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';

interface userState {
  accounts: string[]
}

const initialState: userState = {
  accounts: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAccounts: (state, action: PayloadAction<string[]>) => {
      state.accounts = action.payload
    },
  }
})

export const { setUserAccounts} = userSlice.actions

export const selectUserAccounts = (state: RootState) => state.user.accounts

export default userSlice.reducer
