
export const OtpEnum = {
    AUTH: "auth",
    RESET_PASSWORD: "reset_password"
} as const;

export type OtpEnum = typeof OtpEnum[keyof typeof OtpEnum];