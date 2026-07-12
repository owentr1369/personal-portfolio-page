# Vietnamese/English i18n Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a client-side EN/VI language toggle that translates every visible text on the single-page portfolio, persisted in `localStorage`, with no route/URL changes.

**Architecture:** A React Context (`LanguageProvider`) wraps the app in `app/layout.tsx` and exposes `{ language, setLanguage, t }` via a `useLanguage()` hook. A typed `Translations` interface locks the shape of an `en` and a `vi` dictionary in `lib/i18n/translations.ts`, so TypeScript fails the build if either dictionary is incomplete. Every component that currently hard-codes English text reads its copy from `t` instead. Project data (`assets/projects.ts`) gets bilingual `role`/`description` fields, selected by `language` at render time.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript (strict), Tailwind CSS.

## Global Constraints

- No new routes, no URL prefix, no `next-intl` — toggle is 100% client-side (per spec `docs/superpowers/specs/2026-07-12-vietnamese-i18n-design.md`).
- Default language on first visit (no `localStorage` value) is `"en"`.
- `localStorage` key is exactly `portfolio-lang`.
- Project `title`, `technologies`, `url`, `src` in `assets/projects.ts` stay as plain strings (proper nouns / technical terms) — only `role` and `description` become `{ en: string; vi: string }`.
- **No automated test runner exists in this repo** (`package.json` has no `jest`/`vitest`/`playwright`). Verification for every task is: (a) `npx tsc --noEmit` passes, and (b) a manual check in the browser via `npm run dev`. Do not introduce a new test framework — out of scope.
- `app/layout.tsx` `<html lang="en">` and the `metadata` export stay static (server-rendered); only `document.documentElement.lang` is updated client-side by the provider.

---

## Task 1: Translation dictionary infrastructure

**Files:**
- Create: `lib/i18n/translations.ts`

**Interfaces:**
- Produces: `export type Locale = "en" | "vi"`, `export interface Translations { nav, hero, skills, encryption, projects, footer }` (full shape below), `export const translations: Record<Locale, Translations>`.

- [ ] **Step 1: Create the translations file**

