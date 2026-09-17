import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: {
        analyses: {
          take: 1,
          orderBy: { createdAt: "desc" }
        }
      }
    });

    return NextResponse.json({
      success: true,
      resumes
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to fetch resumes", resumes: [] },
      { status: 500 }
    );
  }
}
