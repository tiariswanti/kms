"use client";

import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect } from "react";

const disableSidebar = ["/login"];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (!token && !pathname.includes("/login")) {
      router.push("/login");
    }
  }, [pathname, router]);

  return (
    <div className="flex min-h-screen">
      {!disableSidebar.includes(pathname) && <Sidebar />}

      <main className="flex-1">{children}</main>
    </div>
  );
}
