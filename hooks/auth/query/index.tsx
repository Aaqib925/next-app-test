import { useQuery } from '@tanstack/react-query';

import { Get } from '@/utils/apiService';

export const FETCH_AUTH = {
  FETCH_USER_PROFILE: 'FETCH_USER_PROFILE',
};

const fetchUserProfile = async () => {
  return Get({
    url: '/api/v1/profile',
  });
};

export const useFetchUserProfile = () => {
  return useQuery({
    queryKey: [FETCH_AUTH.FETCH_USER_PROFILE],
    queryFn: fetchUserProfile,
  });
};
