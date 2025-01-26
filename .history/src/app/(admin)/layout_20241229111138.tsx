"use client";

import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";

const disableSidebar = ["/login"];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      if (!token && !pathname.includes("/login")) {
        return router.push("/login");
      }

      setLoading(false);
    };

    checkToken();
  }, [router, pathname]);

  if (loading) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {!disableSidebar.includes(pathname) && <Sidebar />}

      <main className="flex-1">{children}</main>
    </div>
  );
}
