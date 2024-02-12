import React from 'react';

import { cn } from '@/lib/utils';

interface TextInputProps {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string | number;
  onBlur?: (
    e?:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) => void;
  onChange?: (
    e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  error?: string;
  isTextArea?: boolean;
  readOnly?: boolean;
  errorStyles?: string;
  customInputStyles?: string;
}

const TextInput = ({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  isTextArea = false,
  readOnly = false,
  errorStyles,
  customInputStyles = '',
}: TextInputProps) => {
  const labelId = label?.split(' ').join(',');

  return (
    <div className='col-span-6 sm:col-span-3 w-full'>
      <label
        htmlFor={labelId}
        className='col-span-6 sm:col-span-3 block text-sm font-medium text-gray-700'
      >
        {label}
      </label>

      {!isTextArea ? (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          defaultValue={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${customInputStyles}`}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${customInputStyles}`}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          readOnly={readOnly}
        />
      )}

      {error && (
        <p
          className={cn(
            errorStyles ? errorStyles : '-bottom-5',
            ' text-xs italic text-red-500 '
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default React.memo(TextInput);