```ts
// lib/i18n/translations.ts
export type Locale = "en" | "vi";

export interface Translations {
  nav: {
    aboutMe: string;
    skills: string;
    projects: string;
  };
  hero: {
    badge: string;
    headline: {
      prefix: string;
      highlight: string;
      suffix: string;
    };
    bio: string;
    ctaButton: string;
  };
  skills: {
    badge: string;
    heading: string;
    subtext: string;
  };
  encryption: {
    heading: {
      prefix: string;
      amp: string;
      suffix: string;
    };
    badge: string;
    caption: string;
  };
  projects: {
    heading: string;
    viewProject: string;
  };
  footer: {
    community: string;
    socialMedia: string;
    about: string;
    becomeSponsor: string;
    learningAboutMe: string;
    copyright: string;
  };
}

const en: Translations = {
  nav: {
    aboutMe: "About me",
    skills: "Skills",
    projects: "Projects",
  },
  hero: {
    badge: "Tran Thien Tam · Senior Frontend Engineer",
    headline: {
      prefix: "Shipping",
      highlight: "high-impact",
      suffix: "products with AI",
    },
    bio: "Senior Frontend Engineer with 4+ years of experience across web apps, Shopify apps, and Chrome extensions. Built AI-powered creative platforms recognized by Shopify Feature Spotlight — specialized in React, Vue, Next.js, and TypeScript with a focus on performance and scalable architecture.",
    ctaButton: "See My Work",
  },
  skills: {
    badge: "React · Vue · TypeScript · AI",
    heading: "My Technical Skills & Tools",
    subtext: "From frontend architecture to AI-powered workflows",
  },
  encryption: {
    heading: {
      prefix: "Performance",
      amp: "&",
      suffix: "Security",
    },
    badge: "Encryption",
    caption: "Secure your data with end-to-end encryption",
  },
  projects: {
    heading: "My Projects",
    viewProject: "View Project",
  },
  footer: {
    community: "Community",
    socialMedia: "Social Media",
    about: "About",
    becomeSponsor: "Become Sponsor",
    learningAboutMe: "Learning about me",
    copyright: "© WebChain Dev 2023 Inc. All rights reserved",
  },
};

const vi: Translations = {
  nav: {
    aboutMe: "Giới thiệu",
    skills: "Kỹ năng",
    projects: "Dự án",
  },
  hero: {
    badge: "Trần Thiện Tâm · Kỹ sư Frontend Cấp cao",
    headline: {
      prefix: "Ra mắt các sản phẩm",
      highlight: "tác động lớn",
      suffix: "với sự hỗ trợ của AI",
    },
    bio: "Kỹ sư Frontend Cấp cao với hơn 4 năm kinh nghiệm trong web app, ứng dụng Shopify và tiện ích mở rộng Chrome. Đã xây dựng các nền tảng sáng tạo ứng dụng AI được Shopify Feature Spotlight vinh danh — chuyên sâu về React, Vue, Next.js và TypeScript, tập trung vào hiệu năng và kiến trúc có khả năng mở rộng.",
    ctaButton: "Xem dự án của tôi",
  },
  skills: {
    badge: "React · Vue · TypeScript · AI",
    heading: "Kỹ năng & Công cụ kỹ thuật",
    subtext: "Từ kiến trúc frontend đến quy trình làm việc ứng dụng AI",
  },
  encryption: {
    heading: {
      prefix: "Hiệu năng",
      amp: "&",
      suffix: "Bảo mật",
    },
    badge: "Mã hóa",
    caption: "Bảo mật dữ liệu của bạn với mã hóa đầu-cuối",
  },
  projects: {
    heading: "Dự án của tôi",
    viewProject: "Xem dự án",
  },
  footer: {
    community: "Cộng đồng",
    socialMedia: "Mạng xã hội",
    about: "Giới thiệu",
    becomeSponsor: "Trở thành nhà tài trợ",
    learningAboutMe: "Tìm hiểu thêm về tôi",
    copyright: "© WebChain Dev 2023 Inc. Bảo lưu mọi quyền",
  },
};

export const translations: Record<Locale, Translations> = { en, vi };
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors (this file is standalone and not imported anywhere yet, so a passing run only confirms syntax/typing of this file — later tasks confirm the wiring).

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/translations.ts
git commit -m "feat: add EN/VI translation dictionary"
```

---

## Task 2: Language context, switcher, and Navbar wiring

**Files:**
- Create: `lib/i18n/LanguageContext.tsx`
- Create: `components/ui/LanguageSwitcher.tsx`
- Modify: `app/layout.tsx`
- Modify: `components/main/Navbar.tsx`

**Interfaces:**
- Consumes: `Locale`, `Translations`, `translations` from `lib/i18n/translations.ts` (Task 1).
- Produces: `LanguageProvider` (React component), `useLanguage(): { language: Locale; setLanguage: (l: Locale) => void; t: Translations }` — every later task imports `useLanguage` from `@/lib/i18n/LanguageContext`.

- [ ] **Step 1: Create the language context and provider**

```tsx
// lib/i18n/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, Translations, translations } from "./translations";

const STORAGE_KEY = "portfolio-lang";

interface LanguageContextValue {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "vi") {
      setLanguageState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (next: Locale) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
```

- [ ] **Step 2: Create the language switcher component**

```tsx
// components/ui/LanguageSwitcher.tsx
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
```

- [ ] **Step 3: Wire `LanguageProvider` into the root layout**

Replace the contents of `app/layout.tsx` with:

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tran Tam | Space Portfolio",
  description: "This is Tran Tam's space portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden}`}
      >
        <LanguageProvider>
          <StarsCanvas />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Translate Navbar labels and add the switcher**

Replace the contents of `components/main/Navbar.tsx` with:

