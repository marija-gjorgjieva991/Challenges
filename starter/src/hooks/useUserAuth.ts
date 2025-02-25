import { useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";

const useUserAuth = (user: User | null) => {
  useEffect(() => {
    if (user) {
      const addUserToFirestore = async () => {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);
        const userExists = querySnapshot.docs.some(
          (doc) => doc.data().id === user.uid
        );

        if (!userExists) {
          await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            createdAt: new Date().toISOString(),
          });

          console.log("User added to Firestore.");
        } else {
          console.log("User already exists in Firestore.");
        }
      };

      addUserToFirestore();
    } else {
      console.log("No user signed in.");
    }
  }, [user]);
};

export default useUserAuth;
