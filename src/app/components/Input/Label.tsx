interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

export default function Label({ children, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-md font-semibold text-gray-800"
    >
      {children}
    </label>
  );
}
