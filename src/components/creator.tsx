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

export interface CreatorData {
  name: string;
  categories: string;
  src: string;
  rating: number;
  profileName: string | any;
  profileImage: string | any;
}

const CreatorForm: React.FC = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<any>("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState<File | null | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const categoryOptions = [
    "Art",
    "Photography",
    "Tech",
    "Design",
    "Beauty",
    "Food",
  ];

  const getCreatorsDataRef = collection(fireStore, "creators");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let imageUrl = "";

    if (imageFile) {
      const imageRef = ref(storage, `creator/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const creatorData: CreatorData = {
      name,
      categories,
      src: imageUrl,
      rating: 0,
      profileName: auth?.currentUser?.displayName,
      profileImage: auth?.currentUser?.photoURL,
    };
    try {
      await addDoc(getCreatorsDataRef, creatorData);

      setName("");
      setCategories("");
      setImageSrc("");
      setImageFile("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
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
        <Select
          value={categories}
          onValueChange={(value) => setCategories(value)}
          required
        >
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

      {/* {imageSrc && (
        <div className="mb-4">
          <img src={imageSrc} alt="Profile Preview" className="rounded-md" />
        </div>
      )} */}

      <Button
        type="submit"
        className="w-full bg-[#501078] h-[45px] text-white hover:bg-transparent hover:text-[#501078] hover:border-2 hover:border-[#501078]"
      >
        {isLoading ? <ClipLoader color="#fff" /> : "  Create Idea"}
      </Button>
    </form>
  );
};

export { CreatorForm };
