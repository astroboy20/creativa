import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "./firebaseConfig";

export const fetchAllUsers = async () => {
  const userCollection = collection(fireStore, "users");
  const usersSnapshot = await getDocs(userCollection);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  return usersList
};
