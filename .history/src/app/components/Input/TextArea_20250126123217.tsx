import { useRef } from "react";
import Label from "./Label";
import { IoIosAlert } from "react-icons/io";

interface TextAreaProps {
  label: React.ReactNode;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string; // Error message prop
}

export default function TextArea({
  label,
  name,
  value,
  onChange,
  error, // Receive error as a prop
}: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const autoResizeTextArea = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    }
  };

  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <textarea
        ref={textAreaRef}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
          autoResizeTextArea();
        }}
        autoComplete="none"
        // Remove the required attribute to prevent default browser validation
        className={`w-full block mt-2 text-gray-700 text-sm bg-gray-50 border rounded-lg focus:outline-none p-2.5`}
        style={{ resize: "none", overflowY: "hidden" }}
      />
       {error && (
              <span className="flex items-center text-primary text-sm mt-2">
                <IoIosAlert className="mr-1" size={16} />
                <p>Please fill out this field!</p>
              </span>
            )}
      {/* Display custom error message */}
    </div>
  );
}
