import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Fetch all users
    axios
      .get("http://localhost:4000/api/user")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditUserData(user);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUserData({ ...editUserData, [name]: value });
  };

  const handleSave = () => {
    axios
      .patch(`http://localhost:4000/api/user/${editUserId}`, editUserData)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === editUserId ? response.data : user
          )
        );
        setEditUserId(null);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/user/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          User Management
        </h1>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-gray-600">ID</th>
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{user._id}</td>
                <td className="px-4 py-2 text-gray-700">
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      name="username"
                      value={editUserData.username}
                      onChange={handleEditChange}
                      className="px-2 py-1 border rounded-md w-full"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {editUserId === user._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editUserData.email}
                      onChange={handleEditChange}
                      className="px-2 py-1 border rounded-md w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  {editUserId === user._id ? (
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="ml-2 bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
