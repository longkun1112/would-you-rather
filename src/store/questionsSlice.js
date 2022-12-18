import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const questionsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    receiveQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addAnswerToQuestion: (state, action) => {
      const { userId, questionId, selection } = action.payload;

      state.questions[questionId][selection].votes.push(userId);
    },
    addNewQuestion: (state, action) => {
      const newQuestion = action.payload;

      state.questions = {
        ...state.questions,
        [newQuestion.id]: newQuestion,
      };
    },
  },
});

export const { receiveQuestions, addAnswerToQuestion, addNewQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
