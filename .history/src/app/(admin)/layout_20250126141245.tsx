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

  // Set the page title based on the current pathname
  useEffect(() => {
    const pageTitles: { [key: string]: string } = {
      "/dashboard": "Dashboard",
      "/manage-article": "Manage Articles",
      "/login": "Login",
      "/edit-article": "Edit Article",
      "/change-password": "Change Password",
      "/add-article": "Add Article",
      // Add more paths and their respective titles here
    };

    document.title = pageTitles[pathname] || "My Website"; // Fallback to a default title
  }, [pathname]);

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