```tsx
// components/main/Navbar.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Socials } from "@/assets/index";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

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
              {t.nav.aboutMe}
            </a>
            <a
              href="#skills"
              className="cursor-pointer hover:text-white transition-colors"
            >
              {t.nav.skills}
            </a>
            <a
              href="#projects"
              className="cursor-pointer hover:text-white transition-colors"
            >
              {t.nav.projects}
            </a>
          </div>

          {/* Desktop Socials */}
          <div className="hidden md:flex flex-row items-center gap-5">
            {Socials.map((social, index) => (
              <a
                href={social.url}
                target="_blank"
                key={index}
                style={{
                  filter: social.name == "Github" ? "invert(1)" : "none",
                }}
              >
                <Image
                  src={social.src}
                  alt={social.name}
                  width={24}
                  height={24}
                />
              </a>
            ))}
            <LanguageSwitcher />
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
            {t.nav.aboutMe}
          </a>
          <a
            href="#skills"
            className="text-2xl font-semibold py-4 cursor-pointer hover:text-white transition-colors border-b border-[#7042f820]"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.skills}
          </a>
          <a
            href="#projects"
            className="text-2xl font-semibold py-4 cursor-pointer hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.projects}
          </a>
          <div className="mt-auto pt-6 border-t border-[#7042f861] flex flex-row items-center justify-between gap-6">
            <div className="flex flex-row gap-6">
              {Socials.map((social, index) => (
                <a
                  href={social.url}
                  target="_blank"
                  key={index}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    filter: social.name == "Github" ? "invert(1)" : "none",
                  }}
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
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
```

- [ ] **Step 5: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Manual browser verification**

Run: `npm run dev`, open `http://localhost:3000`.
Expected:
- Nav links read "About me / Skills / Projects" and an "EN / VI" pill sits next to the socials (desktop) and at the bottom of the mobile menu.
- Clicking "VI" changes the nav labels to "Giới thiệu / Kỹ năng / Dự án" instantly, no page reload.
- Open browser devtools console and run `document.documentElement.lang` → returns `"vi"`.
- Reload the page → nav labels stay in Vietnamese (check `localStorage.getItem("portfolio-lang")` → `"vi"`).
- Click "EN" → labels revert to English immediately.

- [ ] **Step 7: Commit**

```bash
git add lib/i18n/LanguageContext.tsx components/ui/LanguageSwitcher.tsx app/layout.tsx components/main/Navbar.tsx
git commit -m "feat: add language context, switcher, and translate Navbar"
```

---

## Task 3: Translate Hero section

**Files:**
- Modify: `components/sub/HeroContent.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from Task 2, `t.hero.badge`, `t.hero.headline.{prefix,highlight,suffix}`, `t.hero.bio`, `t.hero.ctaButton` from Task 1.

- [ ] **Step 1: Replace hard-coded strings with translation lookups**

Replace the contents of `components/sub/HeroContent.tsx` with:

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const MotionButton = motion(Button);

const HeroContent = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-24 md:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center md:items-start items-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[14px] border border-[#7042F99B] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">{t.hero.badge}</h1>
        </motion.div>
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
        >
          <span>
            {t.hero.headline.prefix}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-500">
              {" "}
              {t.hero.headline.highlight}{" "}
            </span>
            {t.hero.headline.suffix}
          </span>
        </motion.div>
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base md:text-lg text-gray-400 my-5 max-w-[600px]"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
        >
          {t.hero.bio}
        </motion.p>
        <MotionButton href="#projects" variants={slideInFromLeft(1)}>
          {t.hero.ctaButton}
        </MotionButton>
      </div>
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center mt-8 md:mt-0"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="works icons"
          height={650}
          width={650}
          className="w-full md:max-w-none"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual browser verification**

Run: `npm run dev` (if not already running), open `http://localhost:3000`.
Expected: with language set to VI (from Task 2's switcher), the hero badge, headline, bio paragraph, and "Xem dự án của tôi" button all read in Vietnamese. Toggling back to EN restores the original English copy exactly as before this task.

- [ ] **Step 4: Commit**

```bash
git add components/sub/HeroContent.tsx
git commit -m "feat: translate Hero section"
```

---

## Task 4: Translate Skills section heading text

**Files:**
- Modify: `components/sub/SkillText.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `t.skills.{badge,heading,subtext}`.

- [ ] **Step 1: Replace hard-coded strings with translation lookups**

Replace the contents of `components/sub/SkillText.tsx` with:

```tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SkillText = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-2 px-5 border border-[#7042f88b] opacity-[0.9]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">{t.skills.badge}</h1>
      </motion.div>
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-xl md:text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        {t.skills.heading}
      </motion.div>
      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-base md:text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
      >
        {t.skills.subtext}
      </motion.div>
    </div>
  );
};

