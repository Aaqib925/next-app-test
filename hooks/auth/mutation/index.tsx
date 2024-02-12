import { useMutation } from '@tanstack/react-query';
import { ResetPasswordApiRequest, SendOtpApiRequest, VerifyOtpApiRequest } from 'hooks/auth/interface';

import { Post } from '@/utils/apiService';

const sendOtpAction = async (body: SendOtpApiRequest) => {
  return await Post({
    url: '/api/v1/otp/forgot-password',
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
    url: '/api/v1/otp/verify-forgot-password',
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
    url: '/api/v1/user/reset-password',
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