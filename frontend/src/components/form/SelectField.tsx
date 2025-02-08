import { Field, ErrorMessage } from "formik";

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  readOnly?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  readOnly = false,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        as="select"
        name={name}
        id={name}
        className="mt-1 block w-full p-2 border rounded-md"
        disabled={readOnly}
      >
        <option value="" label="Select an option" />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default SelectField;
