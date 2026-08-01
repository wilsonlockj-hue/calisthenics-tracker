import {
  useNavigate,
  useParams
} from "react-router-dom";


import {
  workouts
} from "../data/workouts";



function ExerciseList(){


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

return <h1>Workout not found</h1>;

}



return (

<main className="exercise-list-page">


<button

className="back-button"

onClick={()=>navigate(-1)}

>

← Back

</button>



<h1>
{workout.title}
</h1>


<div className="exercise-list">


{
workout.exercises.map((exercise,index)=>(


<div

className="exercise-row"

key={exercise.id}

>


<div>


<strong>
{index+1}. {exercise.name}
</strong>



{
exercise.duration ?

<p>
⏱ {exercise.duration}
</p>

:

<p>
{exercise.sets} × {exercise.reps}
</p>

}



{
exercise.equipment && (

<p>
Equipment: {exercise.equipment}
</p>

)

}



{
exercise.notes && (

<p>
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



</div>



<span>

Rest:
<br/>

{exercise.rest}s

</span>



</div>


))

}


</div>


</main>

);


}


export default ExerciseList;