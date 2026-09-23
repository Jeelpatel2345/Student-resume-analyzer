"use client";

import React, { useState } from "react";
import {
  Building2,
  ExternalLink,
  MapPin,
  Briefcase,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Plane
} from "lucide-react";
import { CompanySpotlight } from "@/lib/jobs";

interface CompanyCardProps {
  company: CompanySpotlight;
  onSelectRole?: (roleId: string) => void;
  onSelectSimilarCompany?: (companyName: string) => void;
}

const COUNTRY_FLAGS: Record<string, string> = {
  USA: "🇺🇸",
  Canada: "🇨🇦",
  UK: "🇬🇧",
  Germany: "🇩🇪",
  Australia: "🇦🇺",
  "Worldwide Remote": "🌍"
};

export function CompanyCard({ company, onSelectRole, onSelectSimilarCompany }: CompanyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const flag = COUNTRY_FLAGS[company.country] || "🌐";

  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 p-4 sm:p-5 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-200 shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-blue-600/30 to-indigo-600/30 border border-blue-500/30 flex items-center justify-center font-bold text-sm sm:text-lg text-blue-300 shrink-0 shadow-inner mt-0.5 sm:mt-0">
              {company.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-blue-400 transition-colors break-words">
                  {company.company}
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>Actively Hiring</span>
                </span>
                {company.industry && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {company.industry}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1 truncate">
                  <span>{flag}</span>
                  <span className="truncate">{company.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
            <div
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border ${
                company.highestMatchScore >= 80
                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                  : company.highestMatchScore >= 60
                  ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                  : "bg-amber-500/15 text-amber-300 border-amber-500/30"
              }`}
            >
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Up to {company.highestMatchScore}% Match</span>
            </div>
            <span className="text-[10px] text-slate-500">
              Avg match: {company.avgMatchScore}%
            </span>
          </div>
        </div>

        {/* Roles Count & Details */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs mb-3 text-slate-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-blue-950/40 text-blue-300 border border-blue-800/40 font-medium">
            <Briefcase className="w-3 h-3 shrink-0" />
            <span>{company.openRolesCount} Matched {company.openRolesCount === 1 ? "Role" : "Roles"}</span>
          </span>

          {company.visaSponsoredAvailable && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-purple-950/40 text-purple-300 border border-purple-800/40 font-medium">
              <Plane className="w-3 h-3 text-purple-400 shrink-0" />
              <span>Visa Sponsorship</span>
            </span>
          )}
        </div>

        {/* Top matching tech stack */}
        <div className="mb-3 sm:mb-4">
          <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
            Key Tech Stack Hired For:
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {company.topSkills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium bg-slate-800/90 text-slate-300 border border-slate-700/60"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Open Roles Preview Dropdown */}
        <div className="space-y-2 mb-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 text-xs font-medium text-slate-300 transition-colors"
          >
            <span>View {company.roles.length} Open {company.roles.length === 1 ? "Position" : "Positions"}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expanded && (
            <div className="space-y-2 pt-1">
              {company.roles.map((role) => (
                <div
                  key={role.id}
                  className="p-2.5 sm:p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-200 truncate">{role.title}</div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                      <span>{role.experienceLevel}</span>
                      <span>•</span>
                      <span>{role.workType}</span>
                      <span>•</span>
                      <span>{role.employmentType}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{role.salary}</span>
                    </div>
                  </div>
                  <a
                    href={role.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-end sm:self-auto shrink-0 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-[11px] font-medium flex items-center gap-1 transition-all"
                  >
                    <span>Apply</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Similar Companies Explorer */}
        {company.similarCompanies && company.similarCompanies.length > 0 && (
          <div className="mb-3 pt-2 border-t border-slate-800/60">
            <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-blue-400" />
              <span>Similar Peer Companies:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {company.similarCompanies.map((simCompany) => (
                <button
                  key={simCompany}
                  type="button"
                  onClick={() => onSelectSimilarCompany && onSelectSimilarCompany(simCompany)}
                  className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium bg-blue-950/40 hover:bg-blue-900/60 text-blue-300 border border-blue-800/40 hover:border-blue-500/50 transition-colors cursor-pointer"
                  title={`Explore ${simCompany}`}
                >
                  {simCompany}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <span className="text-[11px] text-slate-500 text-center sm:text-left">
          Source: <strong className="text-slate-400">{company.roles[0]?.source || "Verified"}</strong>
        </span>
        <a
          href={company.companyWebsite || company.careersUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/15 transition-all hover:scale-101"
        >
          <span>Explore Careers</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
