"use client";
import { fireStore, auth } from "@/firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  query,
  QueryConstraint,
  where,
  orderBy,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface FireStoreDataProps {
  collectionName: string;
  queryConstraints?: QueryConstraint[];
  processData?: (data: any[]) => any[];
  filterByUser?: boolean;
  orderByField?: string; // Optional: Field to order by
  orderDirection?: "asc" | "desc"; // Optional: Ascending or descending order
}

export const useFetchItem = ({
  collectionName,
  queryConstraints = [],
  processData,
  filterByUser = false,
  orderByField, // Field to order by if needed
  orderDirection = "asc", // Default to ascending if provided
}: FireStoreDataProps) => {
  const router = useRouter();
  const token = Cookies.get("token");

  return useQuery({
    queryKey: [collectionName, queryConstraints, filterByUser, orderByField, orderDirection],
    queryFn: async () => {
      try {
        const user = auth.currentUser?.uid;

        if (filterByUser && !user) {
          router.push("/login");
          throw new Error("No user found, redirecting to login.");
        }

        const collectionRef = collection(fireStore, collectionName);
        let combinedQueryConstraints = [...queryConstraints];

        // Apply filtering by user if required
        if (filterByUser && user) {
          combinedQueryConstraints.push(where("uid", "==", user));
        }

        // Conditionally apply `orderBy` only if `orderByField` is provided
        if (orderByField) {
          combinedQueryConstraints.push(orderBy(orderByField, orderDirection));
        }

        const q = query(collectionRef, ...combinedQueryConstraints);

        // Fetch documents
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
