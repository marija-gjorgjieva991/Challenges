import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/auth-context";
import { Intensity, Workout, WorkoutTypeName } from "../types";
import { useNavigate } from "react-router-dom";
import { WorkoutTypes } from "./WorkoutTypes";
import {
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { MenuItem } from "@mui/material";

const AddNewWorkout: React.FC = () => {
  const user = useAuth();
  const [exerciseType, setExerciseType] = useState<WorkoutTypeName | undefined>(
    undefined
  );
  const [duration, setDuration] = useState<number>(0);
  const [intensity, setIntensity] = useState<Intensity>(Intensity.Low);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (user && exerciseType) {
      const newWorkout: Workout = {
        id: new Date().toISOString(),
        type: exerciseType,
        duration,
        intensity,
        createdAt: Date.now(),
      };

      setIsSubmitting(true);

      try {
        await addDoc(collection(db, "workouts"), newWorkout);

        navigate("/all-workouts");
      } catch (error) {
        console.error("Error adding workout:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Please log in to add a workout.");
    }
  };

  if (!user) {
    return <div>Please log in to add a workout.</div>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "30%", margin: "0 auto" }}>
      <WorkoutTypes
        exerciseType={exerciseType}
        setExerciseType={setExerciseType}
      />

      <TextField
        label="Duration"
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        fullWidth
        margin="normal"
        sx={{ width: "100%" }}
      />

      <FormControl fullWidth margin="normal" sx={{ width: "100%" }}>
        <InputLabel>Intensity*</InputLabel>
        <Select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value as Intensity)}
          label="Intensity*"
        >
          <MenuItem value={Intensity.Low}>Low</MenuItem>
          <MenuItem value={Intensity.Medium}>Medium</MenuItem>
          <MenuItem value={Intensity.High}>High</MenuItem>
        </Select>
      </FormControl>

      <Button
        className="add-button"
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ width: "100%" }}
      >
        Add Workout
      </Button>
    </form>
  );
};

export default AddNewWorkout;
