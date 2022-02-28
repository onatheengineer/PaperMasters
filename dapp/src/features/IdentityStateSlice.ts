import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";


interface IdentityStateSlice {
    unRegisteredNoIdentity: boolean,
    unRegisteredWithIdentity: boolean,
    registeredIdentity: boolean,
}

const initialState: IdentityStateSlice = {
    unRegisteredNoIdentity: false,
    unRegisteredWithIdentity: false,
    registeredIdentity: false,
};

const identityStateSlice = createSlice ({
    name: 'identityState',
    initialState,
    reducers: {
        noIdentity(state, action) {
            state.unRegisteredNoIdentity = action.payload
        },
        hasIdentity(state, action) {
            state.unRegisteredWithIdentity = action.payload
        },
        registered(state, action) {
            state.registeredIdentity = action.payload
        },
    },
});


//console.log(MintNFISlice);
export const { noIdentity, hasIdentity, registered } = identityStateSlice.actions;

export const unRegisteredNoIdentityAction= createAction<string>("UNREGISTERED_NO_IDENTITY_SAGA");
export const unRegisteredWithIdentityAction= createAction<string>("UNREGISTERED_WITH_IDENTITY_SAGA");
export const registeredIdentityAction= createAction<string>("REGISTERED_IDENTITY_SAGA");

export default identityStateSlice.reducer;


