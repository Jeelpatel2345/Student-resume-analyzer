import { NextRequest, NextResponse } from "next/server";
import { parseResumeBuffer, parseResumeText } from "@/lib/parser";
import { analyzeResume } from "@/lib/analyzer";
import { matchJobsForResume, getHiringCompanies } from "@/lib/jobs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    let rawText = "";
    let filename = "";

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const textInput = formData.get("text") as string | null;

      if (file && file.size > 0) {
        filename = file.name;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const parsedDoc = await parseResumeBuffer(buffer, file.type, filename);
        rawText = parsedDoc.rawText;
      } else if (textInput) {
        rawText = textInput;
      }
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      rawText = body.text || "";
    }

    if (!rawText || rawText.trim().length < 20) {
      return NextResponse.json(
        { error: "Please provide a valid resume file (PDF, DOCX) or paste resume text." },
        { status: 400 }
      );
    }

    // 1. Parse structured resume data
    const parsed = parseResumeText(rawText);

    // 2. Perform deep ATS critique & score analysis
    const analysis = analyzeResume(parsed);

    // 3. Match international jobs (USA, Canada, UK, Germany, Worldwide)
    const jobs = await matchJobsForResume(parsed.skills);
    const companies = getHiringCompanies(jobs);

    // 4. Save into Database via Prisma
    let resumeRecord;
    try {
      resumeRecord = await prisma.resume.create({
        data: {
          candidateName: parsed.name,
          email: parsed.email,
          phone: parsed.phone,
          location: parsed.location,
          targetRole: parsed.targetRole,
          rawText: parsed.rawText,
          analyses: {
            create: {
              overallScore: analysis.overallScore,
              skillsScore: analysis.skillsScore,
              experienceScore: analysis.experienceScore,
              educationScore: analysis.educationScore,
              formattingScore: analysis.formattingScore,
              extractedSkills: JSON.stringify(analysis.extractedSkills),
              missingSkills: JSON.stringify(analysis.missingSkills),
              strengths: JSON.stringify(analysis.strengths),
              weaknesses: JSON.stringify(analysis.weaknesses),
              bulletCritique: JSON.stringify(analysis.bulletCritique),
              educationData: JSON.stringify(parsed.education),
              experienceData: JSON.stringify(parsed.experience)
            }
          }
        },
        include: {
          analyses: true
        }
      });
    } catch (dbErr) {
      console.warn("Database storage warning (proceeding in-memory):", dbErr);
    }

    return NextResponse.json({
      success: true,
      resumeId: resumeRecord?.id || "temp-session-id",
      parsed,
      analysis,
      jobs,
      companies
    });
  } catch (error: any) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred while analyzing the resume." },
      { status: 500 }
    );
  }
}
