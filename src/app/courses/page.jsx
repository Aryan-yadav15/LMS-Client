'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <Link href={`/courses/${course.slug}`}>
              <a className="text-indigo-600 hover:text-indigo-800">View Course</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}