export default SkillText;
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual browser verification**

Open `http://localhost:3000`, scroll to the Skills section. With VI selected, badge/heading/subtext read in Vietnamese; toggling to EN restores the original English copy.

- [ ] **Step 4: Commit**

```bash
git add components/sub/SkillText.tsx
git commit -m "feat: translate Skills section heading"
```

---

## Task 5: Translate Encryption section

**Files:**
- Modify: `components/main/Encryption.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `t.encryption.heading.{prefix,amp,suffix}`, `t.encryption.badge`, `t.encryption.caption`.

- [ ] **Step 1: Replace hard-coded strings with translation lookups**

Replace the contents of `components/main/Encryption.tsx` with:

```tsx
"use client";
import React from "react";

import { motion } from "framer-motion";
import { slideInFromTop } from "@/utils/motion";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const Encryption = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-row relative items-center justify-center min-h-[50vh] md:min-h-screen w-full h-full">
      <div className="absolute w-auto h-auto top-0 z-[5]">
        <motion.div
          variants={slideInFromTop}
          className="text-2xl md:text-[40px] font-medium text-center text-gray-200 px-4"
        >
          {t.encryption.heading.prefix}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "}
            {t.encryption.heading.amp}{" "}
          </span>
          {t.encryption.heading.suffix}
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          <Image
            src="/LockTop.png"
            alt="Lock top"
            width={50}
            height={50}
            className="w-[50px] translate-y-5 transition-all duration-200 group-hover:translate-y-11"
          />
          <Image
            src="/LockMain.png"
            alt="Lock Main"
            width={70}
            height={70}
            className=" z-10"
          />
        </div>

        <div className="Welcome-box px-[15px] py-[4px] z-[20] brder my-[20px] border-[#7042f88b] opacity-[0.9]">
          <h1 className="Welcome-text text-[12px]">{t.encryption.badge}</h1>
        </div>
      </div>
      <div className="absolute z-[20] bottom-[10px] px-[5px]">
        <div className="cursive text-sm md:text-[20px] font-medium text-center text-gray-300 px-6">
          {t.encryption.caption}
        </div>
      </div>

      <div className="w-full flex items-start justify-center absolute">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-auto"
          src="/encryption.webm"
        />
      </div>
    </div>
  );
};

export default Encryption;
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual browser verification**

Open `http://localhost:3000`, scroll to the Encryption section. With VI selected, heading reads "Hiệu năng & Bảo mật", badge reads "Mã hóa", caption reads "Bảo mật dữ liệu của bạn với mã hóa đầu-cuối". Toggling to EN restores the original English copy.

- [ ] **Step 4: Commit**

```bash
git add components/main/Encryption.tsx
git commit -m "feat: translate Encryption section"
```

---

## Task 6: Bilingual project data and Projects/ProjectCard translation

**Files:**
- Modify: `assets/projects.ts`
- Modify: `components/sub/ProjectCard.tsx`
- Modify: `components/main/Projects.tsx`

**Interfaces:**
- Produces: `ProjectsData[number].role: { en: string; vi: string }`, `ProjectsData[number].description: { en: string; vi: string }` (breaking change from `string` — this is why all three files move together in one task).
- Consumes: `useLanguage()`, `t.projects.{heading,viewProject}`.

