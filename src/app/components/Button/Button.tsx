import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  classname?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  classname = "bg-primary rounded-full text-white px-4 py-2",
  type = "button",
  onClick,
  icon,
}: ButtonProps) {
  return (
    <button className={`${classname}`} type={type} onClick={onClick}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
