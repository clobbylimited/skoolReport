// app/api/sessions/create/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
// /auth/[...nextauth]"
import dbConnect from "@/lib/mongodb";
import {
  Classes,
  School
} from "@/models";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  await dbConnect();

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
    const classes = await Classes.find({ school: school.id });

    return NextResponse.json(
      {
        success: true,
        classes: classes,
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error fetching classes data:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching classes data" },
      { status: 500 }
    );
  }
}
