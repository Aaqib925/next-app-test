import { useQuery } from '@tanstack/react-query';

import { Get } from '@/utils/apiService';

export const USER_QUERIES = {
  FETCH_SESSIONS: 'FETCH_SESSIONS',
};

const fetchUserSessionAction = async () => {
  return Get({
    url: '/api/v1/sessions',
  });
};

export const useFetchUserSessions = () => {
  return useQuery({
    queryKey: [USER_QUERIES.FETCH_SESSIONS],
    queryFn: fetchUserSessionAction,
  });
};
