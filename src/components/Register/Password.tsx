import React from "react";
import InputWithLabel from "../ui/Input/InputWithLabel";

// Password strength evaluation function
const evaluatePasswordStrength = (
  password: string
): "Weak" | "Medium" | "Strong" => {
  let strength: "Weak" | "Medium" | "Strong" = "Weak";
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+{}[\]:;<>,.?/~\\-]/.test(password);
  const isLongEnough = password.length >= 8;

  if (
    isLongEnough &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  ) {
    strength = "Strong";
  } else if (isLongEnough && (hasUpperCase || hasLowerCase) && hasNumbers) {
    strength = "Medium";
  }

  return strength;
};

interface PasswordProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordStrength: "Weak" | "Medium" | "Strong" | "" | null;
  setPasswordStrength: React.Dispatch<
    React.SetStateAction<"Weak" | "Medium" | "Strong" | "" | null>
  >;
  passwordMatchError: string | null;
  setPasswordMatchError: React.Dispatch<React.SetStateAction<string | null>>;
}

const Password: React.FC<PasswordProps> = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  passwordStrength,
  setPasswordStrength,
  passwordMatchError,
  setPasswordMatchError,
}) => {
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError(null);
    }

    const strength = evaluatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password && password !== newConfirmPassword) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError(null);
    }
  };

  const getStrengthHelperText = () => {
    if (!passwordStrength) return undefined;

    const colorType: "success" | "loading" | "error" =
      passwordStrength === "Strong"
        ? "success"
        : passwordStrength === "Medium"
        ? "loading"
        : "error";

    return { type: colorType, message: `Password strength: ${passwordStrength}` };
  };

  return (
    <div>
      {/* Password */}
      <div className="py-0">
        <InputWithLabel
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          required
          helperText={getStrengthHelperText()}
        />
        <div className="text-xs text-gray-500 mt-1">
          Suggestion: Make a strong password with special symbols (@, !, #, etc.)
        </div>
      </div>

      {/* Confirm Password (only for signup) */}
        <div className="py-0 mt-2">
          <InputWithLabel
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            label="Confirm Password"
            required
            helperText={
              passwordMatchError
                ? { type: "error", message: passwordMatchError }
                : undefined
            }
          />
        </div>
    </div>
  );
};

export default Password;
