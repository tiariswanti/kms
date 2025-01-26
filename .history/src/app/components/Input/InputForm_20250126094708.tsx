interface InputFormProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  placeholder?: string;
  showWarning?: boolean; // Add showWarning prop
}

export default function InputForm({
  label,
  type,
  name,
  value,
  onChange,
  disabled,
  autoComplete,
  placeholder,
  showWarning = false, // Default to false if not provided
}: InputFormProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`w-full mt-1 p-2 border rounded-md ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
      {showWarning && (
        <p className="text-red-500 text-sm mt-1">This field is required.</p>
      )}
    </div>
  );
}
