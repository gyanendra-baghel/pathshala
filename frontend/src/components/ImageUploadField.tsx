import React, { useState } from "react";

interface ImageUploadFieldProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  name,
  onChange,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    onChange(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div>
      {/* <label className="block text-sm font-medium text-gray-700">{label}</label> */}
      <div className="mt-1 flex flex-col items-center">
        <div className="relative">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-lg">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-4"
        />
      </div>
    </div>
  );
};

export default ImageUploadField;
