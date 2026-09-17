"use client";

import React from "react";
import {
  ExternalLink,
  MapPin,
  DollarSign,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Building,
  Award,
  Clock,
  UserCheck
} from "lucide-react";
import { JobOpportunity } from "@/lib/jobs";

interface JobCardProps {
  job: JobOpportunity;
}

const COUNTRY_FLAGS: Record<string, string> = {
  USA: "🇺🇸",
  Canada: "🇨🇦",
  UK: "🇬🇧",
  Germany: "🇩🇪",
  Australia: "🇦🇺",
  "Worldwide Remote": "🌍"
};

export function JobCard({ job }: JobCardProps) {
  const flag = COUNTRY_FLAGS[job.country] || "🌐";

  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 p-4 sm:p-5 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-200 shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2.5 sm:gap-3 mb-3">
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-700/60 flex items-center justify-center font-bold text-sm sm:text-lg text-white shrink-0 shadow-inner mt-0.5 sm:mt-0">
              {job.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1 break-words">
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs text-slate-400 mt-0.5">
                <span className="font-medium text-slate-300 truncate max-w-[120px]">{job.company}</span>
                <span>•</span>
                <span>{job.source}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{job.postedAt}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="shrink-0">
            <div
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border ${
                job.matchScore >= 80
                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                  : job.matchScore >= 60
                  ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                  : "bg-amber-500/15 text-amber-300 border-amber-500/30"
              }`}
            >
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{job.matchScore}% Match</span>
            </div>
          </div>
        </div>

        {/* Badges row (Country, Work Model, Employment Type, Experience Level) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs mb-3 text-slate-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
            <span>{flag}</span>
            <span className="font-semibold text-slate-200">{job.country}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-slate-800/60 border border-slate-700/50">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate max-w-[120px]">{job.location}</span>
          </span>

          {/* Work Type: Remote, Hybrid, On-site */}
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border font-medium ${
            job.workType === "Remote"
              ? "bg-cyan-950/40 text-cyan-300 border-cyan-800/40"
              : job.workType === "Hybrid"
              ? "bg-indigo-950/40 text-indigo-300 border-indigo-800/40"
              : "bg-slate-800 text-slate-300 border-slate-700/60"
          }`}>
            <Briefcase className="w-3 h-3 shrink-0" />
            <span>{job.workType}</span>
          </span>

          {/* Employment Type */}
          {job.employmentType && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-blue-950/40 text-blue-300 border border-blue-800/40 font-medium">
              <span>{job.employmentType}</span>
            </span>
          )}

          {/* Experience Level */}
          {job.experienceLevel && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-amber-950/30 text-amber-300 border border-amber-800/40 font-medium">
              <UserCheck className="w-3 h-3 shrink-0" />
              <span>{job.experienceLevel}</span>
            </span>
          )}

          {job.visaSponsored && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-purple-950/40 text-purple-300 border border-purple-800/40 font-medium">
              ✈️ Visa Sponsored
            </span>
          )}

          {job.salary && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 font-semibold">
              <DollarSign className="w-3 h-3 shrink-0" />
              <span>{job.salary}</span>
            </span>
          )}
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {job.description}
        </p>

        {/* Matched vs Missing Skills */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Skill Match:</span>
            <span className="text-[10px] text-slate-500">
              {job.matchedSkills.length} matched / {job.requiredSkills.length} required
            </span>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {job.matchedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{skill}</span>
              </span>
            ))}
            {job.missingSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700/60"
              >
                <span className="text-slate-500">+</span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <span className="text-[11px] text-slate-500 text-center sm:text-left">
          Source: <strong className="text-slate-400">{job.source}</strong>
        </span>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/15 transition-all hover:scale-101"
        >
          <span>Apply to {job.company}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
