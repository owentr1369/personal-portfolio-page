"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Socials } from "@/assets/index";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2a0e61]/50 bg-[#030014]/80 backdrop-blur-md z-50 md:px-10 px-4">
        <div className="h-full w-full flex flex-row items-center justify-between m-auto px-[10px]">
          {/* Logo */}
          <a
            href="#about-me"
            className="h-auto w-auto flex flex-row items-center"
          >
            <Image
              src="/NavLogo.png"
              alt="logo"
              width={40}
              height={40}
              className="cursor-pointer hover:animate-slowsspin rounded-full min-w-[40px] min-h-[40px]"
            />
            <span className="font-bold ml-[10px] hidden md:block text-gray-300">
              Thien Tam T. (Owen)
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center h-auto border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] rounded-full text-gray-200 gap-8">
            <a
              href="#about-me"
              className="cursor-pointer hover:text-white transition-colors"
            >
              About me
            </a>
            <a
              href="#skills"
              className="cursor-pointer hover:text-white transition-colors"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="cursor-pointer hover:text-white transition-colors"
            >
              Projects
            </a>
          </div>

          {/* Desktop Socials */}
          <div className="hidden md:flex flex-row gap-5">
            {Socials.map((social, index) => (
              <a href={social.url} target="_blank" key={index}>
                <Image
                  src={social.src}
                  alt={social.name}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>

          {/* Hamburger Button (mobile only) */}
          <button
            className="flex md:hidden text-gray-300 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Slide-in Menu — outside navbar to avoid backdrop-filter containing block */}
      <div
        className={`md:hidden fixed top-[65px] left-0 w-full h-[calc(100vh-65px)] bg-[#030014] z-40 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-8 py-10 gap-2 text-gray-200">
          <a
            href="#about-me"
            className="text-2xl font-semibold py-4 cursor-pointer hover:text-white transition-colors border-b border-[#7042f820]"
            onClick={() => setMenuOpen(false)}
          >
            About me
          </a>
          <a
            href="#skills"
            className="text-2xl font-semibold py-4 cursor-pointer hover:text-white transition-colors border-b border-[#7042f820]"
            onClick={() => setMenuOpen(false)}
          >
            Skills
          </a>
          <a
            href="#projects"
            className="text-2xl font-semibold py-4 cursor-pointer hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </a>
          <div className="mt-auto pt-6 border-t border-[#7042f861] flex flex-row gap-6">
            {Socials.map((social, index) => (
              <a
                href={social.url}
                target="_blank"
                key={index}
                onClick={() => setMenuOpen(false)}
              >
                <Image
                  src={social.src}
                  alt={social.name}
                  width={28}
                  height={28}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
