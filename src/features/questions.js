import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
    name: "questions",
    initialState: {value: []},
    reducers: {
        updateQuestions: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { updateQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;