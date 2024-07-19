import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import {School, User} from '@/models';
// import User from '../../../models/User';

export async function POST(req: Request) {
  const { name, address } = await req.json();

  await dbConnect();

  // Create School
  const newSchool = new School({
    name,
    address,
  });

  await newSchool.save();

  // Create Admin User
  const adminUser = new User({
    school_id: newSchool._id,
    username: 'admin',
    password: 'admin',
    role: 'admin',
  });

  await adminUser.save();

  return NextResponse.json({ message: 'School and Admin user created' });
}
