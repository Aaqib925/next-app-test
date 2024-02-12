import { useMutation } from '@tanstack/react-query';
import { ChangePasswordApiRequest, ResetPasswordApiRequest, SendOtpApiRequest, VerifyOtpApiRequest } from 'hooks/auth/interface';

import { Post } from '@/utils/apiService';

const registerUserAction = async (body: any) => {
  return await Post({
    url: '/api/v1/register',
    body,
    isAuthorized: false,
    isFormData: true
  });
}

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (body: any) =>
      registerUserAction(body),
  });
};

const sendOtpAction = async (body: SendOtpApiRequest) => {
  return await Post({
    url: '/api/v1/otp/send',
    body,
    isAuthorized: false
  });
};

export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (body: SendOtpApiRequest) =>
      sendOtpAction(body),
  });
};

const verifyOtpAction = async (body: VerifyOtpApiRequest) => {
  return await Post({
    url: '/api/v1/otp/verify',
    body,
    isAuthorized: false
  })
} 

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (body: VerifyOtpApiRequest) =>
      verifyOtpAction(body),
  })
}

const resetPasswordAction = async (body: ResetPasswordApiRequest) => {
  return await Post({
    url: '/api/v1/forgot-password/reset-password',
    body,
    isAuthorized: false
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (body: ResetPasswordApiRequest) =>
      resetPasswordAction(body),
  })
}

const changePasswordAction = async (body: ChangePasswordApiRequest) => {
  return await Post({
    url: '/api/v1/change-password',
    body,
    isAuthorized: true
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (body: ChangePasswordApiRequest) =>
      changePasswordAction(body),
  })
}