import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    token: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { user, token } = action.payload;

            return {
                ...state,
                user: user,
                token: token,
            };
        },
        editUser: (state, action) => {
            const user = action.payload;

            return {
                ...state,
                user: user,
            };
        },

        logout: () => {
            return {
                initialState,
            };
        },
        deleteUser: () => {
            return {};
        },
    },
});

export const { login, logout, editUser, deleteUser } = authSlice.actions;

export default authSlice.reducer;