- [ ] **Step 1: Replace `assets/projects.ts` with bilingual role/description**

```ts
// assets/projects.ts
export const ProjectsData = [
  {
    src: "/Project17.png",
    title: "9SpaceX",
    url: "https://www.9spacex.com/",
    role: {
      en: "Shopify Theme Developer",
      vi: "Nhà phát triển Theme Shopify",
    },
    description: {
      en: "Shopify store for 9SpaceX — a workspace accessories brand. Built and customized the theme to deliver a clean, high-converting storefront experience.",
      vi: "Cửa hàng Shopify cho 9SpaceX — thương hiệu phụ kiện không gian làm việc. Xây dựng và tùy chỉnh theme để mang lại trải nghiệm storefront gọn gàng, tối ưu chuyển đổi.",
    },
    technologies: ["Shopify", "Liquid", "CSS", "JavaScript"],
  },
  {
    src: "/Project16.png",
    title: "EngChamp",
    url: "https://engchamp.com/",
    role: {
      en: "Indie Developer",
      vi: "Nhà phát triển độc lập",
    },
    description: {
      en: "English learning platform gamified like an RPG — learn vocabulary through real passages, earn XP, and climb leaderboards from A1 to IELTS-ready C1.",
      vi: "Nền tảng học tiếng Anh được game hóa theo phong cách RPG — học từ vựng qua các đoạn văn thực tế, tích lũy XP và leo bảng xếp hạng từ A1 đến C1 sẵn sàng cho IELTS.",
    },
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    src: "/Project15.png",
    title: "Promer – AI Ad Platform",
    url: "https://promer.ai/",
    role: {
      en: "Frontend Engineer",
      vi: "Kỹ sư Frontend",
    },
    description: {
      en: "Landing page for Promer — an AI platform that turns any product URL into winning ads, with 5-star rating on Shopify and 3,000+ merchants.",
      vi: "Landing page cho Promer — nền tảng AI biến bất kỳ URL sản phẩm nào thành quảng cáo hiệu quả, đạt đánh giá 5 sao trên Shopify với hơn 3.000 merchant sử dụng.",
    },
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "SSG"],
  },
  {
    src: "/Project9.png",
    title: "Promer – Creative Studio",
    url: "https://app.promer.ai/",
    role: {
      en: "Frontend Engineer",
      vi: "Kỹ sư Frontend",
    },
    description: {
      en: "AI-powered platform for generating ad creatives (image, video, copy) from product data. Achieved 'Built for Shopify' badge, 5-star rating, and Shopify Feature Spotlight across Europe & Americas.",
      vi: "Nền tảng ứng dụng AI để tạo creative quảng cáo (hình ảnh, video, nội dung) từ dữ liệu sản phẩm. Đạt huy hiệu 'Built for Shopify', đánh giá 5 sao và được Shopify Feature Spotlight vinh danh tại châu Âu & châu Mỹ.",
    },
    technologies: [
      "React.js",
      "Next.js",
      "Remix.js",
      "TypeScript",
      "Tailwind CSS",
      "Shopify",
      "Chrome Extension",
      "WebSockets",
    ],
  },
  {
    src: "/Project10.png",
    title: "Promer – AI Product Copy & Store Audit",
    role: {
      en: "Frontend Engineer",
      vi: "Kỹ sư Frontend",
    },
    description: {
      en: "Shopify apps for AI-generated SEO product descriptions and automated store audits covering SEO, page speed, and UX with actionable CRO recommendations.",
      vi: "Ứng dụng Shopify tạo mô tả sản phẩm chuẩn SEO bằng AI và tự động audit cửa hàng về SEO, tốc độ tải trang, UX kèm đề xuất CRO có thể hành động ngay.",
    },
    technologies: [
      "React.js",
      "Remix.js",
      "TypeScript",
      "Shopify",
      "Tailwind CSS",
      "WebSockets",
    ],
  },
  {
    src: "/Project13.png",
    title: "Promer  – Blog Studio",
    url: "https://apps.shopify.com/promer-blog-studio?surface_intra_position=2&surface_type=partners&surface_version=simplified",
    role: {
      en: "Frontend Engineer",
      vi: "Kỹ sư Frontend",
    },
    description: {
      en: "Shopify app for AI-powered blog creation, helping merchants generate SEO-optimized blog posts to drive organic traffic and boost store visibility.",
      vi: "Ứng dụng Shopify hỗ trợ tạo blog bằng AI, giúp merchant tạo bài viết chuẩn SEO để tăng traffic tự nhiên và nâng cao độ hiển thị cửa hàng.",
    },
    technologies: [
      "React.js",
      "Remix.js",
      "TypeScript",
      "Shopify",
      "Tailwind CSS",
    ],
  },
  {
    src: "/Project11.png",
    title: "Internal LMS & Bulletin Board",
    role: {
      en: "Frontend Engineer",
      vi: "Kỹ sư Frontend",
    },
    description: {
      en: "Internal platforms for employee training and company-wide communication, featuring course management, real-time posts, reactions, comments, and a gift exchange system.",
      vi: "Nền tảng nội bộ phục vụ đào tạo nhân viên và truyền thông toàn công ty, gồm quản lý khóa học, đăng bài real-time, reaction, bình luận và hệ thống trao đổi quà tặng.",
    },
    technologies: ["Vue.js 3", "TypeScript", "Vuex", "WebSockets", "SCSS"],
  },
  {
    src: "/Project12.png",
    title: "Internal Ops & CS Tools",
    role: {
      en: "Frontend Engineer",
      vi: "Kỹ sư Frontend",
    },
    description: {
      en: "Internal systems for affiliate management, KPI tracking, and revenue reporting, plus a Chrome extension to streamline Customer Service ticket handling.",
      vi: "Hệ thống nội bộ quản lý affiliate, theo dõi KPI và báo cáo doanh thu, cùng tiện ích mở rộng Chrome giúp tối ưu quy trình xử lý ticket Customer Service.",
    },
    technologies: [
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "Chrome Extension",
      "SCSS",
    ],
  },
  {
    src: "/Project14.png",
    title: "East by Ngô Thanh Hòa",
    url: "https://eastbyngothanhhoa.com/",
    role: {
      en: "Website Developer",
      vi: "Nhà phát triển Website",
    },
    description: {
      en: "Restaurant website for Chef Ngô Thanh Hòa — featuring contemporary Vietnamese cuisine with menu, reservation, and inspiration sections.",
      vi: "Website nhà hàng cho Bếp trưởng Ngô Thanh Hòa — giới thiệu ẩm thực Việt Nam đương đại với thực đơn, đặt bàn và các mục truyền cảm hứng.",
    },
    technologies: ["WordPress", "Elementor", "CSS"],
  },
  {
    src: "/Project1.png",
    title: "MTConsulting Website",
    url: "https://mtconsultingvn.com/",
    role: {
      en: "Website Developer",
      vi: "Nhà phát triển Website",
    },
    description: {
      en: "Lading Page for MTConsulting, a consulting firm based in the VietNam.",
      vi: "Landing Page cho MTConsulting, công ty tư vấn có trụ sở tại Việt Nam.",
    },
    technologies: ["WordPress", "Elementor", "CSS"],
  },
  {
    src: "/Project17.png",
    title: "Auto Buy CSMoney Chrome Extension",
    role: {
      en: "Chrome Extension Developer",
      vi: "Nhà phát triển Chrome Extension",
    },
    description: {
      en: "Chrome Extension that helps users to buy skins on CSMoney automatically.",
      vi: "Chrome Extension giúp người dùng tự động mua skin trên CSMoney.",
    },
    technologies: ["Chrome Extension", "JavaScript"],
  },
  {
    src: "/Project3.png",
    title: "Bohum Insurance Website",
    url: "https://child.bohumdoctorplus.com/",
    role: {
      en: "Frontend Developer",
      vi: "Nhà phát triển Frontend",
    },
    description: {
      en: "Insurance website for Bohum with Web API integration.",
      vi: "Website bảo hiểm cho Bohum có tích hợp Web API.",
    },
    technologies: ["HTML", "SCSS", "Bootstrap", "JavaScript", "Web API"],
  },
  {
    src: "/Project5.png",
    title: "Loader.fo YouTube Downloader",
    url: "https://loader.fo",
    role: {
      en: "Frontend Developer",
      vi: "Nhà phát triển Frontend",
    },
    description: {
      en: "A fast and clean YouTube downloader web app supporting MP3, MP4, 1080p, and playlist downloads via API integration.",
      vi: "Ứng dụng web tải video YouTube nhanh, gọn, hỗ trợ tải MP3, MP4, 1080p và cả playlist thông qua tích hợp API.",
    },
    technologies: ["React", "TypeScript"],
  },
  {
    src: "/Project6.png",
    title: "Price Zone - Sold by Amazon",
    url: "https://chromewebstore.google.com/detail/price-zone-sold-by-amazon/lbnpgmnmahgpfhbbfcfdapgofflbjkke",
    role: {
      en: "Chrome Extension Developer",
      vi: "Nhà phát triển Chrome Extension",
    },
    description: {
      en: "A Chrome Extension that displays Amazon price zone information directly on product pages, helping users identify regional pricing differences.",
      vi: "Chrome Extension hiển thị thông tin vùng giá Amazon ngay trên trang sản phẩm, giúp người dùng nhận biết chênh lệch giá theo khu vực.",
    },
    technologies: ["Chrome Extension", "JavaScript"],
  },
  {
    src: "/Project8.png",
    title: "Shark Liên Profile Website",
    url: "https://sharklien.vn/",
    role: {
      en: "Frontend Developer",
      vi: "Nhà phát triển Frontend",
    },
    description: {
      en: "Profile website for Shark Liên — founder of AAA Insurance and Vietnam's renowned 'Queen of Insurance'.",
      vi: "Website profile cho Shark Liên — nhà sáng lập AAA Insurance và được mệnh danh là 'Nữ hoàng Bảo hiểm' của Việt Nam.",
    },
    technologies: ["React", "JavaScript"],
  },
  {
    src: "/Project7.png",
    title: "Personal Portfolio Website",
    url: "https://tamtamjs.vercel.app",
    role: {
      en: "Personal Project",
      vi: "Dự án cá nhân",
    },
    description: {
      en: "A personal portfolio website built to showcase projects, skills, and experience as a frontend developer.",
      vi: "Website portfolio cá nhân xây dựng để giới thiệu dự án, kỹ năng và kinh nghiệm với vai trò frontend developer.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
];
```

