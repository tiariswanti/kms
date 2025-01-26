import { useState } from "react";

interface InputFormProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
}

export default function InputForm({
  label,
  type,
  name,
  value,
  onChange,
  disabled,
}: InputFormProps) {
  const [isTouched, setIsTouched] = useState(false);
  const [warning, setWarning] = useState<string>("");

  const handleBlur = () => {
    setIsTouched(true);
    if (!value) {
      setWarning("This field cannot be empty.");
    } else {
      setWarning("");
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        disabled={disabled}
        className={`w-full mt-1 p-2 border rounded-md ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
      {isTouched && warning && (
        <p className="text-red-500 text-sm mt-2">{warning}</p>
      )}
    </div>
  );
}
