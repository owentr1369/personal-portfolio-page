import React from "react";
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2a0e61]/50 bg-[#3001417] backdrop-blur-md z-50 px-10 ">
            <div className="h-full w-full flex flex-row items-center justify-between m-auto px-[10px] ">
                <a href="#aboutMe" className="h-auto w-auto flex flex-row items-center">
                    <Image
                        src='/NavLogo.png'
                        alt="logo"
                        width={70}
                        height={70}
                        className="cursor-pointer hover:animate-slowsspin"
                    />
                    <span className="font-bold ml-[10px] hidden md:block text-gray-300">Owen Dev</span>
                </a>
            </div>
        </div>
    )
}


export default Navbar;