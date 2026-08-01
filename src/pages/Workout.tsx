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
}=useParams();



const navigate =
useNavigate();



const workout =
workouts.find(
(item)=>item.id===day
);



if(!workout){

return <h1>Workout not found</h1>

}



const {

currentExercise,

exercise,

completedSets,

performance,

setPerformance,

toggleSet,

completeExercise,

finishWorkout,

workoutComplete,

nextExercise,

previousExercise,

elapsed,

restTimer,

restPaused,

setRestPaused,

changeRest,

skipRest

}=useWorkout(workout);






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








<ExerciseNavigation

previousExercise={previousExercise}

nextExercise={nextExercise}

/>





<button

className="all-exercises-button"

onClick={()=>navigate(
`/workout/${day}/exercises`
)}

>

View All Exercises

</button>



</div>







<ExerciseCard

exercise={exercise}

completedSets={completedSets}

toggleSet={toggleSet}

completeExercise={completeExercise}

performance={performance}

setPerformance={setPerformance}

/>







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