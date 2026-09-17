import { NextRequest, NextResponse } from "next/server";
import { matchJobsForResume, getHiringCompanies } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country") || "ALL";
    const workType = searchParams.get("workType") || "ALL";
    const employmentType = searchParams.get("employmentType") || "ALL";
    const experienceLevel = searchParams.get("experienceLevel") || "ALL";
    const datePosted = searchParams.get("datePosted") || "ALL";
    const roleQuery = searchParams.get("role") || "";
    const skillsParam = searchParams.get("skills") || "";

    const skills = skillsParam
      ? skillsParam.split(",").map(s => s.trim()).filter(Boolean)
      : ["React", "TypeScript", "Node.js", "AWS", "Python"];

    const jobs = await matchJobsForResume(skills, {
      country,
      workType,
      employmentType,
      experienceLevel,
      datePosted,
      roleQuery
    });

    const companies = getHiringCompanies(jobs);

    return NextResponse.json({
      success: true,
      total: jobs.length,
      jobs,
      totalCompanies: companies.length,
      companies
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
