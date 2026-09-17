"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Database,
  ExternalLink,
  CheckCircle2,
  Server,
  Layers,
  Copy,
  Terminal,
  ShieldCheck,
  Globe,
  FileText
} from "lucide-react";

export default function DatabasePage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/resumes")
      .then((res) => res.json())
      .then((data) => {
        if (data.resumes) setResumes(data.resumes);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Header */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
            <Database className="w-3.5 h-3.5" />
            <span>Backend Architecture & Database Inspector</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Database Links & Data Persistence
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            ResumePulse AI is powered by <strong>Prisma ORM</strong> with a local SQLite database out-of-the-box and full compatibility for cloud PostgreSQL & Supabase.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Direct Links Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Platform Web App Link */}
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  Active & Live
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">Web Platform Link</h2>
              <p className="text-xs text-slate-400 mb-4">
                The fullstack application running on local port 3000 with interactive ATS parsing, scoring, and job discovery.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                <code className="text-xs text-blue-300 font-mono">http://localhost:3000</code>
                <button
                  onClick={() => copyToClipboard("http://localhost:3000", "app")}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  {copiedText === "app" ? "Copied!" : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:underline"
              >
                <span>Open ResumePulse Web App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Box 2: Prisma Studio Database Explorer Link */}
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Database className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20">
                  Visual UI GUI
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">Visual Database Explorer (Prisma Studio)</h2>
              <p className="text-xs text-slate-400 mb-4">
                Prisma Studio gives you a full visual management dashboard to inspect, edit, and query all saved resumes and analyses.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                <code className="text-xs text-emerald-300 font-mono">http://localhost:5555</code>
                <button
                  onClick={() => copyToClipboard("http://localhost:5555", "studio")}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  {copiedText === "studio" ? "Copied!" : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Command: <code className="text-slate-300">npx prisma studio</code>
              </span>
              <a
                href="http://localhost:5555"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline"
              >
                <span>Launch Studio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Database Schema & Cloud Compatibility */}
        <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Server className="w-6 h-6 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold text-white">Database Configuration & Cloud Switching</h3>
              <p className="text-xs text-slate-400">How to switch between SQLite (Local) and PostgreSQL / Supabase (Cloud)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="font-bold text-slate-200">Current Local SQLite Database</span>
              <p className="text-slate-400 leading-relaxed">
                Located at: <code className="text-blue-300 font-mono">prisma/dev.db</code>
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-slate-300">
                DATABASE_URL="file:./dev.db"
              </div>
              <p className="text-[11px] text-emerald-400">
                ✓ Zero setup required. Automatically creates, stores, and indexes all scans.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="font-bold text-slate-200">Optional Cloud Database (Supabase / Neon)</span>
              <p className="text-slate-400 leading-relaxed">
                Change <code>provider = "postgresql"</code> in <code>schema.prisma</code> and add your URL:
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-slate-300 truncate">
                postgresql://postgres:[PASSWORD]@db.xxxx.supabase.co:5432/postgres
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1"
                >
                  Supabase Cloud <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://neon.tech"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Neon Serverless <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Live Stored Resumes Table */}
        <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Persisted Resumes & Scans in Database</span>
            </h3>
            <span className="text-xs text-slate-400">
              Total Records: <strong className="text-white">{resumes.length}</strong>
            </span>
          </div>

          {loading ? (
            <p className="text-xs text-slate-400 py-6 text-center">Loading database records...</p>
          ) : resumes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">Candidate</th>
                    <th className="py-2.5 px-4">Role</th>
                    <th className="py-2.5 px-4">Email</th>
                    <th className="py-2.5 px-4">ATS Score</th>
                    <th className="py-2.5 px-4">Scan Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {resumes.map((r) => {
                    const latestScore = r.analyses?.[0]?.overallScore ?? "—";
                    return (
                      <tr key={r.id} className="hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-bold text-white">{r.candidateName || "Candidate"}</td>
                        <td className="py-3 px-4 text-slate-300">{r.targetRole || "Software Engineer"}</td>
                        <td className="py-3 px-4 text-slate-400">{r.email || "—"}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              latestScore >= 80
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-blue-500/10 text-blue-400"
                            }`}
                          >
                            {latestScore}/100
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No resumes uploaded yet. Go to <Link href="/" className="text-blue-400 underline">Home</Link> to scan a resume.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
