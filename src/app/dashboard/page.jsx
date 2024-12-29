'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for dark mode preference
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }

    // Listen for changes in dark mode setting
    const rootElement = document.documentElement;
    if (isDarkMode) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }

    // Save dark mode preference to localStorage whenever it changes
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    // Simulate API calls for now
    setTimeout(() => {
      setCourses([
        { id: 1, title: 'Introduction to Web Development', progress: 60, nextLesson: 'JavaScript Basics' },
        { id: 2, title: 'Data Structures and Algorithms', progress: 30, nextLesson: 'Binary Trees' },
      ]);
      setInternships([
        { id: 1, company: 'Tech Corp', role: 'Frontend Developer', status: 'In Progress' },
        { id: 2, company: 'Data Systems', role: 'Data Analyst', status: 'Applied' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1>User : {session?.user?.role}</h1>
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Enrolled Courses Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium text-indigo-600">{course.title}</h3>
                    <div className="mt-2">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block text-indigo-600">
                              Progress: {course.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                          <div
                            style={{ width: `${course.progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                          ></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Next Lesson: {course.nextLesson}</p>
                      <Link
                        href={`/courses/${course.id}`}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/courses"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse More Courses
              </Link>
            </div>
          </div>

          {/* Internships Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">My Internships</h2>
              <div className="space-y-4">
                {internships.map((internship) => (
                  <div key={internship.id} className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium text-indigo-600">{internship.role}</h3>
                    <p className="text-gray-600">{internship.company}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        internship.status === 'In Progress'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {internship.status}
                      </span>
                      <Link
                        href={`/internships/${internship.id}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/internships"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Find Internships
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
