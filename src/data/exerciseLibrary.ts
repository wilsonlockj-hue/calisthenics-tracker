import { workouts } from "./workouts";


const allExercises = workouts.flatMap(
(workout)=>workout.exercises
);



export const exerciseLibrary = Array.from(

new Map(

allExercises.map(exercise=>[

exercise.name,

exercise

])

).values()

);