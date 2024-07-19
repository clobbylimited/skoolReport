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
    const school = await School.findOne({
      adminUser: (session.user as any).id,
    });

    if (!school) {
      return NextResponse.json(
        { success: false, error: "School not found" },
        { status: 404 }
      );
    }
    const models = {
      "session": Session,
      "term": Term,
      "department": Department,
      "classes": Classes,
      "subject": Subject,
      "gradeCommentBoard": GradeCommentBoard,
    };
    
    const foundEntities: any = {};
    for (const [key, model] of Object.entries(models)) {
      foundEntities[key] = await model.findOne({ school: school.id });
    }
    
    const steps = [
      {
        id: "session",
        title: "Create Academic Session",
        description: "Create an academic session for your school",
        route: "/dashboard/session/create",
        active: !!foundEntities.session,
      },
      {
        id: "terms",
        title: "Create Terms",
        description: "You have to create terms under your sessions",
        route: "/dashboard/session",
        active: !!foundEntities.session && !!foundEntities.term,
      },
      {
        id: "departments",
        title: "Setup Departments",
        description: "Setup your school departments for easy subject placements",
        route: "/dashboard/department",
        active: !!foundEntities.session && !!foundEntities.term && !!foundEntities.department,
      },
      {
        id: "classes",
        title: "Create Classes",
        description: "Create a list of classes in your school",
        route: "/dashboard/classes",
        active: !!foundEntities.session && !!foundEntities.term && !!foundEntities.department && !!foundEntities.classes,
      },
      {
        id: "subjects",
        title: "Add Subjects",
        route: "/dashboard/add-subject",
        active: !!foundEntities.session && !!foundEntities.term && !!foundEntities.department && !!foundEntities.classes && !!foundEntities.subject,
      },
      {
        id: "grading",
        title: "Setup Grade Comment Board",
        description: "This will be used to grade your students and give comments based on performances",
        route: "/dashboard/setup-grading",
        active: !!foundEntities.session && !!foundEntities.term && !!foundEntities.department && !!foundEntities.classes && !!foundEntities.subject && !!foundEntities.gradeCommentBoard,
      },
    ];
    
    const currentIndex = steps.findIndex(step => !step.active);
    
    return NextResponse.json(
      {
        success: true,
        steps: steps,
        currentIndex: currentIndex,
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
