import ExerciseCard from "../components/ExerciseCard";
import WorkoutTimer from "../components/WorkoutTimer";
import RestTimer from "../components/RestTimer";
import ExerciseNavigation from "../components/ExerciseNavigation";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  workouts
} from "../data/workouts";

import {
  useWorkout
} from "../hooks/useWorkout";



function Workout(){


const {
day
}=useParams<{day:string}>();


if(!day){
  return <h1>Workout not found</h1>;
}


const navigate =
useNavigate();





const originalWorkout =
workouts.find(
(item)=>item.id===day
);



const customWorkouts =
JSON.parse(
localStorage.getItem("custom-workouts") || "{}"
);



let workout = originalWorkout;




if(customWorkouts[day]){

  // Custom workout
  if(customWorkouts[day].custom){

    workout = customWorkouts[day];

  }

  // Modified existing workout
  else if(originalWorkout && customWorkouts[day].exercises){

    workout = {

      ...originalWorkout,

      id: originalWorkout.id,

      title: originalWorkout.title,

      focus: originalWorkout.focus,

      exercises: customWorkouts[day].exercises

    };

  }

}


// Outside the custom check
if(!workout){

  return <h1>Workout not found</h1>;

}




const {

exercise,

completedSets,

performance,

setPerformance,

completeExercise,

finishWorkout,

workoutComplete,

workoutSummary,

nextExercise,

previousExercise,

elapsed,

restTimer,

setRestTimer,

restPaused,

setRestPaused,

changeRest,

skipRest,

closeSummary,

}=useWorkout(workout);







function handlePrevious(){

if(workoutSummary){

closeSummary();

return;

}


previousExercise();

}





if(workoutComplete){

return (

<main className="workout-complete">

<section className="completion-card">


<div className="completion-icon">

🎉

</div>


<h1>
Workout Complete
</h1>


<h2>
{workout.title}
</h2>



<div className="completion-stat">

<span>
⏱ Duration
</span>

<strong>
{Math.floor(elapsed / 60)} mins
</strong>

</div>



<div className="completion-stat">

<span>
💪 Exercises
</span>

<strong>
{workout.exercises.length}
</strong>

</div>



<button

className="home-complete-button"

onClick={()=>navigate("/")}

>

Back Home

</button>



</section>

</main>

);

}







return (

<main className="workout-page">



<button

className="back-button"

onClick={()=>navigate("/")}

>

← Back

</button>





<h1>
{workout.title}
</h1>





<div className="workout-controls">


<button

className="finish-button"

onClick={finishWorkout}

>

Finish Workout

</button>


</div>



<WorkoutTimer seconds={elapsed}/>



<div className="workout-controls">





<button

className="all-exercises-button"

onClick={()=>navigate(
`/workout/${day}/exercises`
)}

>

View All Exercises

</button>



</div>







<ExerciseNavigation

previousExercise={handlePrevious}

nextExercise={nextExercise}

/>









{
workoutSummary ? (

<section className="completion-card">


<div className="completion-icon">
🎉
</div>


<h1>
Workout Completed
</h1>


<h2>
{workout.title}
</h2>



<div className="completion-stat">

<span>
⏱ Duration
</span>

<strong>
{Math.floor(elapsed / 60)} mins
</strong>

</div>



<div className="completion-stat">

<span>
💪 Exercises
</span>

<strong>
{workout.exercises.length}
</strong>

</div>



<p>
You've completed all exercises.
</p>



<p>
Review your workout or press Finish Workout to save.
</p>



</section>


)

:

(

exercise && (

<ExerciseCard

exercise={exercise}

completedSets={completedSets}

completeExercise={completeExercise}

performance={performance}

setPerformance={setPerformance}

setRestTimer={setRestTimer}

/>

)

)

}







<RestTimer

seconds={restTimer}

paused={restPaused}

setPaused={setRestPaused}

changeRest={changeRest}

skipRest={skipRest}

/>



</main>

);




}

export default Workout;