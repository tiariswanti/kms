import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import Dropdown from "./Dropdown";
import Label from "./Label";
import { IoIosAlert } from "react-icons/io";

interface Category {
  id: string;
  name: string;

}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DropdownCategories({
  selectedCategory,
  onChange,
}: {
  selectedCategory: string;
  onChange: (categoryName: string) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customValue, setCustomValue] = useState<string>("");

  const { data, error, mutate } = useSWR<Category[]>(
    "http://localhost:5000/categories",
    fetcher
  );

  useEffect(() => {
    if (error) {
      console.error("Error fetching categories:", error);
    }
  }, [error]);

  const options = data
    ? data.map((cat) => ({ label: cat.name, value: cat.name }))
    : [];

  // Function to add custom category
  const addCustomValue = async (value: string) => {
    const newCategory = {
      id: uuidv4(),
      name: value,
    };

    try {
      const response = await fetch("http://localhost:5000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) {
        throw new Error("Failed to add custom value");
      }

      mutate();
    } catch (error) {
      console.error("Error adding custom value:", error);
    }
  };

  return (
    <div className="mb-6">
      <Label htmlFor="category">Category</Label>
      <Dropdown
        options={options}
        selectedOption={selectedCategory}
        onSelect={(categoryName) => onChange(categoryName as string)}
        onAddOption={(newOption) => addCustomValue(newOption.label as string)} // Add new category
        placeholder="Select a category"
      />
      {error && (
        <span className="flex items-center text-primary text-sm mt-2">
          <IoIosAlert className="mr-1" size={16} />
          <p>Please fill out this field!</p>
        </span>
      )}
    </div>
  );
}
