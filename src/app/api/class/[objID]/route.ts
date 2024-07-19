// app/api/sessions/create/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
// /auth/[...nextauth]"
import dbConnect from "@/lib/mongodb";
import {
  Classes,
  Department,
  School,
  Subject
} from "@/models";

export async function GET(request: Request, { params }: any) {
  const { objID } = params;

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
    const singleClass = await Classes.findOne({ school: school.id, _id: objID });
    const departments = await Department.find({ school: school.id });
    const subjects = await Subject.find({ class: singleClass.id }).populate({
      path: 'department',
      select: 'name -_id' // Only include name and email, exclude _id
    });

    // .populate('courses'); //Populate evry thing
    // const terms = await Term.find({ session: singleClass });

    return NextResponse.json(
      {
        success: true,
        class: singleClass,
        subjects: subjects,
        students: [],
        departments: departments
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error fetching session data:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching session data" },
      { status: 500 }
    );
  }
}
