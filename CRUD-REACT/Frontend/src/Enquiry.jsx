import React, { useEffect, useState } from "react";
import axios from "axios";

const Enquiry = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/viewuser");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8080/updateuser/${editId}`, formData);
      } else {
        await axios.post("http://localhost:8080/createuser", formData);
      }
      setFormData({ name: "", phone: "", message: "" });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, phone: user.phone, message: user.message || "" });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteuser/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg shadow-lg mb-10">
        {editId ? "Edit Enquiry" : "Submit Your Enquiry"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-xl transition-all hover:shadow-2xl mb-10 border border-indigo-100"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Phone Number"
          onChange={handleChange}
          required
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <input
          type="text"
          name="message"
          value={formData.message}
          placeholder="Message"
          onChange={handleChange}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
          type="submit"
          className="md:col-span-3 w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
        >
          {editId ? "Update Enquiry" : "Submit Enquiry"}
        </button>
      </form>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl p-6 border border-indigo-100">
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">All Enquiries</h3>
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">{user.message}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiry;
