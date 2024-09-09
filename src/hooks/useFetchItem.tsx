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
  queryConstraints?: QueryConstraint[]; // Optional query constraints
  processData?: (data: any[]) => any[]; // Optional function to process data
  filterByUser?: boolean; // Optional flag to filter by authenticated user's uid
}

export const useFetchItem = ({
  collectionName,
  queryConstraints = [], // Default to an empty array
  processData,
  filterByUser = false, // Default false, no filtering by user unless specified
}: FireStoreDataProps) => {
  const router = useRouter();
  const token = Cookies.get("token");

  return useQuery({
    queryKey: [collectionName, queryConstraints, filterByUser],
    queryFn: async () => {
      try {
        // Get current user's UID
        const user = auth.currentUser?.uid;
        console.log("Current User UID:", user); // Log the user UID for debugging

        // If filtering by user and no user is found, throw an error
        if (filterByUser && !user) {
          throw new Error("No user found, redirecting to login.");
        }

        const collectionRef = collection(fireStore, collectionName);

        // Combine the query constraints and add user filter if needed
        let combinedQueryConstraints = [...queryConstraints];

        // If filtering by user, add the uid condition
        if (filterByUser && user) {
          combinedQueryConstraints.push(where("uid", "==", user));
        }

        // Create the query with constraints or return the collection reference
        const q = combinedQueryConstraints.length > 0
          ? query(collectionRef, ...combinedQueryConstraints)
          : collectionRef;

        // Fetch the documents from Firestore
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // If a processData function is provided, use it, otherwise return items
        return processData ? processData(items) : items;
      } catch (error: any) {
        console.error("Error fetching Firestore data:", error.message);
        throw new Error(error?.message || "Error fetching data from Firestore");
      }
    },
  });
};
