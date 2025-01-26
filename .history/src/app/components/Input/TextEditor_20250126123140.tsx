import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Label from "./Label";
import ImageResize from "quill-image-resize-module-react";
import { IoIosAlert } from "react-icons/io";

Quill.register("modules/imageResize", ImageResize);

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
  error?: String;
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
        className="custom-react-quill"
      />
      {error && (
        <span className="flex items-center text-primary text-sm mt-2">
          <IoIosAlert className="mr-2" size={18} />
          <p>Please fill out this field!</p>
        </span>
      )}
    </div>
  );
}
