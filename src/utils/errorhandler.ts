import { signOut } from 'next-auth/react';

import logger from '@/lib/logger';

import StatusCodes from '@/constant/StatusCodes';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleFetchError = async (res: any) => {
  if (
    res.status >= StatusCodes.BAD_REQUEST &&
    res.status < StatusCodes.CONNECTION_TIMED_OUT
  ) {
    logger(res, 'Error while fetching');
    const response = await res.clone().json();
    const errRes = {
      ...response,
      status: res.status,
    };
    if (res.status === StatusCodes.UNAUTHORIZED) {
      // localStorage.clear();
      signOut();
    } else {
      //   errorToaster(`${response.Message || "Your Session has been Expired!"}`);
    }
    throw errRes;
  }
  return res.json();
};
