"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login"); // Redirect to login if no user
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [router]);

  // Optionally show a loading state while checking authentication
  if (user === null) {
    return <p>Loading...</p>;
  }

  return <>{children}</>; // Render children if authenticated
};

export default ProtectedRoute;
