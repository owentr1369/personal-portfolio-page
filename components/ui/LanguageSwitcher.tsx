"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-row items-center border border-[#7042f861] bg-[#0300145e] rounded-full p-1 text-xs font-medium">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`px-3 py-1 rounded-full transition-colors ${
          language === "en"
            ? "bg-[#7042f89b] text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("vi")}
        aria-pressed={language === "vi"}
        className={`px-3 py-1 rounded-full transition-colors ${
          language === "vi"
            ? "bg-[#7042f89b] text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        VI
      </button>
    </div>
  );
};

export default LanguageSwitcher;
