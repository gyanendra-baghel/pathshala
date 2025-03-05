import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { Teacher } from "../../utils/types";

interface TeacherState {
  teachers: Teacher[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: TeacherState = {
  teachers: [],
  loading: false,
  error: null,
};

// Fetch All Teacher
export const fetchTeachers = createAsyncThunk<Teacher[]>(
  "teacher/fetchTeachers",
  async () => {
    const response = await API.get(`/teachers`);
    return response.data;
  }
);

// Add Teacher
export const addTeacher = createAsyncThunk<Teacher, { name: string }>(
  "teacher/addTeacher",
  async (teacher) => {
    const response = await API.post(`/teachers`, teacher);
    return response.data;
  }
);

// Update Teacher
export const updateTeacher = createAsyncThunk<
  Teacher,
  { id: string; updatedTeacher: Partial<Teacher> }
>("teacher/updateTeacher", async ({ id, updatedTeacher }) => {
  const response = await API.put(`/teachers/${id}`, updatedTeacher);
  return response.data;
});

// Delete Teacher
export const deleteTeacher = createAsyncThunk<string, string>(
  "teacher/deleteTeacher",
  async (id) => {
    await API.delete(`/teachers/${id}`);
    return id;
  }
);

// Create Slice
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTeachers.fulfilled,
        (state, action: PayloadAction<Teacher[]>) => {
          state.teachers = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch grades";
      })
      .addCase(
        addTeacher.fulfilled,
        (state, action: PayloadAction<Teacher>) => {
          state.teachers.push(action.payload);
        }
      )
      .addCase(
        updateTeacher.fulfilled,
        (state, action: PayloadAction<Teacher>) => {
          const index = state.teachers.findIndex(
            (teacher) => teacher.id === action.payload.id
          );
          if (index !== -1) {
            state.teachers[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteTeacher.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.teachers = state.teachers.filter(
            (teacher) => teacher.id !== action.payload
          );
        }
      );
  },
});

export default studentSlice.reducer;
