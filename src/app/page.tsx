import Link from "next/link";
import { ResumeUploader } from "@/components/ResumeUploader";
import {
  Sparkles,
  Globe,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Target,
  FileText,
  DollarSign
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Resume Intelligence & International Job Discovery</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
            Optimize Your Resume. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Land Global Roles in USA, Canada & UK.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your resume to get instant ATS scoring, bullet-by-bullet quantifiable rewrites, missing keyword alerts, and real-time job matches at top international companies hiring worldwide.
          </p>

          {/* Interactive Uploader */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-blue-500/5 mb-12">
            <ResumeUploader />
          </div>

          {/* Highlights Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Target Markets</span>
              </div>
              <p className="text-lg font-bold text-white">USA, CA, UK, EU</p>
              <p className="text-xs text-slate-400">High-demand roles outside India</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <FileCheck2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">ATS Score</span>
              </div>
              <p className="text-lg font-bold text-white">0 - 100 Gauge</p>
              <p className="text-xs text-slate-400">Action verbs & quantifiable metrics</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Avg Global Comp</span>
              </div>
              <p className="text-lg font-bold text-white">$120k - $210k</p>
              <p className="text-xs text-slate-400">Verified international ranges</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Zero Error</span>
              </div>
              <p className="text-lg font-bold text-white">Prisma DB Sync</p>
              <p className="text-xs text-slate-400">Full persistence & data export</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Everything You Need to Break into International Tech
            </h2>
            <p className="text-sm text-slate-400">
              Traditional resumes often fail overseas corporate ATS screening. Here is how ResumePulse AI transforms your candidacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Deep ATS Keyword Critique</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Scans against role benchmarks to surface critical missing technical skills, frameworks, and tools that automated recruiters search for.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="text-emerald-400 font-semibold">✓ Missing keywords:</span> Terraform, Kubernetes, GraphQL
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Quantifiable Bullet Rewrites</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Converts passive responsibilities into Google-style X-Y-Z achievements with quantifiable metric improvements ($/%, latency, throughput).
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="text-blue-400 font-semibold">Before:</span> Handled server APIs
                <br />
                <span className="text-emerald-400 font-semibold">After:</span> Scaled APIs by 42% latency drop
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Global Market Job Matching</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Curated international job opportunities in USA, Canada, UK, and Germany directly matched to your extracted skills with live apply links.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="text-purple-300 font-semibold">🇺🇸 Stripe, 🇨🇦 Shopify, 🇬🇧 Monzo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">ResumePulse AI</span>
            <span>•</span>
            <span>Global ATS Screening & Job Matcher</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/analyze" className="hover:text-slate-300">Analyzer</Link>
            <Link href="/jobs" className="hover:text-slate-300">Global Jobs</Link>
            <Link href="/builder" className="hover:text-slate-300">Resume Builder</Link>
            <Link href="/database" className="hover:text-slate-300">Prisma Database</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
