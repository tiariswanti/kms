interface InputFormProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string; // Tambahkan properti ini
  placeholder?: string;
}

export default function InputForm({
  label,
  type,
  name,
  value,
  onChange,
  disabled,
  placeholder,
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
        className={`w-full mt-1 p-2 border rounded-md ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
