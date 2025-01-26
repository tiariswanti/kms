import { useState } from "react";
import Input from "./Input"; // Import Input component

export default function InputForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [showTitleWarning, setShowTitleWarning] = useState(false);
  const [showAuthorWarning, setShowAuthorWarning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the title and author are filled
    if (!title) {
      setShowTitleWarning(true);
    } else {
      setShowTitleWarning(false);
    }

    if (!author) {
      setShowAuthorWarning(true);
    } else {
      setShowAuthorWarning(false);
    }

    // If everything is valid, proceed with form submission logic (e.g., sending data)
    if (title && author) {
      console.log("Form submitted!");
      // Handle your submit logic here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <Input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          showWarning={showTitleWarning}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700"
        >
          Author
        </label>
        <Input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          showWarning={showAuthorWarning}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
