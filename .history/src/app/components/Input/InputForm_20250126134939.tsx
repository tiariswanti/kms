import React, { useState } from "react";
import { IoIosAlert } from "react-icons/io";

interface InputFormProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  required?: boolean;
  errorAlert?: boolean;
}

export default function InputForm({
  label,
  type,
  name,
  value,
  onChange,
  disabled,
  required,
  errorAlert,
}: InputFormProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full mt-1 p-2 border rounded-md ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }}`}
      />
      {errorAlert && (
        <span className="flex items-center text-primary text-sm mt-2">
          <IoIosAlert className="mr-1" size={16} />
          <p>Please fill out this field!</p>
        </span>
      )}
    </div>
  );
}
