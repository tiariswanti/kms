import React from "react";
import Button from "./Button";

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
  textColor?: string;
  size?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  color = "bg-gray-300",
  textColor = "text-gray-700",
  size = "w-14 h-14 md:w-16 md:h-16",
}) => {
  return (
    <Button
      classname={`rounded-full shadow-md ${color} ${textColor} ${size}`}
      onClick={onClick}
    >
      <span className="flex items-center justify-center p-2">{icon}</span>
    </Button>
  );
};

export default FloatingActionButton;
