import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({ className = '', children, ...props }) => {
  const baseStyles = 'w-full bg-slate-900/70 border-slate-700 border rounded-md p-3 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-200 ease-in-out appearance-none';

  return (
    <div className="relative">
      <select
        className={`${baseStyles} ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-300">
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default Select;