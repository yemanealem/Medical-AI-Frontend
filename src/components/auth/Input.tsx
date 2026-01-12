import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ElementType;
}

export function Input({ icon: Icon, ...props }: InputProps) {
  return (
    <div className="flex items-center gap-3 border rounded-xl px-4 py-3 bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
      <Icon className="w-5 h-5 text-gray-400" />
      <input
        {...props}
        className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-500"
      />
    </div>
  );
}
