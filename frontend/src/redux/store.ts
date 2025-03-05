import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import gradeReducer from "./features/gradeSlice";
import subjectReducer from "./features/subjectSlice";
import studentReducer from "./features/studentSlice";
import teacherReducer from "./features/teacherSlice";
import classroomReducer from "./features/teacherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    grade: gradeReducer,
    subject: subjectReducer,
    student: studentReducer,
    teacher: teacherReducer,
    classroom: classroomReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
