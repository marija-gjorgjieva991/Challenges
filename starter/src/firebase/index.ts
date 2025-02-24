import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
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

const usersData = [
  {
    id: "user123",
    username: "john_doe",
    email: "john@example.com",
    password: "hashed_password_here",
    createdAt: "2023-01-01T08:00:00Z",
  },
  {
    id: "user456",
    username: "jane_smith",
    email: "jane@example.com",
    password: "hashed_password_here",
    createdAt: "2023-01-02T10:30:00Z",
  },
];

const workoutsData = [
  {
    id: "1",
    userId: "user123",
    exerciseType: "Running",
    duration: 30,
    intensity: "Medium",
    date: "2023-01-01T08:00:00Z",
  },
  {
    id: "2",
    userId: "user123",
    exerciseType: "Cycling",
    duration: 45,
    intensity: "High",
    date: "2023-01-02T10:30:00Z",
  },
  {
    id: "3",
    userId: "user456",
    exerciseType: "Swimming",
    duration: 60,
    intensity: "Low",
    date: "2023-01-03T15:15:00Z",
  },
];

const uploadUsers = async () => {
  const usersCollection = collection(db, "users");

  for (const user of usersData) {
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
  }
};

const uploadWorkouts = async (userId: string) => {
  const workoutsCollection = collection(db, "workouts");

  const workoutsForUser = workoutsData.map((workout) => ({
    ...workout,
    userId: userId,
  }));

  for (const workout of workoutsForUser) {
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
  }
};

const uploadInitialData = async () => {
  if (localStorage.getItem("initialDataUploaded")) {
    return;
  }

  const user = auth.currentUser;
  if (user) {
    await uploadUsers();
    await uploadWorkouts(user.uid);
    localStorage.setItem("initialDataUploaded", "true");
  } else {
    console.log("No user signed in. Please sign in first.");
  }
};

uploadInitialData();
