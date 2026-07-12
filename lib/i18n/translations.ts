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
