"use client";
import { fireStore, auth } from "@/firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface FireStoreDataProps {
  collectionName: string;
  queryConstraints?: QueryConstraint[];
  processData?: (data: any[]) => any[]; 
  filterByUser?: boolean; 
}

export const useFetchItem = ({
  collectionName,
  queryConstraints = [], 
  processData,
  filterByUser = false, 
}: FireStoreDataProps) => {
  const router = useRouter();
  const token = Cookies.get("token");

  return useQuery({
    queryKey: [collectionName, queryConstraints, filterByUser],
    queryFn: async () => {
      try {
        const user = auth.currentUser?.uid;

        if (filterByUser && !user) {
          throw new Error("No user found, redirecting to login.");
        }

        const collectionRef = collection(fireStore, collectionName);

        let combinedQueryConstraints = [...queryConstraints];

        if (filterByUser && user) {
          combinedQueryConstraints.push(where("uid", "==", user));
        }

        const q = combinedQueryConstraints.length > 0
          ? query(collectionRef, ...combinedQueryConstraints)
          : collectionRef;

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
    },
  });
};
