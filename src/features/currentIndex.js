import { createSlice } from '@reduxjs/toolkit'

export const currentIndexSlice = createSlice({
    name: 'currentIndex',
    initialState: { value: 0},
    reducers: {
        updateIndex: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { updateIndex } = currentIndexSlice.actions;
export default currentIndexSlice.reducer;