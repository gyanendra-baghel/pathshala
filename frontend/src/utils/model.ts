export const studentSchema = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Class", name: "class", type: "text", required: true },
  { label: "Roll Number", name: "rollNumber", type: "text", required: true },
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Adhaar Card", name: "adhaarCard", type: "text", required: true },
  { label: "Samagra ID", name: "samagraId", type: "text", required: true },
  { label: "Photo", name: "photo", type: "text" },
  {
    label: "Parent Adhaar Card",
    name: "fatherAdhaarNumber",
    type: "text",
    required: true,
  },
];
