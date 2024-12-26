import React, { useState } from "react";
import useSWR from "swr";
import Label from "../Input/Label";
import Dropdown from "../Input/Dropdown";

interface Category {
  id: string;
  name: string;
}

interface SelectCategoryProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SelectCategory({
  selectedCategory,
  onChange,
}: SelectCategoryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, error } = useSWR<Category[]>(
    "http://localhost:5000/categories", //
    fetcher
  );

  if (error) {
    console.error("Error fetching categories:", error);
  }

  // Add "None" option to allow removing category filter
  const options = data
    ? [
        { label: "None", value: "" },
        ...data.map((cat: Category) => ({ label: cat.name, value: cat.name })), // Use name as value
      ]
    : [{ label: "None", value: "" }];

  const handleSelect = (newValue: string | number) => {
    onChange(newValue.toString());
    setIsOpen(false);
  };

  return (
    <div className="z-20 flex flex-col items-center mb-6 mt-6">
      <Label htmlFor="category">Category</Label>
      <Dropdown
        options={options}
        selectedOption={selectedCategory}
        onSelect={handleSelect}
        placeholder="Select a category"
        dropdownButton="w-full border bg-gray-50 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none p-3 cursor-pointer flex justify-between items-center"
      />
    </div>
  );
}
