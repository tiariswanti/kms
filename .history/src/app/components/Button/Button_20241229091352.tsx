import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  classname?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean; // Added prop for disabling the button
}

export default function Button({
  children,
  classname = "bg-primary rounded-full text-white px-4 py-2",
  type = "button",
  onClick,
  icon,
  disabled = false, // Default to false
}: ButtonProps) {
  return (
    <button
      className={`${classname} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type={type}
      onClick={!disabled ? onClick : undefined} // Prevent clicks when disabled
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
