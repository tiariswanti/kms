interface InputProps {
  type: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  showWarning?: boolean;
}

export default function Input({
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  showWarning = false,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full block mt-2 text-gray-700 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-300 focus:outline-none p-2.5"
      />
      
    </div>
  );
}
