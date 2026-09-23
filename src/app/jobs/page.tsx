"use client";

import React, { useState, useEffect } from "react";
import { JobCard } from "@/components/JobCard";
import { CompanyCard } from "@/components/CompanyCard";
import { JobOpportunity, CompanySpotlight, POPULAR_LOCATIONS } from "@/lib/jobs";
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
  const [selectedLocation, setSelectedLocation] = useState<string>("ALL");
  const [locationInput, setLocationInput] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("ALL");
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
        if (parsed.parsed?.skills && parsed.parsed.skills.length > 0) {
          setCandidateSkills(parsed.parsed.skills);
        }
      } catch (e) {}
    }
  }, []);

  const displayedSkills = React.useMemo(() => {
    if (candidateSkills.length > 0) return candidateSkills;
    return ["React", "TypeScript", "Python", "Node.js", "AWS", "PostgreSQL", "Docker", "Machine Learning", "Go", "GraphQL", "Kubernetes", "Next.js"];
  }, [candidateSkills]);

  const skillCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    displayedSkills.forEach(skill => {
      const target = skill.toLowerCase();
      counts[skill] = jobs.filter(j =>
        j.requiredSkills.some(s => s.toLowerCase().includes(target) || target.includes(s.toLowerCase())) ||
        j.matchedSkills.some(s => s.toLowerCase().includes(target) || target.includes(s.toLowerCase()))
      ).length;
    });
    return counts;
  }, [displayedSkills, jobs]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCountry !== "ALL") params.append("country", selectedCountry);
        const loc = locationInput.trim() || (selectedLocation !== "ALL" ? selectedLocation : "");
        if (loc) params.append("location", loc);
        if (selectedSkill !== "ALL") params.append("skill", selectedSkill);
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
    selectedLocation,
    locationInput,
    selectedSkill,
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
    setSelectedLocation("ALL");
    setLocationInput("");
    setSelectedSkill("ALL");
    setSelectedWorkType("ALL");
    setSelectedEmploymentType("ALL");
    setSelectedExperienceLevel("ALL");
    setSelectedDatePosted("ALL");
    setSearchQuery("");
    setVisaSponsoredOnly(false);
  };

  const hasActiveFilters =
    selectedCountry !== "ALL" ||
    selectedLocation !== "ALL" ||
    locationInput.trim() !== "" ||
    selectedSkill !== "ALL" ||
    selectedWorkType !== "ALL" ||
    selectedEmploymentType !== "ALL" ||
    selectedExperienceLevel !== "ALL" ||
    selectedDatePosted !== "ALL" ||
    searchQuery.trim() !== "" ||
    visaSponsoredOnly;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Header Banner */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-2">
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Global Hiring Opportunities</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[11px] text-emerald-400">Live</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                International Tech Jobs & Hiring Companies
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore openings across USA 🇺🇸, Canada 🇨🇦, UK 🇬🇧, Europe 🇪🇺, and Remote matched directly with your tech stack.
              </p>
            </div>

            {candidateSkills.length > 0 && (
              <div className="w-full md:w-auto p-3 rounded-2xl bg-blue-950/40 border border-blue-800/40 text-xs max-w-sm">
                <span className="text-blue-300 font-semibold block mb-1">
                  Matched with parsed resume:
                </span>
                <span className="text-slate-300 break-words">
                  {candidateSkills.slice(0, 5).join(", ")} {candidateSkills.length > 5 && `+${candidateSkills.length - 5} more`}
                </span>
              </div>
            )}
          </div>

          {/* Search bar, Location & Visa Toggle */}
          <div className="flex flex-col md:flex-row items-stretch gap-2.5 sm:gap-3 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search title, company, or tech (e.g. React, Stripe, DevOps)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Input (e.g. Ontario, Canada, London, Berlin) */}
            <div className="relative sm:w-72">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
              <input
                type="text"
                placeholder="Location (e.g. Canada, Ontario, London)..."
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setSelectedLocation("ALL");
                }}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {locationInput && (
                <button
                  onClick={() => setLocationInput("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Visa Sponsored toggle */}
            <button
              onClick={() => setVisaSponsoredOnly(!visaSponsoredOnly)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
                visaSponsoredOnly
                  ? "bg-purple-600/20 border-purple-500/40 text-purple-300 shadow"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Plane className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Visa Sponsored</span>
            </button>
          </div>

          {/* Quick Location Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-[11px] mb-3">
            <span className="text-slate-400 font-semibold shrink-0">Quick Locations:</span>
            {POPULAR_LOCATIONS.map((loc) => {
              const active =
                (loc.value === "ALL" && !locationInput && selectedLocation === "ALL") ||
                selectedLocation.toLowerCase() === loc.value.toLowerCase() ||
                locationInput.toLowerCase() === loc.value.toLowerCase();
              return (
                <button
                  key={loc.value}
                  onClick={() => {
                    setSelectedLocation(loc.value);
                    setLocationInput(loc.value === "ALL" ? "" : loc.value);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors shrink-0 ${
                    active
                      ? "bg-emerald-600 text-white font-semibold shadow-sm"
                      : "bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800"
                  }`}
                >
                  {loc.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Skill Filtering Toolbar (JobsRight / HiringCafe style) */}
          <div className="pt-2.5 border-t border-slate-800/60 mb-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Filter by Skills:</span>
                <span className="text-[11px] text-slate-500 font-normal">
                  (Click any skill to filter 100+ hiring companies & roles)
                </span>
              </div>
              {selectedSkill !== "ALL" && (
                <button
                  onClick={() => setSelectedSkill("ALL")}
                  className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Show All Skills</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedSkill("ALL")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedSkill === "ALL"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                }`}
              >
                All Tech ({jobs.length})
              </button>
              {displayedSkills.map((skill) => {
                const count = skillCounts[skill] || 0;
                const isSelected = selectedSkill.toLowerCase() === skill.toLowerCase();
                return (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(isSelected ? "ALL" : skill)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30 scale-102"
                        : "bg-slate-900 hover:bg-slate-800 hover:border-blue-500/40 text-slate-300 border border-slate-800"
                    }`}
                  >
                    <span>{skill}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        isSelected ? "bg-white/20 text-white font-bold" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Multi-Filters Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-3 border-t border-slate-800/60">
            {/* Date Posted Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-blue-400" />
                <span>Date Posted</span>
              </label>
              <select
                value={selectedDatePosted}
                onChange={(e) => setSelectedDatePosted(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">Any Time</option>
                <option value="24h">Past 24 Hours</option>
                <option value="week">Past Week (7 days)</option>
                <option value="month">Past Month (30 days)</option>
              </select>
            </div>

            {/* Experience Level Filter */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-amber-400" />
                <span>Experience Level</span>
              </label>
              <select
                value={selectedExperienceLevel}
                onChange={(e) => setSelectedExperienceLevel(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">All Experience</option>
                <option value="entry">Entry Level (0-2 yrs)</option>
                <option value="mid">Mid Level (2-5 yrs)</option>
                <option value="senior">Senior Level (5+ yrs)</option>
                <option value="lead">Lead / Staff / Architect</option>
              </select>
            </div>

            {/* Workplace Location Model */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Workplace Model</span>
              </label>
              <select
                value={selectedWorkType}
                onChange={(e) => setSelectedWorkType(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">All Workplace Models</option>
                <option value="Remote">Remote Only</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-cyan-400" />
                <span>Job Type</span>
              </label>
              <select
                value={selectedEmploymentType}
                onChange={(e) => setSelectedEmploymentType(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract / Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Reset button if filters active */}
            <div className="flex items-end">
              {hasActiveFilters ? (
                <button
                  onClick={resetFilters}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset All Filters</span>
                </button>
              ) : (
                <div className="hidden lg:block text-[11px] text-slate-500 self-center text-center w-full">
                  All filters default
                </div>
              )}
            </div>
          </div>

          {/* Country Tabs (Scrollable on mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
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
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setViewMode("jobs")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "jobs"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs ({filteredJobs.length})</span>
            </button>

            <button
              onClick={() => setViewMode("companies")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "companies"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Companies ({filteredCompanies.length})</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            </button>
          </div>

          <div className="text-[11px] sm:text-xs text-slate-400 text-center sm:text-right">
            Verified: LinkedIn • RemoteOK • Indeed • Direct ATS
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">
              Querying live jobs & actively hiring companies...
            </p>
          </div>
        ) : viewMode === "jobs" ? (
          filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-slate-900/40 border border-slate-800 p-8 sm:p-12 text-center max-w-xl mx-auto">
              <Globe className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">No Jobs Match These Filters</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.company}
                  company={company}
                  onSelectSimilarCompany={(simComp) => {
                    setSearchQuery(simComp);
                    setViewMode("companies");
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-slate-900/40 border border-slate-800 p-8 sm:p-12 text-center max-w-xl mx-auto">
              <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">No Companies Found</h3>
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
