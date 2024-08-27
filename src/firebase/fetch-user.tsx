import { auth } from "./firebaseConfig";


export const fetchUserData = async () => {
  const user = auth.currentUser;

  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    //   photoURL: user.photoURL,
    };
  } else {
    // User is not signed in
    return null;
  }
};
