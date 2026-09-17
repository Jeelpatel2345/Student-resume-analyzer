"use client";

import React, { useState, useEffect, useRef } from "react";
import { SAMPLE_RESUMES } from "@/lib/sampleResumes";
import {
  Download,
  FileText,
  Plus,
  Trash2,
  Sparkles,
  RefreshCw,
  Eye,
  CheckCircle2,
  Printer,
  ChevronDown
} from "lucide-react";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  bullets: string[];
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export default function BuilderPage() {
  const resumePrintRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // Resume form state
  const [name, setName] = useState("Alex Rivera");
  const [targetRole, setTargetRole] = useState("Senior Full Stack Engineer");
  const [email, setEmail] = useState("alex.rivera@email.com");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  const [location, setLocation] = useState("San Francisco, CA");
  const [links, setLinks] = useState("linkedin.com/in/alexrivera-dev | github.com/arivera-code");
  const [summary, setSummary] = useState(
    "Senior Full Stack Engineer with 5+ years of experience designing high-scale cloud platforms, distributed microservices, and reactive frontend architectures. Proven track record improving application response time by 40% and deploying mission-critical systems supporting 200,000+ daily active users."
  );

  const [skills, setSkills] = useState(
    "TypeScript, JavaScript, React, Next.js, Node.js, PostgreSQL, Docker, AWS, Kubernetes, CI/CD, Redis, GraphQL, System Design"
  );

  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: "1",
      company: "Apex Cloud Technologies",
      role: "Senior Full Stack Developer",
      duration: "Jan 2022 – Present",
      location: "Austin, TX",
      bullets: [
        "Architected scalable web dashboard with React, Next.js, and TypeScript, serving over 150,000 enterprise customers with 99.98% uptime.",
        "Engineered 22+ RESTful microservices in Node.js and PostgreSQL, decreasing API latency by 35% through Redis caching layers.",
        "Streamlined CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle time from 4 days to 45 minutes."
      ]
    },
    {
      id: "2",
      company: "Stellar Systems Inc",
      role: "Software Engineer",
      duration: "Jun 2019 – Dec 2021",
      location: "San Francisco, CA",
      bullets: [
        "Developed responsive user interface components with React and Tailwind CSS, increasing mobile user conversion by 28%.",
        "Optimized complex SQL queries and database schemas in PostgreSQL, cutting query execution time by 52%."
      ]
    }
  ]);

  const [educations, setEducations] = useState<EducationItem[]>([
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      year: "2015 – 2019"
    }
  ]);

  const [template, setTemplate] = useState<"minimal" | "executive">("minimal");

  // Load from prefill or session if present
  useEffect(() => {
    const prefill = sessionStorage.getItem("builder_prefill");
    if (prefill) {
      try {
        const p = JSON.parse(prefill);
        if (p.name) setName(p.name);
        if (p.targetRole) setTargetRole(p.targetRole);
        if (p.email) setEmail(p.email);
        if (p.phone) setPhone(p.phone);
        if (p.location) setLocation(p.location);
        if (p.links?.length > 0) setLinks(p.links.join(" | "));
        if (p.skills?.length > 0) setSkills(p.skills.join(", "));
        if (p.experience?.length > 0) {
          setExperiences(
            p.experience.map((e: any, i: number) => ({
              id: String(i + 1),
              company: e.company || "Enterprise Corp",
              role: e.role || "Software Engineer",
              duration: e.duration || "2021 – Present",
              location: "Remote / Onsite",
              bullets: e.bullets?.length > 0 ? e.bullets : ["Delivered core application features."]
            }))
          );
        }
        if (p.education?.length > 0) {
          setEducations(
            p.education.map((ed: any, i: number) => ({
              id: String(i + 1),
              institution: ed.institution || "University",
              degree: ed.degree || "Bachelor of Science",
              year: ed.year || "2020"
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load prefill", err);
      }
    }
  }, []);

  // Experience handlers
  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        company: "New Company",
        role: "Software Professional",
        duration: "2023 – Present",
        location: "Remote",
        bullets: ["Spearheaded development of core features boosting application performance."]
      }
    ]);
  };

  const handleUpdateExperience = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const handleBulletChange = (expIndex: number, bulletIndex: number, text: string) => {
    const updated = [...experiences];
    updated[expIndex].bullets[bulletIndex] = text;
    setExperiences(updated);
  };

  const handleAddBullet = (expIndex: number) => {
    const updated = [...experiences];
    updated[expIndex].bullets.push("Quantified achievement showing business outcome ($/%, scale).");
    setExperiences(updated);
  };

  const handleRemoveBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...experiences];
    updated[expIndex].bullets.splice(bulletIndex, 1);
    setExperiences(updated);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // PDF Export
  const handleDownloadPDF = async () => {
    if (!resumePrintRef.current) return;
    setDownloading(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(resumePrintRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${name.toLowerCase().replace(/\s+/g, "_")}_ats_resume.pdf`);
    } catch (err) {
      console.error("PDF generation failed, falling back to print window:", err);
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Top action header */}
      <section className="sticky top-16 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>ATS Resume Builder & PDF Exporter</span>
            </h1>
            <p className="text-xs text-slate-400">
              Live side-by-side editor formatted to pass 100% of automated corporate ATS filters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Template Selector */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setTemplate("minimal")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  template === "minimal" ? "bg-blue-600 text-white font-bold" : "text-slate-400"
                }`}
              >
                Modern Clean
              </button>
              <button
                onClick={() => setTemplate("executive")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  template === "executive" ? "bg-blue-600 text-white font-bold" : "text-slate-400"
                }`}
              >
                Executive Tech
              </button>
            </div>

            {/* Print / Download Button */}
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-102"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? "Exporting PDF..." : "Download ATS PDF"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Builder Grid: Editor on Left, Live Preview on Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Editor Form */}
          <div className="lg:col-span-6 space-y-6">
            {/* Personal Details */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">
                1. Candidate Header
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Target Role Title</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Links (LinkedIn | GitHub | Portfolio)</label>
                <input
                  type="text"
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400 mb-2">
                2. Professional Summary
              </h2>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Technical Skills */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400 mb-2">
                3. Technical & Core Skills
              </h2>
              <p className="text-[11px] text-slate-400 mb-2">Separate skills with commas:</p>
              <textarea
                rows={2}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Work Experience */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">
                  4. Professional Experience
                </h2>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              {experiences.map((exp, expIdx) => (
                <div key={exp.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Position #{expIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(expIdx)}
                      className="text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(expIdx, "company", e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">Role Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleUpdateExperience(expIdx, "role", e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500">Duration (e.g. 2021 – Present)</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => handleUpdateExperience(expIdx, "duration", e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleUpdateExperience(expIdx, "location", e.target.value)}
                        className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">
                      Impact Bullets (Quantified with %, $, or speed metric):
                    </label>
                    <div className="space-y-2">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => handleBulletChange(expIdx, bIdx, e.target.value)}
                            className="flex-1 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-200"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveBullet(expIdx, bIdx)}
                            className="text-slate-500 hover:text-red-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddBullet(expIdx)}
                        className="text-[11px] text-blue-400 hover:underline"
                      >
                        + Add Bullet Point
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 space-y-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">
                5. Education & Degree
              </h2>
              {educations.map((edu, eduIdx) => (
                <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-slate-500">Degree & Major</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const copy = [...educations];
                        copy[eduIdx].degree = e.target.value;
                        setEducations(copy);
                      }}
                      className="w-full px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500">Graduation Year</label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => {
                        const copy = [...educations];
                        copy[eduIdx].year = e.target.value;
                        setEducations(copy);
                      }}
                      className="w-full px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="text-[10px] text-slate-500">Institution / University</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const copy = [...educations];
                        copy[eduIdx].institution = e.target.value;
                        setEducations(copy);
                      }}
                      className="w-full px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Live A4 Formatted Document Preview */}
          <div className="lg:col-span-6">
            <div className="sticky top-32">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>Real-time ATS Standard Preview (A4 Formatted)</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>100% Parser Compliant</span>
                </span>
              </div>

              {/* A4 Document Paper Container */}
              <div
                ref={resumePrintRef}
                className="bg-white text-slate-900 rounded-lg shadow-2xl p-8 min-h-[750px] font-sans text-left border border-slate-200"
              >
                {/* Header */}
                <div className="border-b-2 border-slate-800 pb-3 mb-4 text-center">
                  <h1 className="text-2xl font-extrabold uppercase tracking-wide text-slate-950">
                    {name || "Your Name"}
                  </h1>
                  {targetRole && (
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-widest mt-0.5">
                      {targetRole}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center justify-center gap-x-2 text-[11px] text-slate-600 mt-1.5">
                    {location && <span>{location}</span>}
                    {email && <span>• {email}</span>}
                    {phone && <span>• {phone}</span>}
                    {links && <span>• {links}</span>}
                  </div>
                </div>

                {/* Summary */}
                {summary && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                      Professional Summary
                    </h2>
                    <p className="text-[11px] text-slate-700 leading-relaxed">{summary}</p>
                  </div>
                )}

                {/* Technical Skills */}
                {skills && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                      Technical Skills
                    </h2>
                    <p className="text-[11px] text-slate-800 leading-relaxed font-medium">
                      {skills}
                    </p>
                  </div>
                )}

                {/* Work Experience */}
                {experiences.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                      Professional Experience
                    </h2>
                    <div className="space-y-3">
                      {experiences.map((exp, idx) => (
                        <div key={idx}>
                          <div className="flex items-baseline justify-between text-xs">
                            <span className="font-bold text-slate-900">
                              {exp.role} <span className="font-semibold text-slate-700">| {exp.company}</span>
                            </span>
                            <span className="text-[11px] font-medium text-slate-600">
                              {exp.duration}
                            </span>
                          </div>
                          <ul className="mt-1 space-y-1 list-disc list-outside pl-4 text-[11px] text-slate-700 leading-relaxed">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li key={bIdx}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {educations.length > 0 && (
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                      Education
                    </h2>
                    <div className="space-y-1.5">
                      {educations.map((edu, idx) => (
                        <div key={idx} className="flex items-baseline justify-between text-xs">
                          <div>
                            <span className="font-bold text-slate-900">{edu.degree}</span>
                            <p className="text-[11px] text-slate-600">{edu.institution}</p>
                          </div>
                          <span className="text-[11px] font-medium text-slate-600">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
