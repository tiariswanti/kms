import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Label from "./Label";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
  error?: boolean; // Tambahkan prop untuk error handling
}

export default function TextEditor({
  value,
  onChange,
  error,
}: TextEditorProps) {
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

  return (
    <div className="mb-6">
      <Label htmlFor="content">Content</Label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className={`custom-react-quill ${error ? "border-red-500 border" : ""}`} // Tambahkan styling untuk error
      />
      {error && (
        <p className="text-red-500 text-sm mt-2">Content cannot be empty!</p>
      )}
    </div>
  );
}
