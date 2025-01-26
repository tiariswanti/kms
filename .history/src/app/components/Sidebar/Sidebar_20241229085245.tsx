import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BsList, BsX } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { CgAddR } from "react-icons/cg";
import { ImFileText } from "react-icons/im";
import { MdOutlineSettings } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Logo from "./Logo";
import { logout } from "@/utils/auth";

const sidebarItems = [
  { href: "/dashboard", icon: <RxDashboard size={20} />, label: "Dashboard" },
  { href: "/add-article", icon: <CgAddR size={20} />, label: "Add Article" },
  {
    href: "/manage-article",
    icon: <ImFileText size={18} />,
    label: "Manage Article",
  },
  {
    href: "/change-password",
    icon: <MdOutlineSettings size={20} />,
    label: "Change Password",
  },
  { href: "#", icon: <FiLogOut size={20} />, label: "Log Out" },
];

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex bg-primary h-full">
      {/* Sidebar for larger screens */}
      <aside
        className={`hidden sm:block fixed top-0 left-0 z-40 sm:w-50 h-screen bg-primary p-6 ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        {/* Content of the sidebar for larger screens */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <Logo />
            <ul className="space-y-2 font-medium">
              {sidebarItems.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <button
                    className={`w-full flex items-center p-2 text-white rounded-lg hover:bg-secondary ${
                      pathname === item.href ? "bg-secondary" : "bg-none"
                    } group`}
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.icon}
                    <span className="ms-3">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom section */}
          <div className="mb-6">
            <ul className="space-y-2 font-medium">
              {sidebarItems.slice(3).map((item) => (
                <li key={item.href}>
                  <button
                    className={`w-full flex items-center p-2 text-white rounded-lg hover:bg-secondary ${
                      pathname === item.href ? "bg-secondary" : "bg-none"
                    } group`}
                    onClick={() =>
                      item.label === "Log Out"
                        ? handleLogout()
                        : handleNavigation(item.href)
                    }
                  >
                    {item.icon}
                    <span className="ms-3">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Toggle button */}
      <div
        className="sm:hidden cursor-pointer w-full bg-primary p-2 fixed top-0 z-20"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <BsX className="h-8 w-8 text-white" />
        ) : (
          <BsList className="h-8 w-8 text-white" />
        )}
      </div>

      {/* Sidebar for smaller screens*/}
      {isSidebarOpen && (
        <aside
          className="sm:hidden fixed top-0 right-0 z-40 w-full bg-primary p-6"
          aria-label="Sidebar"
        >
          {/* Close button */}
          <button className="text-white mb-4" onClick={closeSidebar}>
            <span className="sr-only">Close sidebar</span>
            <BsX size={30} />
          </button>

          {/* Content of the sidebar for smaller screens */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <ul className="space-y-2 font-medium">
                {sidebarItems.map((item) => (
                  <li key={item.href}>
                    <button
                      className={`w-full flex items-center p-2 text-white rounded-lg hover:bg-secondary ${
                        pathname === item.href ? "bg-secondary" : "bg-none"
                      } group`}
                      onClick={() => {
                        if (item.label === "Log Out") {
                          handleLogout();
                        } else {
                          handleNavigation(item.href);
                        }
                        closeSidebar(); // Menutup sidebar setelah menu dipilih
                      }}
                    >
                      {item.icon}
                      <span className="ms-3">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
