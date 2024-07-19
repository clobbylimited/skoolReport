// app/api/sessions/create/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
// /auth/[...nextauth]"
import dbConnect from "@/lib/mongodb";
import {
  Session,
  School,
  Term,
  Department,
  Classes,
  Subject,
  GradeCommentBoard,
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
    const school = await School.findOne({ adminUser: (session.user as any).id });

    if (!school) {
      return NextResponse.json(
        { success: false, error: "School not found" },
        { status: 404 }
      );
    }

    const foundSession = await Session.findOne({ school: school.id });
    const foundTerm = await Term.findOne({ school: school.id });
    const foundDepartment = await Department.findOne({ school: school.id });
    const foundClasses = await Classes.findOne({ school: school.id });
    const foundSubject = await Subject.findOne({ school: school.id });
    const foundGradeCommentBoard = await GradeCommentBoard.findOne({
      school: school.id,
    });

    const steps = [
      {
        id: "session",
        title: "Create Academic Session",
        description: "Create an academic session for your school",
        route: "/dashboard/session/create",
        active: foundSession ? true : false,
      },
      {
        id: "terms",
        title: "Create Terms",
        description: "You have to create an terms under your sessions",
        route: "/dashboard/session",
        active: foundTerm ? true : false,
      },
      {
        id: "departments",
        title: "Setup Departments",
        description:
          "Setup your school departments for easy subject placements",
        route: "/dashboard/create-department",
        active: foundDepartment ? true : false,
      },
      {
        id: "classes",
        title: "Create Classes",
        description: "Create a list of classes in your school",
        route: "/dashboard/create-class",
        active: foundClasses ? true : false,
      },
      {
        id: "subjects",
        title: "Add Subjects",
        route: "/dashboard/add-subject",
        active: foundSubject ? true : false,
      },
      {
        id: "grading",
        title: "Setup Grade Comment Board",
        description:
          "This will be used to grad your student and give comments based on performances",
        route: "/dashboard/setup-grading",
        active: foundGradeCommentBoard ? true : false,
      },
    ];
    
    return NextResponse.json(
      {
        success: true,
        data: {
          steps: steps
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching setup data:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching setup data" },
      { status: 500 }
    );
  }
}
