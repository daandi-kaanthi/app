import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { useDarkMode } from "../../../hooks/useDarkMode";

interface HelperText {
  type: "error" | "success" | "loading";
  message: string;
}

interface InputWithLabelProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  textFieldDisabled?: boolean;
  className?: string;
  endButton?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
  };
  helperText?: HelperText;
  darkMode?: boolean; // new prop to explicitly toggle dark mode
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  id,
  type = "text",
  value,
  onChange,
  label,
  required = false,
  className = "",
  endButton,
  helperText,
  textFieldDisabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
   const darkMode = useDarkMode(); 

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const textFieldError = helperText?.type === "error";

  const displayHelperText = helperText ? (
    helperText.type === "loading" ? (
      <span className={`flex items-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        <CircularProgress size={16} className="mr-1" /> {helperText.message}
      </span>
    ) : (
      <span
        className={
          helperText.type === "success"
            ? darkMode
              ? "text-green-400"
              : "text-green-600"
            : darkMode
            ? "text-red-400"
            : "text-red-600"
        }
      >
        {helperText.message}
      </span>
    )
  ) : undefined;

  return (
    <div className="py-2">
      <TextField
        id={id}
        type={isPasswordField && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        required={required}
        label={label}
        disabled={textFieldDisabled}
        className={className}
        fullWidth
        error={textFieldError}
        helperText={displayHelperText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isPasswordField && (
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )}
              {endButton && (
                <Button
                  variant="contained"
                  onClick={endButton.onClick}
                  disabled={endButton.disabled}
                  size="small"
                  sx={{
                    ml: isPasswordField ? 1 : 0,
                    backgroundColor: darkMode ? "#2563eb" : undefined,
                    color: darkMode ? "#fff" : undefined,
                    "&:hover": {
                      backgroundColor: darkMode ? "#1d4ed8" : undefined,
                    },
                  }}
                >
                  {endButton.text}
                </Button>
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: darkMode ? "#1f2937" : "#fff", // dark gray / white
            color: darkMode ? "#f3f4f6" : "#111827", // text
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: darkMode ? "#4b5563" : "#6b7280",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: darkMode ? "#2563eb" : "#3b82f6",
            },
          },
          "& .MuiInputLabel-root": {
            color: darkMode ? "#d1d5db" : "#374151", // label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: darkMode ? "#3b82f6" : "#1d4ed8", // focused label
          },
        }}
      />
    </div>
  );
};

export default InputWithLabel;
