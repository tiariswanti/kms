import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center cursor-pointer py-2">
        <Image
          src="/logo.png"
          alt="Logo KNPK"
          width={40}
          height={40}
          className="cursor-pointer"
        />
        <span className="ml-4 text-white text-lg">KMS KNPK</span>
      </div>
    </Link>
  );
}
