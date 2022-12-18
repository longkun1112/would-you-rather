import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    receiveUsers: (state, action) => {
      state.users = action.payload;
    },
    addAnswerToUser: (state, action) => {
      const { userId, questionId, selection } = action.payload;

      state.users[userId].answers = {
        ...state.users[userId].answers,
        [questionId]: selection,
      };
    },
    addQuestionToUser: (state, action) => {
      const { userId, questionId } = action.payload;

      state.users[userId].questions.push(questionId);
    },
  },
});

export const { receiveUsers, addAnswerToUser, addQuestionToUser } =
  usersSlice.actions;

export default usersSlice.reducer;
