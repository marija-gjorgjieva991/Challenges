import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD5405d3rziYT2zv4_nukCYrFTjwRZwwp4",
  authDomain: "fitness-app-challenge.firebaseapp.com",
  projectId: "fitness-app-challenge",
  storageBucket: "fitness-app-challenge.firebasestorage.app",
  messagingSenderId: "665927600301",
  appId: "1:665927600301:web:3dd9eb13f35c8efced5e24",
  measurementId: "G-5Y87QHE5C2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, realtimeDb, googleProvider, signInWithPopup, signOut };

const uploadUsers = async () => {
  const usersCollection = collection(db, "users");
  const user = {
    id: "user123",
    username: "john_doe",
    email: "john@example.com",
    password: "hashed_password_here",
    createdAt: new Date().toISOString(),
  };

  try {
    const querySnapshot = await getDocs(usersCollection);
    const userExists = querySnapshot.docs.some(
      (doc) => doc.data().id === user.id
    );

    if (!userExists) {
      await addDoc(usersCollection, user);
      console.log(`User ${user.username} added successfully!`);
    } else {
      console.log(`User ${user.username} already exists!`);
    }
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};

const uploadWorkouts = async (userId: string) => {
  const workoutsCollection = collection(db, "workouts");
  const workout = {
    id: "1",
    userId: userId,
    exerciseType: "Running",
    duration: 30,
    intensity: "Medium",
    date: new Date().toISOString(),
  };

  try {
    const querySnapshot = await getDocs(workoutsCollection);
    const workoutExists = querySnapshot.docs.some(
      (doc) => doc.data().id === workout.id
    );

    if (!workoutExists) {
      await addDoc(workoutsCollection, workout);
      console.log(`Workout for user ${userId} added successfully!`);
    } else {
      console.log(`Workout for user ${userId} already exists!`);
    }
  } catch (error) {
    console.error("Error adding workout: ", error);
  }
};

const uploadInitialData = async (user: User) => {
  if (localStorage.getItem("initialDataUploaded")) {
    return;
  }

  if (user) {
    await uploadUsers();
    await uploadWorkouts(user.uid);
    localStorage.setItem("initialDataUploaded", "true");
    console.log("Initial data uploaded successfully!");
  } else {
    console.log("No user signed in. Please sign in first.");
  }
};

onAuthStateChanged(auth, async (authUser: User | null) => {
  if (authUser) {
    console.log("User signed in:", authUser);
    await uploadInitialData(authUser);
  } else {
    console.log("No user signed in.");
  }
});
