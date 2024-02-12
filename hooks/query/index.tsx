import { useQuery } from '@tanstack/react-query';

import { UserTokenType } from '@/lib/auth';

import SignIn from '@/app/auth/signin/page';
import { Get } from '@/utils/apiService';

export const FETCH_SCREEN = {
  FETCH_PAGE: 'FETCH_PAGE',
};

const fetchAllPageAction = async () => {
  return Get({
    url: '/',
  });
};

export const useFetchHomePage = (token?: UserTokenType) => {
  return useQuery<SignIn[]>({
    queryKey: [FETCH_SCREEN.FETCH_PAGE, token],
    queryFn: fetchAllPageAction,
    enabled: !!token,
  });
};
