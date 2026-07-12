# Thiết kế: Hỗ trợ song ngữ Anh/Việt cho portfolio

Ngày: 2026-07-12

## Bối cảnh

Portfolio là ứng dụng Next.js 14 (App Router), single-page, điều hướng nội bộ
bằng anchor (`#about-me`, `#skills`, `#projects`). Hiện tại toàn bộ nội dung
hard-code bằng tiếng Anh, rải rác ở: `app/layout.tsx` (metadata),
`components/main/Navbar.tsx`, `components/sub/HeroContent.tsx`,
`components/sub/SkillText.tsx`, `components/main/Encryption.tsx`,
`components/main/Projects.tsx`, `components/sub/ProjectCard.tsx`,
`components/main/Footer.tsx`, và `assets/projects.ts` (title/role/description
của ~16 dự án).

Mục tiêu: thêm khả năng chuyển đổi Anh ⇄ Việt cho toàn bộ nội dung hiển thị
trên trang, không phá vỡ cấu trúc single-page hiện có.

## Quyết định đã chốt với người dùng

1. **Cơ chế chuyển đổi**: toggle nhẹ trên client, không đổi URL/route, không
   dùng `next-intl`. Lưu lựa chọn vào `localStorage`.
2. **Ngôn ngữ mặc định**: tiếng Anh (`en`) khi chưa có lựa chọn trong
   `localStorage`.
3. **Nội dung dự án** (`assets/projects.ts`): dịch toàn bộ `role` và
   `description` sang tiếng Việt. `title`, `technologies`, `url`, `src` giữ
   nguyên vì là tên riêng/thuật ngữ kỹ thuật quốc tế.

## Kiến trúc

- Thêm `LanguageProvider` — client component (React Context) — bọc
  `{children}` trong `app/layout.tsx`.
- State: `language: 'en' | 'vi'`, mặc định `'en'`.
- Khi người dùng đổi ngôn ngữ, giá trị được ghi vào `localStorage` (key
  `portfolio-lang`); khi mount, `useEffect` đọc lại giá trị đã lưu (nếu có)
  để hydrate state. Trước khi effect chạy, UI hiển thị `'en'` — không có
  SSR/hydration mismatch nguy hiểm vì đây chỉ là text hiển thị, không ảnh
  hưởng cấu trúc DOM.
- `useEffect` phụ đồng bộ `document.documentElement.lang` theo `language`
  hiện tại.
- Hook `useLanguage()` expose `{ language, setLanguage }` cho mọi client
  component cần dùng.

## Cấu trúc dữ liệu dịch thuật

- File mới `lib/i18n/translations.ts`:
  - `interface Translations` định nghĩa đầy đủ shape (nav, hero, skills,
    encryption, projects, footer).
  - `const en: Translations = {...}` và `const vi: Translations = {...}`
    cùng implement interface này — TypeScript sẽ báo lỗi biên dịch nếu một
    trong hai bản thiếu key, đảm bảo không có bản dịch nào bị thiếu khi
    runtime.
  - Export `const translations: Record<'en' | 'vi', Translations> = { en, vi }`.
- `assets/projects.ts`: đổi field `role: string` và `description: string`
  thành `role: { en: string; vi: string }` và
  `description: { en: string; vi: string }` cho từng project trong
  `ProjectsData`.

## Luồng dữ liệu / thay đổi component

- `Navbar.tsx`: thay text "About me"/"Skills"/"Projects" (cả bản desktop và
  mobile) bằng `t.nav.*`. Thêm `LanguageSwitcher` (pill toggle "EN / VI",
  cùng style border/rounded-full với nav links hiện có) — đặt cạnh phần
  socials desktop, và trong menu mobile.
- `HeroContent.tsx`: badge, headline, đoạn bio, nút "See My Work" →
  `t.hero.*`.
- `SkillText.tsx`: badge, heading, subtext → `t.skills.*`.
- `Encryption.tsx`: heading "Performance & Security", badge "Encryption",
  caption → `t.encryption.*`.
- `Projects.tsx`: heading "My Projects", nút "View Project" → `t.projects.*`.
  Khi render `selected.role`/`selected.description`, dùng
  `selected.role[language]` / `selected.description[language]`.
- `ProjectCard.tsx`: tương tự, dùng `project.role[language]` /
  `project.description[language]`.
- `Footer.tsx`: "Community", "Social Media", "About", "Become Sponsor",
  "Learning about me" → `t.footer.*`. Tên mạng xã hội (Youtube, Github,
  Twitter, Linkedin) và email giữ nguyên.

## Ngoài phạm vi

- Không đổi routing/URL, không dùng `next-intl`, không tạo route
  `/vi`, `/en`.
- `metadata` (`title`/`description`) trong `app/layout.tsx` giữ nguyên tiếng
  Anh — đây là server-rendered, không đổi theo toggle client-side, không
  ảnh hưởng SEO hiện có.

## Kiểm thử

- Kiểm thử thủ công trên trình duyệt (dev server):
  - Bấm toggle EN/VI → toàn bộ site (Navbar, Hero, Skills, Encryption,
    Projects + modal chi tiết dự án, Footer) đổi ngôn ngữ ngay lập tức,
    không reload trang.
  - Reload trang sau khi chọn VI → ngôn ngữ VI được giữ nguyên
    (localStorage).
  - Kiểm tra menu mobile: toggle hoạt động đúng, nav links hiển thị đúng
    ngôn ngữ.
  - `npm run build` / `tsc` không có lỗi type (đảm bảo cả hai dictionary
    `en`/`vi` đầy đủ key).
