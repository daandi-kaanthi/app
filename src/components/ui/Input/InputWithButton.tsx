import React from "react";
import InputWithLabel from "./InputWithLabel";

interface HelperText {
  type: "error" | "success" | "loading";
  message: string;
}

interface InputWithButtonProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  buttonText: string;
  onButtonClick: () => void;
  buttonDisabled?: boolean;
  required?: boolean;
  textFieldDisabled?: boolean;
  helperText?: HelperText;
}

const InputWithButton: React.FC<InputWithButtonProps> = ({
  id,
  type = "text",
  value,
  onChange,
  label,
  buttonText,
  onButtonClick,
  buttonDisabled = false,
  required = false,
  helperText,
  textFieldDisabled
}) => {
  return (
    <InputWithLabel
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      label={label}
      required={required}
      helperText={helperText}
      textFieldDisabled={textFieldDisabled}
      endButton={{
        text: buttonText,
        onClick: onButtonClick,
        disabled: buttonDisabled,
      }}
    />
  );
};

export default InputWithButton;
