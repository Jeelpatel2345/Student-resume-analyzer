# 🚀 Student Resume Analyzer & Global Job Matcher

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)

An intelligent, full-stack AI Resume Intelligence & Career Opportunity Platform built for students and early-to-mid career software engineers looking to land international tech roles across the **USA 🇺🇸, Canada 🇨🇦, the United Kingdom 🇬🇧, Germany 🇩🇪, and Worldwide Remote**.

---

## 🌟 Key Features

### 1. 🎯 Comprehensive ATS Resume Scoring (0 - 100)
- **Multi-Format Parsing**: Upload `.pdf`, `.docx`, or raw text with client-side & server-side document extraction (`pdf-parse`, `mammoth`).
- **4-Dimensional Evaluation**:
  - **Technical & Soft Skills Match**: Detects keyword gaps against industry standards.
  - **Work Experience & Quantifiable Impact**: Flags weak verbs and missing numbers/percentages.
  - **Education & Credentials Completeness**: Validates degrees, honors, and certifications.
  - **ATS Formatting & Hierarchy**: Ensures parseability by modern screening software (Workday, Greenhouse, Lever).

### 2. ⚡ Executive Google X-Y-Z Bullet Point Rewriter
- Identifies weak, passive resume bullet points and rewrites them into high-conversion impact statements using the Google formula:  
  > *"Accomplished [X], as measured by [Y], by doing [Z]"*

### 3. 🏢 Real-Time Hiring Companies Showcase
- Dynamically aggregates tech companies hiring for your exact skill stack in real time.
- View company profiles, average candidate compatibility scores, verified tech stacks, and direct career application portals.

### 4. 🌍 International Tech Jobs & Multi-Criteria Filtering
- Matches your candidate profile directly with curated global roles & real-time public feeds.
- **Advanced Real-Time Filters**:
  - **Date Posted**: Past 24 hours, Past week (7 days), Past month (30 days), Any time
  - **Experience Level**: Entry Level (0-2 yrs / New Grad), Mid Level (2-5 yrs), Senior (5+ yrs), Lead / Staff / Architect
  - **Workplace Model**: Remote Only, Hybrid, On-site
  - **Job Type**: Full-time, Part-time, Contract / Freelance, Internship
  - **Country / Market**: USA, Canada, UK, Germany / EU, Worldwide Remote
  - **Visa Sponsorship**: Instant toggle for international visa & relocation support

### 5. 📝 Interactive ATS Resume Builder
- Edit your resume in real time with immediate ATS score recalculation.
- Export clean, ATS-compliant single-page PDF resumes with one click (`html2canvas` + `jspdf`).

### 6. 🗄️ Full Database Persistence (Prisma ORM)
- Auto-syncs uploaded resumes, score breakdowns, bullet critiques, and target roles to SQLite out-of-the-box (or PostgreSQL / Supabase for cloud production).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Document Parsing**: `pdf-parse`, `mammoth`
- **PDF Export**: `jspdf`, `html2canvas`
- **Database / ORM**: SQLite / PostgreSQL via [Prisma](https://www.prisma.io/)
- **Real-Time Job Feeds**: RemoteOK API & Curated Global Tech Catalog

---

## 📁 Project Structure

```text
resume-analyzer-platform/
├── prisma/
│   └── schema.prisma         # Database schema for Resumes & Analyses
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page & quick uploader
│   │   ├── layout.tsx        # Global layout & font definitions
│   │   ├── globals.css       # Tailwind base styles
│   │   ├── analyze/          # ATS Analysis Report & Real-time Job/Company view
│   │   ├── jobs/             # Advanced Job Discovery Hub & Company Directory
│   │   ├── builder/          # Interactive ATS Resume Builder & PDF Exporter
│   │   ├── database/         # Admin / Database management dashboard
│   │   └── api/
│   │       ├── analyze/      # Resume parse & score endpoint
│   │       ├── jobs/         # Filtered real-time jobs & companies endpoint
│   │       └── resumes/      # Database CRUD endpoint
│   ├── components/
│   │   ├── Navbar.tsx        # Global navigation bar
│   │   ├── ResumeUploader.tsx# Drag-and-drop document uploader
│   │   ├── ScoreGauge.tsx    # Animated SVG score gauge
│   │   ├── JobCard.tsx       # Job card with match breakdown & badges
│   │   └── CompanyCard.tsx   # Real-time hiring company profile card
│   └── lib/
│       ├── analyzer.ts       # ATS scoring heuristics & keyword databases
│       ├── jobs.ts           # Job catalog, RemoteOK parser & company aggregators
│       ├── parser.ts         # PDF/DOCX multi-format text extractor
│       ├── prisma.ts         # Prisma client singleton
│       └── sampleResumes.ts  # Pre-built benchmark resumes
├── .env.example              # Example environment configuration
├── package.json
└── tsconfig.json
```

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Jeelpatel2345/Student-resume-analyzer.git
cd Student-resume-analyzer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Initialize the database
```bash
npx prisma generate
npx prisma db push
```

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Production (Vercel)

The easiest way to deploy this platform live is with [Vercel](https://vercel.com/):

1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/) and click **"New Project"**.
3. Import your GitHub repository `Student-resume-analyzer`.
4. Add environment variables (see `.env.example`). If using cloud database, set `DATABASE_URL` to your Supabase / Neon PostgreSQL string.
5. Click **Deploy**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
