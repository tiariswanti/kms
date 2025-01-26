import { useState } from "react";
import Input from "./Input";

interface InputFormProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder?: string;
}

export default function InputForm({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}: InputFormProps) {
  const [showWarning, setShowWarning] = useState(false);

  const handleBlur = () => {
    if (!value) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        showWarning={showWarning}
      />
    </div>
  );
}
