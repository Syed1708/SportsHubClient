import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, updateUser, setLoading } = use(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        displayName: name,
        photoURL: photoURL,
      });
      setLoading(false);
      toast.success("Profile updated Successfully!!");
    } catch (error) {
      toast.error(`Profile not updated !! ${error}`);
      setLoading(false);
    }
  };
 
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <div className="mb-4 text-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/0j1YVXZ/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
        <h3 className="text-xl font-semibold mt-2">{user?.displayName}</h3>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Display Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Photo URL</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
