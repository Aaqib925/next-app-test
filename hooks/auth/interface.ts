export interface SendOtpApiRequest {
  email: string;
}

export interface VerifyOtpApiRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordApiRequest {
  email: string;
  password: string;
}

export interface ChangePasswordApiRequest {
  oldPassword: string;
  newPassword: string;
}