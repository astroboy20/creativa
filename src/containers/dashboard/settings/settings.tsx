"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, storage } from "@/firebase/firebaseConfig"; // Import Firebase Storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const [userData, setUserData] = useState<any>({
    displayName: "",
    email: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null); // State for the selected image file

  // Fetching user data from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          displayName: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  // Upload profile picture and update user profile
  const handleUpdateProfile = async () => {
    setLoading(true);
    const user = auth.currentUser;

    if (user) {
      try {
        let photoURL = userData.photoURL;

        // If a new image is selected, upload it to Firebase Storage
        if (imageFile) {
          const storageRef = ref(storage, `profileImages/${user.uid}`);
          const uploadTask = uploadBytesResumable(storageRef, imageFile);

          // Wait for the upload to complete and get the image URL
          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => reject(error),
              async () => {
                photoURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(photoURL);
              }
            );
          });
        }

        // Update profile with the new display name and photo URL
        await updateProfile(user, {
          displayName: userData.displayName,
          photoURL: photoURL,
        });

        // Update local state with the new photo URL
        setUserData((prev:any) => ({ ...prev, photoURL }));

        toast.success("Your profile has been successfully updated.");
      } catch (error) {
        toast.error("Failed to update your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#501078] mb-4">
        Profile Settings
      </h2>

      {/* Profile Picture Preview */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        {userData.photoURL && (
          <img
            src={userData.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block text-sm text-gray-500"
        />
      </div>

      {/* Display Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Display Name
        </label>
        <Input
          type="text"
          name="displayName"
          value={userData.displayName}
          onChange={handleChange}
          placeholder="Enter your display name"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Input type="email" name="email" value={userData.email} disabled />
      </div>

      {/* Update Button */}
      <Button
        className="bg-[#501078] text-white w-full"
        onClick={handleUpdateProfile}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
};

export { ProfileSettings };
