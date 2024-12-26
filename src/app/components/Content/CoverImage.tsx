import Image from "next/image";

interface CoverImageProps {
  src: string;
  title: string;
}

export default function CoverImage({ src, title }: CoverImageProps) {
  return (
    <div className="md:flex md:items-center md:justify-center sm:mb-8 mb-4">
      <Image
        src={src}
        alt={title}
        className="mb-6 shadow-md rounded-lg bg-slate-50 aspect-[16/9] object-cover w-full md:max-w-lg sm:mb-0"
        width="600"
        height="1080"
      />
    </div>
  );
}
