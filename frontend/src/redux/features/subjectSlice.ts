import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { Subject } from "../../utils/types";

interface SubjectState {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
};

// Fetch All Subjects
export const fetchSubjects = createAsyncThunk<Subject[]>(
  "subject/fetchSubjects",
  async () => {
    const response = await API.get(`/subjects`);
    return response.data;
  }
);

// Add Subject
export const addSubject = createAsyncThunk<
  Subject,
  { name: string; description: string; gradeId: string }
>("subject/addSubject", async (grade) => {
  const response = await API.post(`/subjects`, grade);
  return response.data;
});

// Update Subject
export const updateSubject = createAsyncThunk<
  Subject,
  { id: string; updatedGrade: Partial<Subject> }
>("subject/updateSubject", async ({ id, updatedGrade }) => {
  const response = await API.put(`/subjects/${id}`, updatedGrade);
  return response.data;
});

// Create Slice
const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSubjects.fulfilled,
        (state, action: PayloadAction<Subject[]>) => {
          state.subjects = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch grades";
      })
      .addCase(
        addSubject.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          state.subjects.push(action.payload);
        }
      )
      .addCase(
        updateSubject.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          const index = state.subjects.findIndex(
            (subject) => subject.id === action.payload.id
          );
          if (index !== -1) {
            state.subjects[index] = action.payload;
          }
        }
      );
  },
});

export default subjectSlice.reducer;
