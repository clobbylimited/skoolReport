// app/api/sessions/create/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
// /auth/[...nextauth]"
import dbConnect from "@/lib/mongodb";
import { Subject, School } from "@/models";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  await dbConnect();

  const { subjects } = await request.json();

  if (!subjects) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const school = await School.findOne({
      adminUser: (session.user as any).id,
    });

    if (!school) {
      return NextResponse.json(
        { success: false, error: "School not found" },
        { status: 404 }
      );
    }

    const newSubjects = await Subject.insertMany(
      subjects.map((subject: any) => ({ ...subject, school: school._id }))
    );

    return NextResponse.json(
      {
        success: true,
        data: newSubjects
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating subjects:", error);
    return NextResponse.json(
      { success: false, error: "Error creating subjects" },
      { status: 500 }
    );
  }
}
