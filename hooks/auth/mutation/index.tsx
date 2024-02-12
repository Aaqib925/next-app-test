import { useMutation } from '@tanstack/react-query';
import { SendOtpApiRequest } from 'hooks/auth/interface';

import { Post } from '@/utils/apiService';

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
