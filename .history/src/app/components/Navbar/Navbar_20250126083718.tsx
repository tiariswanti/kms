"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsList, BsX } from "react-icons/bs";
import Logo from "./Logo";

const navbarItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About KNPK" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full h-18 shadow-none md:shadow-xl bg-primary fixed top-0 z-50">
      {/* Larger screen */}
      <div className="flex items-center justify-between h-full px-14 w-full">
        <Logo />

        <div className="text-white hidden sm:flex items-center space-x-4">
          <ul className="flex space-x-6">
            {navbarItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="hover:border-b-2 border-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center"></div>
        </div>

        {/* Smaller screen */}
        <div className="sm:hidden cursor-pointer pl-4" onClick={toggleMenu}>
          {menuOpen ? (
            <BsX className="h-8 w-8 text-white" />
          ) : (
            <BsList className="h-8 w-8 text-white" />
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-18 left-0 w-full sm:hidden bg-primary px-10 p-6">
          <div className="flex-col">
            <ul className="flex flex-col space-y-2">
              {navbarItems.map((item, index) => (
                <li
                  key={index}
                  className="mobile-link w-full p-2 hover:bg-secondary rounded-lg"
                >
                  <Link href={item.href} onClick={() => setMenuOpen(false)}>
                    <span className="text-white">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
