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
        const user = auth.currentUser;

        // Optionally redirect to login if no token (or use different logic)
        // if (!token) {
        //   router.push("/login");
        //   throw new Error("Authentication required");
        // }

        const collectionRef = collection(fireStore, collectionName);

        // Build the query based on provided constraints and user filter
        let combinedQueryConstraints = [...queryConstraints];

        // If filtering by user, add a query constraint for the user's uid
        if (filterByUser && user?.uid) {
          combinedQueryConstraints.push(where("uid", "==", user.uid));
        }

        // Build the query based on whether constraints exist
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
