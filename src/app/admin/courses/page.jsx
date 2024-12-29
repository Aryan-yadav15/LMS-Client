'use client';

import { useState, useEffect } from 'react';

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]); // Initialize as an empty array
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    instructor: '',
    price: '',
    duration: '',
    level: '',
    image: '/default-course-image.jpg', // Default image URL
  });

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        console.log('Fetched courses:', data); // Debugging: Log the fetched data
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/courses/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Course added successfully!');
        setFormData({
          title: '',
          description: '',
          category: '',
          instructor: '',
          price: '',
          duration: '',
          level: '',
          image: '/default-course-image.jpg',
        });
        fetchCourses(); // Refresh the course list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course.');
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch('/api/courses/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert('Course deleted successfully!');
        setCourses(courses.filter(course => course._id !== id));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course.');
    }
  };

  return (
    <div>
      <h1>Manage Courses</h1>
      <form onSubmit={handleAddCourse} className="space-y-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Course Title" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Course Description" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
        <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Instructor ID" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" required />
        <select name="level" value={formData.level} onChange={handleChange} required>
          <option value="">Select Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button type="submit">Add Course</button>
      </form>

      <h2>Existing Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            {course.title}
            <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCoursesPage;