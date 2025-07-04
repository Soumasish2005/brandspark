import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  const baseStyles = 'w-full bg-slate-900/70 border-slate-700 border rounded-md p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 ease-in-out';

  return (
    <input
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
};

export default Input;