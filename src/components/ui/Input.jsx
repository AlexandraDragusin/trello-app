// components/ui/Input.js
"use client";

export default function Input({ value, onChange, placeholder, className = "" }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 p-2 rounded w-64 bg-white text-gray-800 placeholder-gray-500 ${className}`}
    />
  );
}