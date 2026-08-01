import SetInput from "./SetInput";

import ExerciseTimer from "./ExerciseTimer";

import PreviousPerformance from "./PreviousPerformance";

import ProgressionSuggestion from "./ProgressionSuggestion";


type Props = {

  exercise:any;

  completedSets:string[];

  toggleSet:(id:string)=>void;

  completeExercise:()=>void;

  performance:any[];

  setPerformance:(value:any)=>void;

};






function ExerciseCard({

exercise,

completedSets,

toggleSet,

completeExercise,

performance,

setPerformance

}:Props) {






const finished =
completedSets.includes(
`${exercise.id}-complete`
)
||
completedSets.filter(
item=>item.startsWith(exercise.id)
).length >= exercise.sets;


return (

<section

className={
`current-exercise-card ${
exercise.category?.toLowerCase()
}`

}

>


<p>
CURRENT
</p>


{
finished && (

<p className="exercise-complete">

✓ Complete

</p>

)
}






<h2>
{exercise.name}
</h2>





<PreviousPerformance

exerciseId={exercise.id}

/>





<ProgressionSuggestion

exercise={exercise}

/>






{
exercise.duration && (



<ExerciseTimer

duration={exercise.duration}

onComplete={completeExercise}

/>

)

}



{
exercise.reps && (

<h3>
{exercise.sets} × {exercise.reps}
</h3>

)

}



{
exercise.equipment && (

<p>

<strong>
Equipment:
</strong>

{" "}

{exercise.equipment}

</p>

)

}



{
exercise.notes && (

<p>

<strong>
Notes:
</strong>

{" "}

{exercise.notes}

</p>

)

}



{
exercise.superset && (

<p>

Superset {exercise.superset}

</p>

)

}





{
!exercise.duration && (

<>

<SetInput

exerciseId={exercise.id}

sets={exercise.sets}

tracking={exercise.tracking ?? "none"}

performance={performance}

setPerformance={setPerformance}

/>




</>

)

}



</section>

);


}


export default ExerciseCard;