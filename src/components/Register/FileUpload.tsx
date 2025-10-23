import React, { useRef, useState } from "react";

interface HelperText {
  type: "error" | "success" | "loading";
  message: string;
}

interface FileUploadProps {
  label: string;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  required?: boolean;
  accept?: string; // e.g. ".jpg,.jpeg,.png,.pdf"
  helperText?: HelperText;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  file,
  setFile,
  required = false,
  accept = "*",
  helperText,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="py-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors
          ${isDragging 
            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-gray-700" 
            : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
          }
        `}
      >
        {file ? (
          <p className="text-green-700 dark:text-green-400">{file.name}</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Drag & drop a file here, or click to select
          </p>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />

      {helperText && (
        <p
          className={`text-xs mt-1 ${
            helperText.type === "error"
              ? "text-red-600 dark:text-red-400"
              : helperText.type === "success"
              ? "text-green-600 dark:text-green-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {helperText.message}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
