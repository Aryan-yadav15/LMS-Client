import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { title, description, category, instructor, price, duration, level } = body;

    // Validate required fields
    if (!title || !description || !category || !instructor || !price || !duration || !level) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new course
    const course = await Course.create({
      title,
      slug: title.toLowerCase().replace(/ /g, '-'),
      description,
      category,
      instructor,
      price,
      duration,
      level,
      isPublished: true, // Assuming you want to publish the course immediately
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error inserting course:', error);
    return NextResponse.json({ error: 'Failed to insert course' }, { status: 500 });
  }
}