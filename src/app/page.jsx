import Image from "next/image";
import Layout from "./_components/(Global)/Layout";
import {
  BookOpen,
  Users,
  Calendar,
  Trophy,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";
import { AnnouncementBanner } from "./_components/(miniComponents)/AnnouncementStrip";

const featuredCourses = [
  {
    title: "Introduction to Web Development",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    rating: 4.8,
    students: 1234,
    image: "/course1.jpg",
  },
  {
    title: "Digital Marketing Masterclass",
    instructor: "Michael Chen",
    duration: "6 weeks",
    rating: 4.9,
    students: 856,
    image: "/course2.jpg",
  },
  {
    title: "Data Science Fundamentals",
    instructor: "Alex Thompson",
    duration: "10 weeks",
    rating: 4.7,
    students: 2156,
    image: "/course3.jpg",
  },
];

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <div className="bg-white p-2 rounded-2xl">
        <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Unlock Your Potential with Expert-Led Courses
            </h1>
            <p className="text-blue-100 text-lg mb-6">
              Discover a world of knowledge with our curated collection of
              courses designed to help you achieve your goals.
            </p>
            <button
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold 
                           hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2"
            >
              Explore Courses <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">200+</h3>
              <p className="text-gray-600">Active Courses</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">15K+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Trophy size={24} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">98%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Featured Courses */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Courses
            </h2>
            <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              View All <ArrowRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="h-48 bg-gray-200 relative">
                  {/* Placeholder for course image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-current"
                      />
                      <span className="text-gray-700">{course.rating}</span>
                    </div>
                    <span className="text-gray-600">{course.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Upcoming Live Workshops
            </h2>
            <p className="text-purple-100">
              Join our expert-led live sessions and enhance your skills
            </p>
          </div>
          <button
            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold 
                         hover:bg-purple-50 transition-colors duration-200 flex items-center gap-2"
          >
            View Schedule <Calendar size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
