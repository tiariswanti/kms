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
  const [error, setError] = useState();
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
        className={error ? "ql-error" : ""}
      />
    </div>
  );
}
