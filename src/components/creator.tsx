import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, fireStore, storage } from "@/firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export interface CreatorData {
  name: string;
  categories: string;
  src: string;
  rating: number[];
  profileName: string | any;
  profileImage: string | any;
  email: string | any;
  description: string;
  userId: string | any;
}

interface CreatorFormProps {
  onClose: () => void;
}

const CreatorForm: React.FC<CreatorFormProps> = ({ onClose }) => {
  const router = useRouter();
  const uId = auth?.currentUser?.uid ? auth?.currentUser?.uid : null;
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState<string>("");
  const [imageSrc, setImageSrc] = useState("");
  const [description, setDecription] = useState("");
  const [imageFile, setImageFile] = useState<File | null | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const categoryOptions = [
    "Art",
    "Photography",
    "Tech",
    "Design",
    "Beauty",
    "Food",
    "Others",
  ];

  const getCreatorsDataRef = collection(fireStore, "creators");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (value: string) => {
    if (value === "Others") {
      setIsCustomCategory(true);
      setCategories(null);
    } else {
      setIsCustomCategory(false);
      setCategories(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!uId) {
      toast.error("You need to be logged in to create a project.");
      router.push("/login"); // Redirect to login page if not authenticated
      return;
    }

    setIsLoading(true);
    let imageUrl = "";

    if (imageFile) {
      const imageRef = ref(storage, `creator/${imageFile.name}`);
      try {
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const categoryToSave = isCustomCategory ? customCategory : categories;

    const creatorData: CreatorData = {
      name,
      categories: categoryToSave || "",
      src: imageUrl,
      rating: [],
      profileName: auth?.currentUser?.displayName,
      profileImage: auth?.currentUser?.photoURL,
      email: auth?.currentUser?.email,
      description,
      userId: auth?.currentUser?.uid,
    };

    try {
      await addDoc(getCreatorsDataRef, creatorData);
      setName("");
      setCategories("");
      setCustomCategory("");
      setImageSrc("");
      setImageFile(null);
      onClose();
      toast.success("Project Created");
    } catch (error: any) {
      toast.error("Error adding Project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Name of Project
        </label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="categories" className="block text-sm font-medium">
          Categories
        </label>
        <Select onValueChange={(value) => handleCategoryChange(value)} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select categories" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((cat, index) => (
              <SelectItem key={index} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isCustomCategory && (
        <div className="mb-4">
          <label htmlFor="customCategory" className="block text-sm font-medium">
            Custom Category
          </label>
          <Input
            id="customCategory"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            required={isCustomCategory}
          />
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter your Description"
          value={description}
          onChange={(e) => setDecription(e.target.value)}
          required
          className="w-full p-3 border"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium">
          Image
        </label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#501078] h-[45px] text-white hover:bg-transparent hover:text-[#501078] hover:border-2 hover:border-[#501078]"
      >
        {isLoading ? <ClipLoader color="#fff" /> : "Create Idea"}
      </Button>
    </form>
  );
};

export { CreatorForm };
