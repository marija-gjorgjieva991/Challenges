import { Workout } from "../types";

export const WorkoutItem: React.FC<Workout> = ({
  id,
  type,
  duration,
  intensity,
}) => {
  return (
    <div key={id} className="workout-div">
      <h3>{type} </h3>
      <p>Duration: {duration}</p>
      <p>Intensity: {intensity}</p>
    </div>
  );
};
