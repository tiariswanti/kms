import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center items-center mb-10">
      <Image
        src="/logo.png"
        alt="Logo KNPK"
        width={100}
        height={100}
        className="mr-8"
      />
      <div className="w-px h-20 bg-gray-800 mr-8"></div>
      <div>
        <div className="text-xl font-semibold text-gray-800">
          Knowledge Management System
        </div>
      </div>
    </div>
  );
}
