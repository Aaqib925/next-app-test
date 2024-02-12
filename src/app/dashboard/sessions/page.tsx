/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useDeleteAllSessions, useDeleteSpecificUserSession } from 'hooks/user/mutation';
import { useFetchUserSessions } from 'hooks/user/query';
import React from 'react';

import Slide from '@/components/sidebar/Slide';


const SessionPage = () => {
  const { data: fetchedUserSessions } = useFetchUserSessions();

  const {mutate: deleteSpecificUserSessionAction} =useDeleteSpecificUserSession()
  const {mutate: deleteAllSessions} =useDeleteAllSessions()
  return (
    <>
      <div>
        <Slide />
        <div className='ml-64'>
          <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'></div>
          <div className='max-w-screen-xl mx-auto px-4 md:px-8'>
            <div className='items-start justify-between md:flex'>
              <div className='max-w-lg'>
                <h3 className='text-gray-800 text-xl font-bold sm:text-2xl'>
                  See all your sessions
                </h3>
                <p className='text-gray-600 mt-2'>
                  Logging out from a session will remove all sessions except the current one.
                </p>
              </div>
              <div className='mt-3 md:mt-0'>
                <div
                  onClick={() => deleteAllSessions()}
                  className='inline-block px-4 py-2 text-white duration-150 font-medium bg-red-600 rounded-lg hover:bg-red-500 active:bg-red-700 md:text-sm'
                >
                  Logout from all
                </div>
              </div>
            </div>
            <div className='mt-12 shadow-sm border rounded-lg overflow-x-auto'>
              <table className='w-full table-auto text-sm text-left'>
                <thead className='bg-gray-50 text-gray-600 font-medium border-b'>
                  <tr>
                    <th className='py-3 px-6'>Session Id</th>
                    <th className='py-3 px-6'>Created On</th>
                    <th className='py-3 px-6'>Last Logged In</th>
                    <th className='py-3 px-6'></th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 divide-y'>
                  {fetchedUserSessions?.map((item: any, idx: any) => (
                    <tr key={idx}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item?.id}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item?.created_at ? `${new Date(item?.created_at).toDateString()} ${new Date(item?.created_at).toLocaleTimeString()}` : 'Never'}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item?.last_used_at ? `${new Date(item?.last_used_at).toDateString()} ${new Date(item?.last_used_at).toLocaleTimeString()}` : 'Never'}
                      </td>
                      <td className='text-right px-6 whitespace-nowrap'>
                        {item?.is_current_token ? (
                          <span className='text-xs text-green-600 font-medium bg-green-100 rounded-full px-2 py-1'>
                            Current Session
                          </span>
                        ) : (
                          <button onClick={() => deleteSpecificUserSessionAction({session_id: item?.id})} className='cursor-pointer py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg'>
                            Logout
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionPage;
