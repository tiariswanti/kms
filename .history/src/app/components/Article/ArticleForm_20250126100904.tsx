"use client";
import DropdownCategories from "@/app/components/Input/DropdownCategories";
import InputForm from "@/app/components/Input/InputForm";
import TagInput from "@/app/components/Input/TagInput";
import TextArea from "@/app/components/Input/TextArea";
import TextEditor from "@/app/components/Input/TextEditor";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import Button from "../Button/Button";
import { getCurrentDateTime } from "@/utils/date";
import { generateRandomId } from "@/utils/randomID";
import UploadFile from "../Input/UploadFile";
import { createSlug } from "@/utils/slug";

interface ArticleData {
  id?: string;
  title?: string;
  author?: string;
  image?: File | null;
  keywords?: string[];
  summary?: string;
  content?: string;
  references?: string;
  publishedAt?: string;
  urlToImage?: string;
  category?: string;
}

interface ArticleFormProps {
  initialData?: ArticleData;
  isEditing?: boolean;
}

export default function ArticleForm({
  initialData = {},
  isEditing = false,
}: ArticleFormProps) {
  const [title, setTitle] = useState<string>(initialData.title || "");
  const [author, setAuthor] = useState<string>(initialData.author || "");
  const [image, setImage] = useState<File | null>(initialData.image || null);
  const [keywords, setKeywords] = useState<string[]>(
    initialData.keywords || []
  );
  const [summary, setSummary] = useState<string>(initialData.summary || "");
  const [content, setContent] = useState<string>(initialData.content || "");
  const [references, setReferences] = useState<string>(
    initialData.references || ""
  );
  const [category, setCategory] = useState<string>(initialData.category || "");
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(
    initialData.urlToImage || ""
  );
  const [error, setError] = useState<string>(""); // State for error message
  const router = useRouter();
  const { mutate } = useSWRConfig(); // Get mutate function

  useEffect(() => {
    if (isEditing && initialData) {
      setTitle(initialData.title || "");
      setAuthor(initialData.author || "");
      setImage(initialData.image || null);
      setKeywords(initialData.keywords || []);
      setSummary(initialData.summary || "");
      setContent(initialData.content || "");
      setReferences(initialData.references || "");
      setImageUrl(initialData.urlToImage || "");
      setCategory(initialData.category || "");
    }
  }, [initialData, isEditing]);

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.urlToImage;
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    setError(""); // Clear any previous error

    // Validasi form untuk memastikan semua field yang wajib diisi terisi
    if (!title || !author || !category || !summary || !content || !references) {
      setError("All fields are required! Please fill in all fields.");
      setIsMutating(false);
      return;
    }

    try {
      let uploadedImageUrl = "";

      if (image) {
        uploadedImageUrl = await uploadImage(image);
      }

      const articleData = {
        id: isEditing ? initialData.id || "" : generateRandomId(),
        title,
        author,
        keywords,
        summary,
        content,
        references,
        category,
        publishedAt: getCurrentDateTime(),
        urlToImage: uploadedImageUrl || imageUrl,
      };

      const response = await fetch(
        isEditing
          ? `http://localhost:5000/articles/${initialData.id}`
          : "http://localhost:5000/articles",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articleData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);

      mutate(`http://localhost:5000/articles?_page=1&_limit=10`);

      if (isEditing) {
        router.push(`/manage-article/${data.id}/${createSlug(data.title)}`);
      } else {
        router.push("/manage-article");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsMutating(false);
    }
  }

  return (
    <div className="mx-auto sm:ml-64 sm:mr-8 sm:my-8 mt-8">
      <div className="mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl px-8 pt-10 pb-8 sm:mb-4"
        >
          {/* Input Title */}
          <div>
            <InputForm
              label="Title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error && title === "" && (
              <div className="text-red-500 text-sm mt-2 font-semibold">
                {error}
              </div>
            )}
          </div>

          {/* Input Author */}
          <div>
            <InputForm
              label="Author"
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            {error && author === "" && (
              <div className="text-red-500 text-sm mt-2 font-semibold">
                {error}
              </div>
            )}
          </div>

          {/* Dropdown Category */}
          <div className="relative z-10">
            <DropdownCategories
              selectedCategory={category}
              onChange={setCategory}
            />
            {error && category === "" && (
              <div className="text-red-500 text-sm mt-2 font-semibold">
                {error}
              </div>
            )}
          </div>

          {/* Input Summary */}
          <div>
            <TextArea
              label="Summary"
              name="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            {error && summary === "" && (
              <div className="text-red-500 text-sm mt-2 font-semibold">
                {error}
              </div>
            )}
          </div>

          {/* Tags Input */}
          <div>
            <TagInput value={keywords} onChange={(tags) => setKeywords(tags)} />
            {error && keywords.length === 0 && (
              <div className="text-red-500 text-sm mt-2 font-semibold">
                {error}
              </div>
            )}
          </div>

          {/* Text Editor */}
          <div>
            <TextEditor
              value={content}
              onChange={(value) => setContent(value)}
            />
            {error && content === "" && (
              <div className="text-red-500 text-sm mt-2 font-semibold">
                {error}
              </div>
            )}
          </div>

          {/* Input References */}
          <div>
            <TextArea
              label="References"
              name="references"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
            />
            {error && references === "" && (
              <div className="text-red-500 text-sm mt-2 font-semibold">
                {error}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <UploadFile
              label="Upload Cover Image"
              name="image"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            {error && image === null && (
              <div className="text-red-500 text-sm mt-2 font-semibold">
                {error}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              classname="bg-gray-300 rounded-lg text-gray-700 px-6 py-2"
              type="button"
              onClick={() => router.push("/manage-article")}
            >
              Cancel
            </Button>
            {!isMutating ? (
              <Button
                classname="bg-primary rounded-lg text-white px-7 py-2"
                type="submit"
              >
                Save
              </Button>
            ) : (
              <Button
                classname="bg-primary rounded-lg text-white px-7 py-2"
                type="button"
              >
                Saving...
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
