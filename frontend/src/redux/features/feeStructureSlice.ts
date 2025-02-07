import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FeeStructure } from "../../utils/types";
import API from "../../utils/api";

interface FeeStructureState {
  feeStructures: FeeStructure[];
  loading: boolean;
  error: string | null;
}

const initialState: FeeStructureState = {
  feeStructures: [],
  loading: false,
  error: null,
};

// Fetch All Fee Structures
export const fetchFeeStructures = createAsyncThunk<FeeStructure[]>(
  "feeStructure/fetchFeeStructures",
  async () => {
    const response = await API.get(`/fee-structures`);
    return response.data;
  }
);

// Add Fee Structure
export const addFeeStructure = createAsyncThunk<
  FeeStructure,
  { amount: number }
>("feeStructure/addFeeStructure", async (feeStructure) => {
  const response = await API.post(`/fee-structures`, feeStructure);
  return response.data;
});

// Update Fee Structure
export const updateFeeStructure = createAsyncThunk<
  FeeStructure,
  { id: string; updatedFee: Partial<FeeStructure> }
>("feeStructure/updateFeeStructure", async ({ id, updatedFee }) => {
  const response = await API.put(`/fee-structures/${id}`, updatedFee);
  return response.data;
});

const feeStructureSlice = createSlice({
  name: "feeStructure",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeStructures.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchFeeStructures.fulfilled,
        (state, action: PayloadAction<FeeStructure[]>) => {
          state.feeStructures = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchFeeStructures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch fee structures";
      })
      .addCase(
        addFeeStructure.fulfilled,
        (state, action: PayloadAction<FeeStructure>) => {
          state.feeStructures.push(action.payload);
        }
      )
      .addCase(
        updateFeeStructure.fulfilled,
        (state, action: PayloadAction<FeeStructure>) => {
          const index = state.feeStructures.findIndex(
            (fee) => fee.id === action.payload.id
          );
          if (index !== -1) {
            state.feeStructures[index] = action.payload;
          }
        }
      );
  },
});

export default feeStructureSlice.reducer;
