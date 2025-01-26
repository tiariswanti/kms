import React, { useState } from "react";

interface InputFormProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  required?: boolean;
  error?: string; // Properti untuk menampilkan pesan error
}

export default function InputForm({
  label,
  type,
  name,
  value,
  onChange,
  disabled,
  required,
  error,
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
      {error && <p className="text-sm text-primary mt-1">{error}</p>}{" "}
      {/* Menampilkan pesan error */}
    </div>
  );
}
