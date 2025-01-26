import { useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import Label from "./Label";
import Button from "../Button/Button";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInput({ value, onChange }: TagInputProps) {
  const [tags, setTags] = useState<string[]>(value);
  const [maxTags] = useState<number>(10);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setTags(value);
  }, [value]);

  const countTags = (): number => {
    return maxTags - tags.length;
  };

  const createTag = (): JSX.Element[] => {
    return tags.map((tag, index) => (
      <li
        className="flex items-center m-1 rounded-lg bg-gray-200 px-2 py-1.5 border"
        key={index}
      >
        {tag}
        <div
          className="bg-gray-300 rounded-full flex justify-center items-center w-6 h-6 cursor-pointer ml-2"
          onClick={() => removeTag(tag)}
        >
          <XIcon className="w-4 h-4 text-gray-500" />
        </div>
      </li>
    ));
  };

  const removeTag = (tagToRemove: string): void => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTags = inputValue.split(",").map((tag) => tag.trim());
      const filteredNewTags = newTags.filter(
        (tag) => tag.length > 1 && !tags.includes(tag)
      );
      if (tags.length + filteredNewTags.length <= maxTags) {
        const updatedTags = [...tags, ...filteredNewTags];
        setTags(updatedTags);
        onChange(updatedTags);
        setInputValue("");
      }
    }
  };

  const removeAllTags = (): void => {
    setTags([]);
    onChange([]);
  };

  return (
    <div>
      <Label htmlFor="keywords">Key Words</Label>
      <div className="content">
        <p className="text-sm -mt-2 text-gray-700">
          Press enter or add a comma after each tag
        </p>
        <div className="text-gray-700 text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 mt-2">
          <ul className="flex flex-wrap">
            {createTag()}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyPress}
              className="flex-1 px-2 border-none outline-none text-base"
              spellCheck="false"
            />
          </ul>
        </div>
      </div>
      <div className="details">
        <p className="text-sm mt-1 mb-2 text-gray-700">
          <span>{countTags()}</span> tags are remaining
        </p>

        <Button
          type="button"
          onClick={removeAllTags}
          classname="bg-gray-500 rounded-lg text-white text-sm px-4 py-1.5 mb-6"
        >
          Remove All
        </Button>
      </div>
    </div>
  );
}
