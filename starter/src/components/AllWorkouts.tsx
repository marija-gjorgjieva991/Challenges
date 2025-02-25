import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Workout } from "../types";
import { WorkoutItem } from "./WorkoutItem";

const AllWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const q = query(
          collection(db, "workouts"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const workoutsData: Workout[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Workout;
          return { ...data, id: doc.id };
        });
        setWorkouts(workoutsData);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return;
  }

  if (workouts.length === 0) {
    return <div>No workouts available. Add your first workout!</div>;
  }

  return (
    <div className="workouts-container">
      {workouts.map((workout) => (
        <WorkoutItem
          key={workout.id}
          id={workout.id}
          type={workout.type}
          duration={workout.duration}
          intensity={workout.intensity}
          userId={workout.userId}
        />
      ))}
    </div>
  );
};

export default AllWorkouts;
