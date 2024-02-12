export interface RegisterUserApiRequest {
  name: string;
  email: string;
  password: string;
  profile_image: File;
}

export interface LoginUserApiRequest {
  email: string;
  password: string;
}

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
  old_password: string;
  new_password: string;
}