import React from "react";
import { RxDiscordLogo, RxGithubLogo } from "react-icons/rx";

import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px] ">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row justify-around flex-wrap">
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">Community</div>
            <a
              href="https://www.youtube.com/@owendev1369"
              target="_blank"
              className="flex flex-row items-center my-[15px] cursor-pointer"
            >
              <FaYoutube />
              <span className="text-[15px] ml-[6px]">Youtube</span>
            </a>
            <a
              href="https://github.com/owentr1369"
              target="_blank"
              className="flex flex-row items-center my-[15px] cursor-pointer"
            >
              <RxGithubLogo />
              <span className="text-[15px] ml-[6px]">Github</span>
            </a>
          </div>
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">Social Media</div>
            <a
              href="https://x.com/tamtamjs"
              target="_blank"
              className="flex flex-row items-center my-[15px] cursor-pointer"
            >
              <RxGithubLogo />
              <span className="text-[15px] ml-[6px]">Twitter</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tamtamjs/"
              target="_blank"
              className="flex flex-row items-center my-[15px] cursor-pointer"
            >
              <RxDiscordLogo />
              <span className="text-[15px] ml-[6px]">Linkedin</span>
            </a>
          </div>
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">About</div>
            <a
              href="https://buymeacoffee.com/tamvaa1306"
              target="_blank"
              className="flex flex-row items-center my-[15px] cursor-pointer"
            >
              <span className="text-[15px] ml-[6px]">Become Sponsor</span>
            </a>
            <p className="flex flex-row items-center my-[15px] cursor-pointer">
              <span className="text-[15px] ml-[6px]">Learning about me</span>
            </p>
            <a
              href="mailto:tamvaa1306@gmail.com"
              className="flex flex-row items-center my-[15px] cursor-pointer"
            >
              <span className="text-[15px] ml-[6px]">tamvaa1306@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="mb-[20px] text-[15px] text-center">
          &copy; WebChain Dev 2023 Inc. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
