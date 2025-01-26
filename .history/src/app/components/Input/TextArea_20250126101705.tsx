import { useRef } from "react";
import Label from "./Label";

interface TextAreaProps {
  label: React.ReactNode;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
  label,
  name,
  value,
  onChange,
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
        required
        className="w-full block mt-2 text-gray-700 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none p-2.5"
        style={{ resize: "none", overflowY: "hidden" }}
      />
    </div>
  );
}
