import { IoIosAlert } from "react-icons/io";
import Label from "./Label";

interface UploadFileProps {
  label: React.ReactNode;
  name: string;
  errorAlert?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadFile({
  label,
  name,
  errorAlert,
  onChange,
}: UploadFileProps) {
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
      {errorAlert && (
        <span className="flex items-center text-primary text-sm mt-2">
          <IoIosAlert className="mr-1" size={16} />
          <p>Please choose !</p>
        </span>
      )}
    </div>
  );
}
