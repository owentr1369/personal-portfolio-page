import React from "react";
import Image from "next/image";
import { Socials } from "@/assets/index";

const Navbar = () => {
    return (
        <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2a0e61]/50 bg-[#3001417] backdrop-blur-md z-50 px-10 ">
            <div className="h-full w-full flex flex-row items-center justify-between m-auto px-[10px] ">
                <a href="#aboutMe" className="h-auto w-auto flex flex-row items-center mr-[10px]">
                    <Image
                        src='/NavLogo.png'
                        alt="logo"
                        width={40}
                        height={40}
                        className="cursor-pointer hover:animate-slowsspin rounded-full min-w-[40px] min-h-[40px]"
                    />
                    <span className="font-bold ml-[10px] hidden md:block text-gray-300">Thien Tam T. (Owen)</span>
                </a>
                <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
                    <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
                        <a href="#about-me" className="cursor-pointer">
                            About me
                        </a>
                        <a href="#skills" className="cursor-pointer">
                            Skills
                        </a>
                        <a href="#projects" className="cursor-pointer">
                            Projects
                        </a>
                    </div>
                </div>
                <div className="flex flex-row gap-5">
                    {Socials.map((social, index) => (
                        <a href={social.url} target="_blank" key={index}>
                            <Image
                                src={social.src}
                                alt={social.name}
                                key={social.name}
                                width={24}
                                height={24}

                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Navbar;