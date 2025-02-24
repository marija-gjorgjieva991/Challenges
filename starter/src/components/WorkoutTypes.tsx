import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { WorkoutTypeName } from "../types";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

interface WorkoutTypesProps {
  exerciseType: WorkoutTypeName | undefined;
  setExerciseType: React.Dispatch<
    React.SetStateAction<WorkoutTypeName | undefined>
  >;
}

export const WorkoutTypes: React.FC<WorkoutTypesProps> = ({
  exerciseType,
  setExerciseType,
}) => {
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutTypeName[]>([]);

  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "workoutTypes"));
        const workoutTypesData: WorkoutTypeName[] = querySnapshot.docs.map(
          (doc) => {
            return doc.data().name as WorkoutTypeName;
          }
        );
        setWorkoutTypes(workoutTypesData);
      } catch (error) {
        console.error("Error fetching workout types:", error);
      }
    };

    fetchWorkoutTypes();
  }, []);

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Exercise Type*</InputLabel>
      <Select
        value={exerciseType ?? ""}
        onChange={(e) => setExerciseType(e.target.value as WorkoutTypeName)}
        label="Exercise Type*"
      >
        <MenuItem value="">Select exercise type</MenuItem>
        {workoutTypes.length > 0 ? (
          workoutTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="">Loading...</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};
