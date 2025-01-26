import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Label from "./Label";
import ImageResize from "quill-image-resize-module-react";
import { useState } from "react";

Quill.register("modules/imageResize", ImageResize);

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const [error, setError] = useState(false); // State untuk validasi

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { align: [] },
        { indent: "-1" },
        { indent: "+1" },
        { list: "ordered" },
        { list: "bullet" },
      ],
      ["link", "image"],
    ],

    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const handleSubmit = () => {
    // Periksa jika konten kosong
    if (!value || value.trim() === "<p><br></p>") {
      setError(true);
      alert("Content cannot be empty!");
      return;
    }

    // Jika konten valid, reset error
    setError(false);
  };

  return (
    <div className="mb-6">
      <Label htmlFor="content">Content</Label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(content) => {
          onChange(content);
          if (content.trim() !== "<p><br></p>") {
            setError(false); // Reset error jika konten diperbarui
          }
        }}
        modules={modules}
        className={`custom-react-quill ${error ? "quill-error" : ""}`} // Tambahkan kelas error
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}
