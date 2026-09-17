"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScoreGauge } from "@/components/ScoreGauge";
import { JobCard } from "@/components/JobCard";
import { CompanyCard } from "@/components/CompanyCard";
import { ResumeUploader } from "@/components/ResumeUploader";
import { SAMPLE_RESUMES } from "@/lib/sampleResumes";
import { JobOpportunity, CompanySpotlight, getHiringCompanies } from "@/lib/jobs";
import {
  FileText,
  Globe,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  Edit3,
  Layers,
  Award,
  TrendingUp,
  RefreshCw,
  Share2,
  Clock,
  UserCheck,
  RotateCcw,
  Filter,
  MapPin
} from "lucide-react";

export default function AnalyzePage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"jobs" | "companies" | "checklist" | "skills" | "rewrites">("jobs");
  const [countryFilter, setCountryFilter] = useState<string>("ALL");
  const [workTypeFilter, setWorkTypeFilter] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<string>("ALL");
  const [experienceFilter, setExperienceFilter] = useState<string>("ALL");
  const [employmentFilter, setEmploymentFilter] = useState<string>("ALL");

  useEffect(() => {
    // 1. Check if session storage has analysis
    const stored = sessionStorage.getItem("last_analysis");
    if (stored) {
      try {
        setData(JSON.parse(stored));
        setLoading(false);
        return;
      } catch (e) {
        console.error("Failed to parse stored analysis", e);
      }
    }

    // 2. If nothing stored, trigger analysis on default sample resume
    const loadDefault = async () => {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: SAMPLE_RESUMES[0].text })
        });
        const result = await res.json();
        if (result.success) {
          setData(result);
          sessionStorage.setItem("last_analysis", JSON.stringify(result));
        }
      } catch (err) {
        console.error("Failed to load initial analysis", err);
      } finally {
        setLoading(false);
      }
    };

    loadDefault();
  }, []);

  const handleAnalysisComplete = (newResult: any) => {
    setData(newResult);
    setActiveTab("jobs");
  };

  const handleSendToBuilder = () => {
    if (data?.parsed) {
      sessionStorage.setItem("builder_prefill", JSON.stringify(data.parsed));
      router.push("/builder");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4 text-blue-400 animate-pulse">
          <Sparkles className="w-8 h-8 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Analyzing Resume & Matching Global Jobs...</h2>
        <p className="text-sm text-slate-400 max-w-md">
          Scanning ATS metrics, parsing past companies, and querying live roles in USA, Canada, and the UK.
        </p>
      </div>
    );
  }

  if (!data || !data.analysis) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No Resume Analyzed Yet</h2>
        <p className="text-sm text-slate-400 mb-8">Upload your resume to see deep ATS scores and international job matches.</p>
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <ResumeUploader onAnalysisComplete={handleAnalysisComplete} redirectOnSuccess={false} />
        </div>
      </div>
    );
  }

  const { parsed, analysis, jobs } = data;

  const allJobs: JobOpportunity[] = jobs || [];

  const filteredJobs = allJobs.filter((job: JobOpportunity) => {
    // 1. Country filter
    if (countryFilter !== "ALL") {
      if (countryFilter === "Remote" && job.workType !== "Remote") return false;
      if (countryFilter !== "Remote" && job.country.toLowerCase() !== countryFilter.toLowerCase()) return false;
    }
    // 2. Workplace model
    if (workTypeFilter !== "ALL" && job.workType.toLowerCase() !== workTypeFilter.toLowerCase()) {
      return false;
    }
    // 3. Employment type
    if (employmentFilter !== "ALL" && job.employmentType && job.employmentType.toLowerCase() !== employmentFilter.toLowerCase()) {
      return false;
    }
    // 4. Experience level
    if (experienceFilter !== "ALL" && job.experienceLevel) {
      const el = job.experienceLevel.toLowerCase();
      const ef = experienceFilter.toLowerCase();
      if (ef.includes("entry") && !el.includes("entry")) return false;
      if (ef.includes("mid") && !el.includes("mid")) return false;
      if (ef.includes("senior") && !el.includes("senior")) return false;
      if ((ef.includes("lead") || ef.includes("staff")) && !(el.includes("lead") || el.includes("staff"))) return false;
    }
    // 5. Date posted
    if (dateFilter !== "ALL") {
      const hours = job.postedHoursAgo || 24;
      if (dateFilter === "24h" && hours > 24) return false;
      if (dateFilter === "week" && hours > 168) return false;
      if (dateFilter === "month" && hours > 720) return false;
    }
    return true;
  });

  const filteredCompanies = getHiringCompanies(filteredJobs);

  const resetFilters = () => {
    setCountryFilter("ALL");
    setWorkTypeFilter("ALL");
    setDateFilter("ALL");
    setExperienceFilter("ALL");
    setEmploymentFilter("ALL");
  };

  const hasActiveFilters =
    countryFilter !== "ALL" ||
    workTypeFilter !== "ALL" ||
    dateFilter !== "ALL" ||
    experienceFilter !== "ALL" ||
    employmentFilter !== "ALL";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Header Banner */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                ATS Analysis Report
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">Targeting: <strong className="text-slate-200">{parsed.targetRole}</strong></span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {parsed.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-2">
              {parsed.email && <span>📧 {parsed.email}</span>}
              {parsed.phone && <span>📞 {parsed.phone}</span>}
              {parsed.location && <span>📍 {parsed.location}</span>}
              {parsed.links?.[0] && (
                <a
                  href={parsed.links[0].startsWith("http") ? parsed.links[0] : `https://${parsed.links[0]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1"
                >
                  🔗 {parsed.links[0].replace(/https?:\/\//, "")}
                </a>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={handleSendToBuilder}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition-all hover:scale-101"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit in Resume Builder</span>
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("last_analysis");
                window.location.reload();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Scan New</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Scorecard & Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Main Score Gauge */}
          <div className="lg:col-span-4 rounded-3xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col items-center justify-center text-center shadow-xl">
            <ScoreGauge score={analysis.overallScore} size={190} />
            <p className="text-xs text-slate-400 mt-4 max-w-xs leading-relaxed">
              {analysis.summary}
            </p>
          </div>

          {/* Category Scores */}
          <div className="lg:col-span-8 rounded-3xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>ATS Category Performance</span>
                </h3>
                <span className="text-xs text-slate-400">Industry Standard Passing: 75%</span>
              </div>

              <div className="space-y-4">
                {/* Category 1 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Technical & Soft Skills Match</span>
                    <span className="text-blue-400">{analysis.skillsScore}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
                      style={{ width: `${analysis.skillsScore}%` }}
                    />
                  </div>
                </div>

                {/* Category 2 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Work Experience & Quantifiable Impact ($/%)</span>
                    <span className="text-emerald-400">{analysis.experienceScore}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                      style={{ width: `${analysis.experienceScore}%` }}
                    />
                  </div>
                </div>

                {/* Category 3 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Education & Credentials Completeness</span>
                    <span className="text-purple-400">{analysis.educationScore}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full transition-all duration-700"
                      style={{ width: `${analysis.educationScore}%` }}
                    />
                  </div>
                </div>

                {/* Category 4 */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">ATS Layout, Hierarchy & Formatting</span>
                    <span className="text-amber-400">{analysis.formattingScore}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-700"
                      style={{ width: `${analysis.formattingScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Past Companies Detected */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Detected Companies & Roles:</span>
              </span>
              {parsed.experience?.map((exp: any, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs text-slate-200 font-medium"
                >
                  {exp.company} <span className="text-slate-400 font-normal">({exp.role})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === "jobs"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Global Job Matches ({filteredJobs.length})</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
              USA • CA • UK
            </span>
          </button>

          <button
            onClick={() => setActiveTab("companies")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === "companies"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Hiring Companies ({filteredCompanies.length})</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab("rewrites")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === "rewrites"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Bullet Impact Rewrites</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === "skills"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Skills & Missing Keywords</span>
            {analysis.missingSkills?.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("checklist")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === "checklist"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>ATS Compliance Checklist</span>
          </button>
        </div>

        {/* Global Filter Bar for Jobs & Companies */}
        {(activeTab === "jobs" || activeTab === "companies") && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Filter className="w-3.5 h-3.5 text-blue-400" />
                <span>Real-Time Filter Opportunities</span>
                {hasActiveFilters && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Filtered
                  </span>
                )}
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {/* Date Posted */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400" />
                  <span>Date Posted</span>
                </label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">Any Time</option>
                  <option value="24h">Past 24 Hours</option>
                  <option value="week">Past Week (7 days)</option>
                  <option value="month">Past Month (30 days)</option>
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-amber-400" />
                  <span>Experience</span>
                </label>
                <select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">All Experience</option>
                  <option value="entry">Entry Level (0-2 yrs)</option>
                  <option value="mid">Mid Level (2-5 yrs)</option>
                  <option value="senior">Senior (5+ yrs)</option>
                  <option value="lead">Lead / Staff</option>
                </select>
              </div>

              {/* Workplace Model */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>Workplace</span>
                </label>
                <select
                  value={workTypeFilter}
                  onChange={(e) => setWorkTypeFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">All Models</option>
                  <option value="Remote">Remote Only</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-cyan-400" />
                  <span>Job Type</span>
                </label>
                <select
                  value={employmentFilter}
                  onChange={(e) => setEmploymentFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-purple-400" />
                  <span>Market</span>
                </label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">🌍 All Global Markets</option>
                  <option value="USA">🇺🇸 United States</option>
                  <option value="Canada">🇨🇦 Canada</option>
                  <option value="UK">🇬🇧 United Kingdom</option>
                  <option value="Germany">🇩🇪 Germany / EU</option>
                  <option value="Remote">🌐 Worldwide Remote</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Global Job Matches */}
        {activeTab === "jobs" && (
          <div>
            {/* Real-Time Company Teaser Strip */}
            {filteredCompanies.length > 0 && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{filteredCompanies.length} Top Companies Actively Recruiting</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h3>
                    <p className="text-xs text-slate-400">
                      Companies like {filteredCompanies.slice(0, 3).map(c => c.company).join(", ")} are seeking skills from your resume.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("companies")}
                  className="shrink-0 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all flex items-center gap-1.5"
                >
                  <span>View All Companies</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Matching Global Roles ({filteredJobs.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Ranked by compatibility with your extracted skill set and target role.
                </p>
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job: any) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="col-span-2 text-center py-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
                  <Globe className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-300 mb-1">No jobs match the selected filters</p>
                  <p className="text-xs text-slate-500 mb-4">Try clearing filters to view all matched positions.</p>
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Hiring Companies (Real-time) */}
        {activeTab === "companies" && (
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Real-Time Hiring Companies ({filteredCompanies.length})</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h2>
                <p className="text-xs text-slate-400">
                  Explore companies actively hiring candidates with your profile and tech stack.
                </p>
              </div>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <CompanyCard key={company.company} company={company} />
                ))
              ) : (
                <div className="col-span-2 text-center py-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
                  <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-300 mb-1">No companies match the selected filters</p>
                  <p className="text-xs text-slate-500 mb-4">Try clearing filters to view all companies.</p>
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Bullet Impact Rewrites */}
        {activeTab === "rewrites" && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-1">
                Executive Action-Verb & Metric Rewriter
              </h2>
              <p className="text-xs text-slate-400">
                Top US/UK tech companies use the Google X-Y-Z formula: <em>"Accomplished [X], as measured by [Y], by doing [Z]"</em>. Here is how your bullets can be upgraded to unlock higher interview conversion:
              </p>
            </div>

            <div className="space-y-4">
              {analysis.bulletCritique?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
                      Original (Weak)
                    </span>
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      "{item.original}"
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      ATS Optimized (High Impact)
                    </span>
                    <p className="text-xs text-emerald-300 font-mono font-medium leading-relaxed">
                      "{item.improved}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
                    <span className="text-blue-400 font-semibold">💡 Why this wins:</span>
                    <span>{item.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Skills & Missing Keywords */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            {/* Missing Keywords Alert */}
            {analysis.missingSkills?.length > 0 && (
              <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Missing High-Demand ATS Keywords for {parsed.targetRole}</span>
                </div>
                <p className="text-xs text-slate-300 mb-3">
                  These keywords are frequently scanned by automated screening software in the USA and Europe for your target role. Add them to your projects or skills section:
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold"
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Extracted Skills Categorized */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6">
              <h3 className="text-base font-bold text-white mb-4">
                Identified Skills ({parsed.skills?.length || 0} Technologies)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-2">
                    Frontend Engineering
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {parsed.categorizedSkills?.frontend?.length > 0 ? (
                      parsed.categorizedSkills.frontend.map((s: string) => (
                        <span key={s} className="px-2.5 py-1 rounded text-xs bg-slate-800 text-slate-200 border border-slate-700">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">None detected</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                    Backend & Architecture
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {parsed.categorizedSkills?.backend?.length > 0 ? (
                      parsed.categorizedSkills.backend.map((s: string) => (
                        <span key={s} className="px-2.5 py-1 rounded text-xs bg-slate-800 text-slate-200 border border-slate-700">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">None detected</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
                    Cloud & DevOps
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {parsed.categorizedSkills?.cloudDevops?.length > 0 ? (
                      parsed.categorizedSkills.cloudDevops.map((s: string) => (
                        <span key={s} className="px-2.5 py-1 rounded text-xs bg-slate-800 text-slate-200 border border-slate-700">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">None detected</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-2">
                    Databases & Storage
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {parsed.categorizedSkills?.database?.length > 0 ? (
                      parsed.categorizedSkills.database.map((s: string) => (
                        <span key={s} className="px-2.5 py-1 rounded text-xs bg-slate-800 text-slate-200 border border-slate-700">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">None detected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: ATS Compliance Checklist */}
        {activeTab === "checklist" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Resume Strengths</span>
                </h3>
                <ul className="space-y-2.5">
                  {analysis.strengths?.map((str: string, i: number) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Red Flags & Improvement Areas</span>
                </h3>
                <ul className="space-y-2.5">
                  {analysis.weaknesses?.map((weak: string, i: number) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Checklist Table */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4">Corporate ATS Compliance Checklist</h3>
              <div className="divide-y divide-slate-800">
                {analysis.atsChecklist?.map((check: any, idx: number) => (
                  <div key={idx} className="py-3 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      {check.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-xs font-bold text-white">{check.item}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{check.tip}</p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        check.importance === "HIGH"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {check.importance} Priority
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
