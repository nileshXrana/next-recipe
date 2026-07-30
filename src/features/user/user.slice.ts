import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        loading: false,
        error: null,
    } as any,
    reducers: {},
    
})

export default userSlice.reducer;