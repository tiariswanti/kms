import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center items-center mb-8">
      <Image
        src="/logo.png"
        alt="Logo KNPK"
        width={45}
        height={45}
        className="mr-4"
      />
      <div>
        <div className="text-3xl font-semibold text-white">KNPK</div>
      </div>
    </div>
  );
}
