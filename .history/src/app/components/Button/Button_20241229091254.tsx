import React, { useState } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  classname?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: React.ReactNode;
  disableAfterClick?: boolean; // New prop to control disabling behavior
}

export default function Button({
  children,
  classname = "bg-primary rounded-full text-white px-4 py-2",
  type = "button",
  onClick,
  icon,
  disableAfterClick = false,
}: ButtonProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (disableAfterClick) {
      setIsDisabled(true);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${classname} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
