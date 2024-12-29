import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find({ isPublished: true }).lean();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}