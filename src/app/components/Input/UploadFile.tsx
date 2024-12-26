import Label from "./Label";

interface UploadFileProps {
  label: React.ReactNode;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadFile({ label, name, onChange }: UploadFileProps) {
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <input
        className="w-full block mt-2 text-gray-700 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-300 focus:outline-none p-2.5"
        name={name}
        onChange={onChange}
        type="file"
        accept="image/*"
      />
    </div>
  );
}
