import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    await Course.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}