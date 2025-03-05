import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { Student } from "../../utils/types";

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

// Fetch All Students
export const fetchStudents = createAsyncThunk<Student[]>(
  "student/fetchStudents",
  async () => {
    const response = await API.get(`/students`);
    return response.data;
  }
);

// Add Student
export const addStudent = createAsyncThunk<Student, { name: string }>(
  "student/addStudent",
  async (student) => {
    const response = await API.post(`/students`, student);
    return response.data;
  }
);

// Update Student
export const updateStudent = createAsyncThunk<
  Student,
  { id: string; updatedStudent: Partial<Student> }
>("student/updateStudent", async ({ id, updatedStudent }) => {
  const response = await API.put(`/students/${id}`, updatedStudent);
  return response.data;
});

// Delete Student
export const deleteStudent = createAsyncThunk<string, string>(
  "student/deleteStudent",
  async (id) => {
    await API.delete(`/students/${id}`);
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
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchStudents.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.students = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch grades";
      })
      .addCase(
        addStudent.fulfilled,
        (state, action: PayloadAction<Student>) => {
          state.students.push(action.payload);
        }
      )
      .addCase(
        updateStudent.fulfilled,
        (state, action: PayloadAction<Student>) => {
          const index = state.students.findIndex(
            (student) => student.id === action.payload.id
          );
          if (index !== -1) {
            state.students[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteStudent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.students = state.students.filter(
            (student) => student.id !== action.payload
          );
        }
      );
  },
});

export default studentSlice.reducer;
