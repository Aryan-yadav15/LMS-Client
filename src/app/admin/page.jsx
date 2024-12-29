'use client';

import { useState } from 'react';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    instructor: '',
    price: '',
    duration: '',
    level: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add course.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Course Description"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="text"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          placeholder="Instructor ID"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration"
          required
        />
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
        >
          <option value="">Select Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AdminDashboard;