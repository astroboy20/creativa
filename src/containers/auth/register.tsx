"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, fireStore, storage } from "../../firebase/firebaseConfig";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  category: string;
  profilePicture: FileList;
  customCategory?: string; // Optional field for custom category
};

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const getUserDataRef = collection(fireStore, "users");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    const categoryToSave = showCustomCategory
      ? data.customCategory
      : data.category;

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentials?.user;

      const profilePictureRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(profilePictureRef, data.profilePicture[0]);
      const profilePictureURL = await getDownloadURL(profilePictureRef);

      await updateProfile(user, {
        displayName: data.name,
        photoURL: profilePictureURL,
      });

      // Store token in cookies
      const token = await user.getIdToken();
      Cookies.set("token", token, { expires: 7 });

      // Store user data in Firestore
      await addDoc(getUserDataRef, {
        name: data.name,
        email: data.email,
        category: categoryToSave,
        profilePictureURL: profilePictureURL,
        createdAt: new Date().toISOString(),
        userId: user.uid,
      });

      toast.success("Registration Successful");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to create an account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle category change and check for "Others"
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowCustomCategory(e.target.value === "Others");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECD2FC66] py-[5%] px-[4%] md:px-[6%]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="text-sm md:text-base lg:text-lg">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-sm md:text-base lg:text-lg">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm md:text-base lg:text-lg"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="mt-1"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm md:text-base lg:text-lg"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
              className="mt-1"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="text-sm md:text-base lg:text-lg"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="mt-1 w-full p-2 border rounded"
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              <option value="Art">Art</option>
              <option value="Photography">Photography</option>
              <option value="Design">Design</option>
              <option value="Music">Music</option>
              <option value="Tech">Tech</option>
              <option value="Vlog">Vlog</option>
              <option value="Fashion">Fashion</option>
              <option value="Fitness">Fitness</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Input field for custom category if "Others" is selected */}
          {showCustomCategory && (
            <div>
              <label
                htmlFor="customCategory"
                className="text-sm md:text-base lg:text-lg"
              >
                Custom Category
              </label>
              <Input
                id="customCategory"
                type="text"
                placeholder="Enter your custom category"
                {...register("customCategory", {
                  required: "Please specify your category",
                })}
                className="mt-1"
              />
              {errors.customCategory && (
                <p className="text-red-500 text-sm">
                  {errors.customCategory.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="profilePicture"
              className="text-sm md:text-base lg:text-lg"
            >
              Profile Picture
            </label>
            <Input
              id="profilePicture"
              type="file"
              accept="image/*"
              {...register("profilePicture", {
                required: "Profile picture is required",
              })}
              className="mt-1"
            />
            {errors.profilePicture && (
              <p className="text-red-500 text-sm">
                {errors.profilePicture.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 text-center">
            <Button
              type="submit"
              className="bg-[#501078] text-white py-2 px-4 rounded mt-4"
            >
              {isLoading ? <ClipLoader color="#fff" /> : "Register"}
            </Button>
            <p>
              Have an account?,
              <Link href={"/login"} className="font-bold underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Register };