- [ ] **Step 2: Update `ProjectCard.tsx` to read the current locale**

Replace the contents of `components/sub/ProjectCard.tsx` with:

```tsx
"use client";

import Image from "next/image";
import React from "react";
import { ProjectsData } from "@/assets/projects";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Project = (typeof ProjectsData)[number];

interface Props {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: Props) => {
  const { language } = useLanguage();
  const { src, title, description, technologies, role } = project;

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] flex flex-col group cursor-pointer"
    >
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-cover h-[160px] group-hover:opacity-80 transition-opacity duration-300"
      />
      <div className="relative p-4 flex flex-col flex-1">
        <h1 className="text-lg md:text-2xl font-semibold text-white">
          {title}
        </h1>
        {role && (
          <p className="text-xs text-purple-400 mt-1 font-medium">
            {role[language]}
          </p>
        )}
        <p className="mt-2 text-gray-300 text-sm flex-1">
          {description[language]}
        </p>
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full border border-purple-500/50 text-purple-300 bg-purple-500/10"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
```

- [ ] **Step 3: Update `Projects.tsx` to read the current locale and translate UI text**

Replace the contents of `components/main/Projects.tsx` with:

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectCard from "../sub/ProjectCard";
import Button from "../ui/Button";
import { ProjectsData } from "@/assets/projects";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Project = (typeof ProjectsData)[number];

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-2xl md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10 md:py-20">
        {t.projects.heading}
      </h1>
      <div className="h-full w-full max-w-[1440px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {ProjectsData.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative bg-[#0F0F1A] border border-[#2A0E61] rounded-xl shadow-2xl w-[80vw] max-w-[1200px] overflow-hidden flex flex-col-reverse md:flex-row md:min-h-[560px]"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Left — info */}
              <div className="flex flex-col justify-between md:p-8 p-3 md:w-[40%] overflow-y-auto max-h-[80vh]">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {selected.title}
                  </h2>
                  {selected.role && (
                    <p className="text-sm text-purple-400 font-medium mt-2">
                      {selected.role[language]}
                    </p>
                  )}
                  <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                    {selected.description[language]}
                  </p>
                  {selected.technologies &&
                    selected.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-6">
                        {selected.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full border border-purple-500/50 text-purple-300 bg-purple-500/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
                {selected.url && (
                  <Button
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-block"
                    size="sm"
                  >
                    {t.projects.viewProject}
                  </Button>
                )}
              </div>

              {/* Right — image */}
              <div className="md:w-[60%] relative min-h-[260px] md:min-h-full">
                <Image
                  src={selected.src}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/80 rounded-full w-8 h-8 flex items-center justify-center text-lg transition-colors z-10"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors. (If you see `Property 'en'/'vi' does not exist`, double-check every project entry in `assets/projects.ts` was converted — a `string` left instead of `{ en, vi }` on any entry breaks `role[language]`/`description[language]` across all 16 cards.)

- [ ] **Step 5: Manual browser verification**

Open `http://localhost:3000`, scroll to Projects. With VI selected: heading reads "Dự án của tôi", every project card shows Vietnamese role/description, project titles/technologies stay unchanged (proper nouns), clicking a card opens the modal with Vietnamese role/description and a "Xem dự án" button. Toggle to EN and confirm everything reverts to the original English text.

- [ ] **Step 6: Commit**

```bash
git add assets/projects.ts components/sub/ProjectCard.tsx components/main/Projects.tsx
git commit -m "feat: add bilingual project data and translate Projects section"
```

---

## Task 7: Translate Footer

**Files:**
- Modify: `components/main/Footer.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `t.footer.{community,socialMedia,about,becomeSponsor,learningAboutMe,copyright}`.

- [ ] **Step 1: Replace hard-coded strings with translation lookups**

Replace the contents of `components/main/Footer.tsx` with:

```tsx
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual browser verification**

Open `http://localhost:3000`, scroll to the Footer. With VI selected: "Community" → "Cộng đồng", "Social Media" → "Mạng xã hội", "About" → "Giới thiệu", "Become Sponsor" → "Trở thành nhà tài trợ", "Learning about me" → "Tìm hiểu thêm về tôi", copyright line ends in "Bảo lưu mọi quyền". Social network names (Youtube/Github/Twitter/Linkedin) and the email stay unchanged. Toggle to EN and confirm the original English text is restored exactly.

- [ ] **Step 4: Full end-to-end check**

Run: `npx tsc --noEmit` and `npm run build`
Expected: both complete with no errors — this is the first point every file in the plan has been touched, so `next build` catches anything the per-task `tsc` checks might have missed (e.g. unused imports treated as lint errors).

With the dev server running, do one final pass: toggle EN → VI → EN from a cold page load (Navbar), confirming Hero, Skills, Encryption, Projects (grid + modal), and Footer all switch together, and that reloading mid-session preserves the last choice via `localStorage`.

- [ ] **Step 5: Commit**

```bash
git add components/main/Footer.tsx
git commit -m "feat: translate Footer"
```
