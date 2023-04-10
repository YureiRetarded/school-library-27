import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: 0,
        access_level: 0,
        token: '',
    },
    reducers: {
        setId(state, action) {
            state.id = action.payload
        },
        setAccessLevel(state, action) {
            state.access_level = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
    }
})
export const {setId, setAccessLevel, setToken, setLogin} = userSlice.actions;
export default userSlice.reducer
