"use client";

import React, { useState, useEffect } from "react";
import { JobCard } from "@/components/JobCard";
import { CompanyCard } from "@/components/CompanyCard";
import { JobOpportunity, CompanySpotlight } from "@/lib/jobs";
import {
  Globe,
  Search,
  Filter,
  MapPin,
  Briefcase,
  DollarSign,
  Sparkles,
  Plane,
  Building2,
  CheckCircle2,
  Loader2,
  Clock,
  UserCheck,
  Calendar,
  X,
  RotateCcw
} from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [companies, setCompanies] = useState<CompanySpotlight[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
  const [selectedWorkType, setSelectedWorkType] = useState<string>("ALL");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>("ALL");
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState<string>("ALL");
  const [selectedDatePosted, setSelectedDatePosted] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [visaSponsoredOnly, setVisaSponsoredOnly] = useState(false);

  // View mode: Jobs vs Companies
  const [viewMode, setViewMode] = useState<"jobs" | "companies">("jobs");

  // Read candidate skills if available in session
  const [candidateSkills, setCandidateSkills] = useState<string[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("last_analysis");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.parsed?.skills) {
          setCandidateSkills(parsed.parsed.skills);
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCountry !== "ALL") params.append("country", selectedCountry);
        if (selectedWorkType !== "ALL") params.append("workType", selectedWorkType);
        if (selectedEmploymentType !== "ALL") params.append("employmentType", selectedEmploymentType);
        if (selectedExperienceLevel !== "ALL") params.append("experienceLevel", selectedExperienceLevel);
        if (selectedDatePosted !== "ALL") params.append("datePosted", selectedDatePosted);
        if (searchQuery.trim()) params.append("role", searchQuery.trim());
        if (candidateSkills.length > 0) params.append("skills", candidateSkills.join(","));

        const res = await fetch(`/api/jobs?${params.toString()}`);
        const data = await res.json();
        if (data.success) {
          setJobs(data.jobs);
          if (data.companies) {
            setCompanies(data.companies);
          }
        }
      } catch (err) {
        console.error("Failed to load jobs", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchJobs();
    }, 200);

    return () => clearTimeout(timer);
  }, [
    selectedCountry,
    selectedWorkType,
    selectedEmploymentType,
    selectedExperienceLevel,
    selectedDatePosted,
    searchQuery,
    candidateSkills
  ]);

  const filteredJobs = visaSponsoredOnly
    ? jobs.filter((j) => j.visaSponsored)
    : jobs;

  const filteredCompanies = visaSponsoredOnly
    ? companies.filter((c) => c.visaSponsoredAvailable)
    : companies;

  const resetFilters = () => {
    setSelectedCountry("ALL");
    setSelectedWorkType("ALL");
    setSelectedEmploymentType("ALL");
    setSelectedExperienceLevel("ALL");
    setSelectedDatePosted("ALL");
    setSearchQuery("");
    setVisaSponsoredOnly(false);
  };

  const hasActiveFilters =
    selectedCountry !== "ALL" ||
    selectedWorkType !== "ALL" ||
    selectedEmploymentType !== "ALL" ||
    selectedExperienceLevel !== "ALL" ||
    selectedDatePosted !== "ALL" ||
    searchQuery.trim() !== "" ||
    visaSponsoredOnly;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Header Banner */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-2">
                <Globe className="w-3.5 h-3.5" />
                <span>Global Hiring Opportunities Outside India</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-emerald-400">Live Active Feeds</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                International Tech Jobs & Live Hiring Companies
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Explore openings across USA 🇺🇸, Canada 🇨🇦, UK 🇬🇧, Europe 🇪🇺, and Remote matched directly with your parsed skills.
              </p>
            </div>

            {candidateSkills.length > 0 && (
              <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-800/40 text-xs max-w-sm">
                <span className="text-blue-300 font-semibold block mb-1">
                  Matched with your parsed resume:
                </span>
                <span className="text-slate-300">
                  {candidateSkills.slice(0, 5).join(", ")} {candidateSkills.length > 5 && `+${candidateSkills.length - 5} more`}
                </span>
              </div>
            )}
          </div>

          {/* Search bar & Visa Toggle */}
          <div className="flex flex-col md:flex-row items-stretch gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search job title, company name, or technology (e.g. React, Stripe, DevOps, Intern)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Visa Sponsored toggle */}
            <button
              onClick={() => setVisaSponsoredOnly(!visaSponsoredOnly)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                visaSponsoredOnly
                  ? "bg-purple-600/20 border-purple-500/40 text-purple-300 shadow"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Plane className="w-4 h-4 text-purple-400" />
              <span>Visa Sponsored Only</span>
            </button>
          </div>

          {/* Advanced Multi-Filters Toolbar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-800/60">
            {/* Date Posted Filter */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-blue-400" />
                <span>Date Posted</span>
              </label>
              <select
                value={selectedDatePosted}
                onChange={(e) => setSelectedDatePosted(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">Any Time</option>
                <option value="24h">Past 24 Hours</option>
                <option value="week">Past Week (7 days)</option>
                <option value="month">Past Month (30 days)</option>
              </select>
            </div>

            {/* Experience Level Filter */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-amber-400" />
                <span>Experience Level</span>
              </label>
              <select
                value={selectedExperienceLevel}
                onChange={(e) => setSelectedExperienceLevel(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">All Experience</option>
                <option value="entry">Entry Level (0-2 yrs)</option>
                <option value="mid">Mid Level (2-5 yrs)</option>
                <option value="senior">Senior Level (5+ yrs)</option>
                <option value="lead">Lead / Staff / Architect</option>
              </select>
            </div>

            {/* Workplace Location Model */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Workplace Model</span>
              </label>
              <select
                value={selectedWorkType}
                onChange={(e) => setSelectedWorkType(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">All Workplace Models</option>
                <option value="Remote">Remote Only</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Employment Type */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-cyan-400" />
                <span>Job Type</span>
              </label>
              <select
                value={selectedEmploymentType}
                onChange={(e) => setSelectedEmploymentType(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract / Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Reset button if filters active */}
            <div className="flex items-end col-span-2 sm:col-span-4 lg:col-span-1">
              {hasActiveFilters ? (
                <button
                  onClick={resetFilters}
                  className="w-full flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset All</span>
                </button>
              ) : (
                <div className="hidden lg:block text-[11px] text-slate-500 self-center">
                  Filters ready
                </div>
              )}
            </div>
          </div>

          {/* Country Tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
            {[
              { id: "ALL", label: "🌍 All Markets" },
              { id: "USA", label: "🇺🇸 United States" },
              { id: "Canada", label: "🇨🇦 Canada" },
              { id: "UK", label: "🇬🇧 United Kingdom" },
              { id: "Germany", label: "🇩🇪 Germany / EU" },
              { id: "Remote", label: "🌐 Worldwide Remote" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCountry(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCountry === tab.id
                    ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* View Mode Toggle: Jobs vs Companies */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start">
            <button
              onClick={() => setViewMode("jobs")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "jobs"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Matching Jobs ({filteredJobs.length})</span>
            </button>

            <button
              onClick={() => setViewMode("companies")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "companies"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Hiring Companies ({filteredCompanies.length})</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Verified sources: LinkedIn • RemoteOK • Indeed • Direct ATS
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">
              Querying real-time jobs & actively hiring companies...
            </p>
          </div>
        ) : viewMode === "jobs" ? (
          filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-slate-900/40 border border-slate-800 p-12 text-center max-w-xl mx-auto">
              <Globe className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No Jobs Match These Filters</h3>
              <p className="text-xs text-slate-400 mb-6">
                Try widening your date range (e.g. past month or any time) or experience level to find more opportunities.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )
        ) : (
          /* Companies View */
          filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.company} company={company} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-slate-900/40 border border-slate-800 p-12 text-center max-w-xl mx-auto">
              <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No Companies Found</h3>
              <p className="text-xs text-slate-400 mb-6">
                No hiring companies match the selected criteria. Try resetting filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
