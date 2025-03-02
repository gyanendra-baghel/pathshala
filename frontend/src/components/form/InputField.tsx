import { Field, ErrorMessage } from "formik";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  id?: string;
  placeholder?: string;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  id,
  placeholder,
  readOnly = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id || name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <Field
          as="textarea"
          id={id || name}
          name={name}
          placeholder={placeholder}
          className="mt-1 p-2 block w-full h-32 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          readOnly={readOnly}
        />
      ) : (
        <Field
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          readOnly={readOnly}
        />
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default InputField;
