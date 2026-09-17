"use client";

import React from "react";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ScoreGauge({ score, size = 180, strokeWidth = 14 }: ScoreGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color = "#ef4444"; // Red (<60)
  let statusText = "Needs Work";
  let badgeColor = "bg-red-500/10 text-red-400 border-red-500/20";

  if (score >= 80) {
    color = "#10b981"; // Emerald
    statusText = "ATS Strong";
    badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  } else if (score >= 65) {
    color = "#3b82f6"; // Blue
    statusText = "Good Potential";
    badgeColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  } else if (score >= 50) {
    color = "#f59e0b"; // Amber
    statusText = "Average";
    badgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-white tracking-tight">{score}</span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider -mt-0.5">
            / 100 ATS
          </span>
        </div>
      </div>

      <div className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor}`}>
        {statusText}
      </div>
    </div>
  );
}
