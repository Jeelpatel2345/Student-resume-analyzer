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
      {/* Tab Selectors */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setActiveTab("upload"); setError(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "upload"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileUp className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("paste"); setError(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "paste"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Paste Resume Text</span>
          </button>
        </div>

        {/* Quick Sample Selector */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-slate-500">Quick Test:</span>
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleLoadSample(sample.text)}
              disabled={loading}
              className="text-xs px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
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
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
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

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 text-blue-400 shadow-lg">
            {selectedFile ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <Upload className="w-8 h-8" />}
          </div>

          {selectedFile ? (
            <div>
              <p className="text-base font-bold text-white mb-1">{selectedFile.name}</p>
              <p className="text-xs text-slate-400 mb-3">
                {(selectedFile.size / 1024).toFixed(1)} KB • Ready for ATS & Global Job Analysis
              </p>
              <span className="text-xs text-blue-400 underline">Click to change file</span>
            </div>
          ) : (
            <div>
              <p className="text-base font-bold text-slate-200 mb-1">
                Drop your resume file here or <span className="text-blue-400 underline">browse</span>
              </p>
              <p className="text-xs text-slate-400">
                Supports PDF, DOCX, and TXT (Up to 10MB)
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
            rows={8}
            className="w-full rounded-2xl bg-slate-900/70 border border-slate-800 p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Progress */}
      {loading && (
        <div className="mt-4 p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-blue-400 animate-spin shrink-0" />
          <div>
            <p className="text-xs font-semibold text-blue-200">Analyzing Resume...</p>
            <p className="text-[11px] text-slate-400">{loadingStep || "Processing algorithms..."}</p>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>🔒 100% Private</span>
          <span>•</span>
          <span>ATS Screening</span>
          <span>•</span>
          <span>USA/Canada/UK Jobs</span>
        </div>

        <button
          type="button"
          onClick={() => handleAnalyze()}
          disabled={loading || (activeTab === "upload" && !selectedFile) || (activeTab === "paste" && !pastedText.trim())}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
