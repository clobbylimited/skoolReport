// app/api/school/create/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import { School, User } from '@/models';

export async function POST(request: Request) {
  await dbConnect();

  const { name, email, address, phoneNumber } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { success: false, error: 'Name and email are required' },
      { status: 400 }
    );
  }

  try {
    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin', 10);
    const adminUser = await User.create({
      username: `admin_${email.split('@')[0]}`,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    // Create school
    const school = await School.create({
      name,
      email,
      address,
      phoneNumber,
      adminUser: adminUser._id,
    });

    // Update admin user with school reference
    await User.findByIdAndUpdate(adminUser._id, { school: school._id });

    return NextResponse.json({
      success: true,
      data: {
        school: {
          id: school._id,
          name: school.name,
          email: school.email,
        },
        adminUser: {
          id: adminUser._id,
          username: adminUser.username,
          email: adminUser.email,
        },
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating school:', error);
    return NextResponse.json(
      { success: false, error: 'Error creating school' },
      { status: 500 }
    );
  }
}