import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/auth/get_departments')
      .then((response) => {
        console.log(response.data); // Debugging: Log API response
        if (response.data.Status) {
          setDepartments(response.data.Result); // Ensure departments is an array
        } else {
          alert('Failed to fetch departments');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error fetching departments');
      });
  }, []);
  

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Departments</h2>
      <p className="mb-6">Here is a list of all departments...</p>
  
      {/* Link Button to Add New Department */}
      <Link
        to="/admin-dashboard/department/add_department"
        className="inline-block px-6 py-2 mb-4 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Add New Department
      </Link>
  
      {/* Departments Table */}
      {departments.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-gray-600">Department ID</th>
              <th className="px-4 py-2 text-left text-gray-600">Department Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.id} className="border-b">
                <td className="px-4 py-2 text-gray-800">{department.id}</td>
                <td className="px-4 py-2 text-gray-800">{department.name}</td>
                <td className="px-4 py-2">
                  {/* Add actions like Edit or Delete here */}
                  <Link
                    to={`/admin-dashboard/department/edit/${department.id}`}
                    className="text-indigo-600 hover:text-indigo-800 mr-2"
                  >
                    Edit
                  </Link>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No departments available.</p>
      )}
    </div>
  );
  
};

export default Department;
