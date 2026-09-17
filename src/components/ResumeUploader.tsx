"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Sparkles, ArrowRight, CheckCircle2, AlertCircle, FileUp, Loader2 } from "lucide-react";
import { SAMPLE_RESUMES } from "@/lib/sampleResumes";

interface ResumeUploaderProps {
  onAnalysisComplete?: (data: any) => void;
  redirectOnSuccess?: boolean;
}

export function ResumeUploader({ onAnalysisComplete, redirectOnSuccess = true }: ResumeUploaderProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit. Please upload a smaller document.");
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleAnalyze = async (overrideText?: string) => {
    setError(null);
    setLoading(true);

    try {
      setLoadingStep("Extracting sections, skills, & work history...");
      let body: FormData | string;
      let headers: Record<string, string> = {};

      if (overrideText) {
        body = JSON.stringify({ text: overrideText });
        headers = { "Content-Type": "application/json" };
      } else if (activeTab === "upload") {
        if (!selectedFile) {
          setError("Please select a PDF or DOCX file to analyze.");
          setLoading(false);
          return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        body = formData;
      } else {
        if (!pastedText.trim() || pastedText.length < 50) {
          setError("Please paste the full text of your resume (at least 50 characters).");
          setLoading(false);
          return;
        }
        body = JSON.stringify({ text: pastedText });
        headers = { "Content-Type": "application/json" };
      }

      setTimeout(() => setLoadingStep("Calculating ATS Score & bullet critiques..."), 700);
      setTimeout(() => setLoadingStep("Matching international companies in USA, CA, UK..."), 1400);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers,
        body
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze resume.");
      }

      // Store in session storage so results are immediately accessible
      sessionStorage.setItem("last_analysis", JSON.stringify(data));

      if (onAnalysisComplete) {
        onAnalysisComplete(data);
      }

      if (redirectOnSuccess) {
        router.push("/analyze");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while uploading. Please try again.");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const handleLoadSample = (sampleText: string) => {
    setPastedText(sampleText);
    setActiveTab("paste");
    handleAnalyze(sampleText);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tab Selectors & Sample Chips */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setActiveTab("upload"); setError(null); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "upload"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileUp className="w-4 h-4 shrink-0" />
            <span className="truncate">Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("paste"); setError(null); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "paste"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span className="truncate">Paste Text</span>
          </button>
        </div>

        {/* Sample Resumes (Scrollable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[11px] text-slate-500 shrink-0">Sample:</span>
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleLoadSample(sample.text)}
              disabled={loading}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shrink-0"
            >
              {sample.role}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Zone */}
      {activeTab === "upload" ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all ${
            selectedFile
              ? "border-blue-500 bg-blue-950/20"
              : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-3 text-blue-400 shadow-lg">
            {selectedFile ? <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" /> : <Upload className="w-7 h-7 sm:w-8 sm:h-8" />}
          </div>

          {selectedFile ? (
            <div className="px-2">
              <p className="text-sm sm:text-base font-bold text-white mb-1 break-all">{selectedFile.name}</p>
              <p className="text-xs text-slate-400 mb-2">
                {(selectedFile.size / 1024).toFixed(1)} KB • Ready for ATS analysis
              </p>
              <span className="text-xs text-blue-400 underline font-medium">Click to change file</span>
            </div>
          ) : (
            <div className="px-2">
              <p className="text-sm sm:text-base font-bold text-slate-200 mb-1">
                Drop your resume here or <span className="text-blue-400 underline">browse</span>
              </p>
              <p className="text-xs text-slate-400">
                PDF, DOCX, or TXT (Up to 10MB)
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your full resume text here (Header, Skills, Work Experience, Education)..."
            rows={7}
            className="w-full rounded-2xl bg-slate-900/70 border border-slate-800 p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span className="break-words">{error}</span>
        </div>
      )}

      {/* Loading Progress */}
      {loading && (
        <div className="mt-4 p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-blue-400 animate-spin shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-blue-200">Analyzing Resume...</p>
            <p className="text-[11px] text-slate-400 truncate">{loadingStep || "Processing algorithms..."}</p>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <div className="text-[11px] text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 text-center">
          <span>🔒 100% Private</span>
          <span>•</span>
          <span>ATS Screening</span>
          <span>•</span>
          <span>Global Matches</span>
        </div>

        <button
          type="button"
          onClick={() => handleAnalyze()}
          disabled={loading || (activeTab === "upload" && !selectedFile) || (activeTab === "paste" && !pastedText.trim())}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analyze & Match Global Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
