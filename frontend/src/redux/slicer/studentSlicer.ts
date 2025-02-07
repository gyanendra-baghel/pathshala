const studentSlicer = createSlice({
  name: "student",
  initialState: {
    students: [],
    student: null,
  },
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setStudent: (state, action) => {
      state.student = action.payload;
    },
  },
});
