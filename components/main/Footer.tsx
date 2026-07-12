"use client";

import React from "react";
import { RxDiscordLogo, RxGithubLogo, RxLinkedinLogo, RxTwitterLogo } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full grid grid-cols-2 md:flex md:flex-row md:justify-around gap-y-8 gap-x-4 md:gap-0 px-4 md:px-0 mb-6">
          {/* Community */}
          <div className="h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px] mb-2">{t.footer.community}</div>
            <a
              href="https://www.youtube.com/@owendev1369"
              target="_blank"
              className="flex flex-row items-center my-[8px] cursor-pointer hover:text-white transition-colors"
            >
              <FaYoutube />
              <span className="text-[15px] ml-[6px]">Youtube</span>
            </a>
            <a
              href="https://github.com/owentr1369"
              target="_blank"
              className="flex flex-row items-center my-[8px] cursor-pointer hover:text-white transition-colors"
            >
              <RxGithubLogo />
              <span className="text-[15px] ml-[6px]">Github</span>
            </a>
          </div>

          {/* Social Media */}
          <div className="h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px] mb-2">{t.footer.socialMedia}</div>
            <a
              href="https://x.com/tamtamjs"
              target="_blank"
              className="flex flex-row items-center my-[8px] cursor-pointer hover:text-white transition-colors"
            >
              <RxTwitterLogo />
              <span className="text-[15px] ml-[6px]">Twitter</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tamtamjs/"
              target="_blank"
              className="flex flex-row items-center my-[8px] cursor-pointer hover:text-white transition-colors"
            >
              <RxLinkedinLogo />
              <span className="text-[15px] ml-[6px]">Linkedin</span>
            </a>
          </div>

          {/* About */}
          <div className="col-span-2 md:col-span-1 h-auto flex flex-col items-center justify-start border-t border-[#7042f830] pt-6 md:border-0 md:pt-0">
            <div className="font-bold text-[16px] mb-2">{t.footer.about}</div>
            <a
              href="https://buymeacoffee.com/tamvaa1306"
              target="_blank"
              className="flex flex-row items-center my-[8px] cursor-pointer hover:text-white transition-colors"
            >
              <span className="text-[15px] ml-[6px]">{t.footer.becomeSponsor}</span>
            </a>
            <p className="flex flex-row items-center my-[8px]">
              <span className="text-[15px] ml-[6px]">{t.footer.learningAboutMe}</span>
            </p>
            <a
              href="mailto:tamvaa1306@gmail.com"
              className="flex flex-row items-center my-[8px] cursor-pointer hover:text-white transition-colors"
            >
              <span className="text-[15px] ml-[6px]">tamvaa1306@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="mb-[20px] text-[15px] text-center text-gray-400">
          {t.footer.copyright}
        </div>
      </div>
    </div>
  );
};

export default Footer;
