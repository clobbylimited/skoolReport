// app/api/sessions/create/route.ts
import { NextResponse } from 'next/server';
import { getServerSession} from 'next-auth/next';
import { authOptions } from "@/lib/auth"
// /auth/[...nextauth]"
import dbConnect from '@/lib/mongodb';
import { Term, School } from '@/models';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  await dbConnect();

  const { name, startDate, endDate, session: SS } = await request.json();

  if (!name || !startDate || !endDate || !SS) {
    return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const school = await School.findOne({ adminUser: (session.user as any).id });

    if (!school) {
      return NextResponse.json({ success: false, error: 'School not found' }, { status: 404 });
    }

    const newSession = await Term.create({
      name,
      startDate,
      endDate,
      school: school._id,
      session: SS
    });

    return NextResponse.json({
      success: true,
      data: {
        id: newSession._id,
        name: newSession.name,
        startDate: newSession.startDate,
        endDate: newSession.endDate,
        session: newSession.session
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating term:', error);
    return NextResponse.json({ success: false, error: 'Error creating term' }, { status: 500 });
  }
}