import React from 'react';

import { cn } from '@/lib/utils';

import Loader from '@/components/loader/loader';

interface AppButtonProps {
  title: string;
  onClick?: () => void;
  btnStyles?: string;
  isLoading?: boolean;
}

const AppButton = ({
  title,
  onClick,
  isLoading = false,
  btnStyles,
}: AppButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'nline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500',
        btnStyles
      )}
    >
      {isLoading ? <Loader /> : title}
    </button>
  );
};

export default React.memo(AppButton);
