import React, { useState } from "react";
import Input from "./Input";
import Button from "../Button/Button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface Option {
  value: string | number;
  label: string | number;
}

interface DropdownProps {
  options: Option[];
  selectedOption: string | number;
  onSelect: (option: string | number) => void;
  onAddOption?: (newOption: Option) => void;
  placeholder?: string;
  dropdownButton?: string;
}

export default function Dropdown({
  options,
  selectedOption,
  onSelect,
  onAddOption,
  placeholder = "Select an option",
  dropdownButton = "w-full border bg-gray-50 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none p-3 cursor-pointer flex justify-between items-center",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newOption, setNewOption] = useState<string | number | "">("");

  const handleSelect = (option: string | number) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleAddOption = () => {
    if (newOption !== "" && onAddOption) {
      const newOptionObject: Option = {
        value: newOption,
        label: newOption,
      };
      onAddOption(newOptionObject);
      setNewOption("");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <Button onClick={() => setIsOpen(!isOpen)} classname={dropdownButton}>
        {selectedOption || placeholder}
        <span className="ml-2">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </Button>
      {isOpen && (
        <div className="absolute w-full mt-1 border border-gray-300 rounded-lg bg-white shadow-sm">
          <ul className="max-h-60 overflow-y-auto">
            {options.length > 0 ? (
              options.map((option) => (
                <li
                  key={option.value}
                  className="py-2 px-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="py-2 px-3 text-gray-500">No options available</li>
            )}
            {onAddOption && (
              <li className="flex py-2 px-3">
                <Input
                  type="text"
                  name="new-option"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder={`Add new ${placeholder.toLowerCase()}`}
                />
                <Button
                  onClick={handleAddOption}
                  classname="bg-primary text-white px-3 rounded-md ml-2 mt-2"
                >
                  Add
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
