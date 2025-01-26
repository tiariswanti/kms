interface SectionProps {
  label: string;
  name: string;
  text: string;
  isHtml?: boolean;
}

export default function Section({
  label,
  name,
  text,
  isHtml = false,
}: SectionProps) {
  return (
    <div className="sm:mb-6 mb-4" id={name}>
      <h2 className="sm:text-lg text-md md:text-xl font-semibold my-1 md:my-2">
        {label}
      </h2>
      {isHtml ? (
        <div
          className="section-content text-sm sm:text-lg"
          <p
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ) : (
        <p className="section-content text-sm sm:text-lg">{text}</p>
      )}
    </div>
  );
}
