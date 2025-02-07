import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { Grade } from "../../utils/types";

interface GradeState {
  grades: Grade[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: GradeState = {
  grades: [],
  loading: false,
  error: null,
};

// Fetch All Grades
export const fetchGrades = createAsyncThunk<Grade[]>(
  "grade/fetchGrades",
  async () => {
    const response = await API.get(`/grades`);
    return response.data;
  }
);

// Add Grade
export const addGrade = createAsyncThunk<Grade, { name: string }>(
  "grade/addGrade",
  async (grade) => {
    const response = await API.post(`/grades`, grade);
    return response.data;
  }
);

// Update Grade
export const updateGrade = createAsyncThunk<
  Grade,
  { id: string; updatedGrade: Partial<Grade> }
>("grade/updateGrade", async ({ id, updatedGrade }) => {
  const response = await API.put(`/grades/${id}`, updatedGrade);
  return response.data;
});

// Create Slice
const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchGrades.fulfilled,
        (state, action: PayloadAction<Grade[]>) => {
          state.grades = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch grades";
      })
      .addCase(addGrade.fulfilled, (state, action: PayloadAction<Grade>) => {
        state.grades.push(action.payload);
      })
      .addCase(updateGrade.fulfilled, (state, action: PayloadAction<Grade>) => {
        const index = state.grades.findIndex(
          (grade) => grade.id === action.payload.id
        );
        if (index !== -1) {
          state.grades[index] = action.payload;
        }
      });
  },
});

export default gradeSlice.reducer;
