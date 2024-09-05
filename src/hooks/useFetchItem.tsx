"use client";
import { fireStore } from "@/firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, QueryConstraint } from "firebase/firestore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface FireStoreDataProps {
  collectionName: string;
  queryConstraints?: QueryConstraint[]; 
  processData?: (data: any[]) => any[]; // Function to process data
}

export const useFetchItem = ({ collectionName, queryConstraints, processData }: FireStoreDataProps) => {
  const router = useRouter();
  const token = Cookies.get("token");

  return useQuery({
    queryKey: [collectionName, queryConstraints],
    queryFn: async () => {
      try {
        if (!token) {
          router.push("/login");
          throw new Error("Authentication required");
        }

        const collectionRef = collection(fireStore, collectionName);

        let q;
        if (queryConstraints && queryConstraints.length > 0) {
          q = query(collectionRef, ...queryConstraints);
        } else {
          q = collectionRef;
        }

        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return processData ? processData(items) : items;
      } catch (error: any) {
        console.error("Error fetching Firestore data:", error.message);
        throw new Error(error?.message || "Error fetching data from Firestore");
      }
    }
  });
};
