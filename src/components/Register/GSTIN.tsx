import React from "react";
import InputWithLabel from "../ui/Input/InputWithLabel";

// GSTIN validation function
const validateGSTIN = (gstin: string): boolean => {
  // GSTIN format: 2 digits state code + 10 PAN chars + 1 entity + 1 Z + 1 checksum
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin.toUpperCase());
};

interface GSTINProps {
  gstin: string;
  setGstin: React.Dispatch<React.SetStateAction<string>>;
  gstinError: string | null;
  setGstinError: React.Dispatch<React.SetStateAction<string | null>>;
}

const GSTINInput: React.FC<GSTINProps> = ({
  gstin,
  setGstin,
  gstinError,
  setGstinError,
}) => {
  const handleGstinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    setGstin(value);

    if (value && !validateGSTIN(value)) {
      setGstinError("Invalid GSTIN format.");
    } else {
      setGstinError(null);
    }
  };

  return (
    <div>
      <div className="py-0">
        <InputWithLabel
          id="gstin"
          type="text"
          value={gstin}
          onChange={handleGstinChange}
          label="GSTIN"
          required
          helperText={
            gstinError ? { type: "error", message: gstinError } : undefined
          }
        />
        <div className="text-xs text-gray-500 mt-1">
          Enter your 15-character GSTIN (e.g., 22ABCDE1234F1Z5)
        </div>
      </div>
    </div>
  );
};

export default GSTINInput;
