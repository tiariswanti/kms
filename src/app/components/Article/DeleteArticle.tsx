"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FloatingActionButton from "@/app/components/Button/FAB";
import { MdDelete } from "react-icons/md";

type Article = {
  id: string;
  title: string;
  author: string;
  urlToImage: string;
  description: string;
  content: string;
  keywords: string[];
  summary: string;
  references: string;
};

export default function DeleteArticle({ article }: { article: Article }) {
  const [modal, setModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  async function handleDelete(articleId: string) {
    setIsMutating(true);
    try {
      const response = await fetch(
        `http://localhost:5000/articles/${articleId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the article");
      }

      setSuccessModal(true);
      setTimeout(() => {
        router.push("/manage-article");
      }, 1500);
    } catch (error) {
      console.error("Error deleting article:", error);
    } finally {
      setIsMutating(false);
      setModal(false);
    }
  }

  function toggleModal() {
    setModal((prev) => !prev);
  }

  return (
    <div>
      <FloatingActionButton
        icon={<MdDelete className="w-6 h-6 md:w-8 md:h-8" />}
        onClick={toggleModal}
        color="bg-primary"
        textColor="text-white"
      />
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">
              Are you sure you want to delete this article?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                onClick={toggleModal}
              >
                Close
              </button>
              {!isMutating ? (
                <button
                  type="button"
                  onClick={() => handleDelete(article.id)}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-tertiary transition"
                >
                  Delete
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-primary text-white px-4 py-2 rounded cursor-not-allowed"
                  disabled
                >
                  Deleting...
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {successModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">Delete successful!</h3>
          </div>
        </div>
      )}
    </div>
  );
}
