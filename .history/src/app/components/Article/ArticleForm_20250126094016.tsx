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

  const [formErrors, setFormErrors] = useState({
    title: false,
    author: false,
    category: false,
    content: false,
  });

  const router = useRouter();
  const { mutate } = useSWRConfig();

  const validateForm = () => {
    const errors = {
      title: !title.trim(),
      author: !author.trim(),
      category: !category.trim(),
      content: !content.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true); // returns false if there are errors
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Please fill in all required fields");
      return; // Prevent submission if there are errors
    }

    setIsMutating(true);
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
  };

  return (
    <div className="mx-auto sm:ml-64 sm:mr-8 sm:my-8 mt-8">
      <div className="mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl px-8 pt-10 pb-8 sm:mb-4"
        >
          <InputForm
            label="Title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            showWarning={formErrors.title}
          />
          <InputForm
            label="Author"
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            showWarning={formErrors.author}
          />
          <div className="relative z-10">
            <DropdownCategories
              selectedCategory={category}
              onChange={setCategory}
            />
          </div>
          <TextArea
            label="Summary"
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <TagInput value={keywords} onChange={(tags) => setKeywords(tags)} />
          <TextEditor value={content} onChange={(value) => setContent(value)} />
          <TextArea
            label="References"
            name="references"
            value={references}
            onChange={(e) => setReferences(e.target.value)}
          />
          <UploadFile
            label="Upload Cover Image"
            name="image"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />

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
