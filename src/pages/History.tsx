import {
  useNavigate
} from "react-router-dom";


import {
  useState
} from "react";


import {
  workouts
} from "../data/workouts";




function History(){



const navigate =
useNavigate();



const [expanded,setExpanded] =
useState<number | null>(null);





let history:any[] = [];



try {


history = JSON.parse(

localStorage.getItem("workout-history") || "[]"

);


}

catch {


history = [];


}







function getExerciseName(id:string){


return workouts

.flatMap(
workout =>
workout.exercises
)

.find(
exercise =>
exercise.id === id
)

?.name

||

id;


}







return (


<main className="history-page">





<button

className="back-button"

onClick={()=>navigate("/")}

>

← Back

</button>






<h1>
Workout History
</h1>







{

history.length === 0 && (


<p>
No workouts completed yet.
</p>


)

}








{

history

.slice()

.reverse()

.map(

session=>{


const isExpanded =
expanded === session.id;




const grouped:any = {};



session.performance?.forEach(

(item:any)=>{


if(!grouped[item.exerciseId]){


grouped[item.exerciseId] = [];


}


grouped[item.exerciseId].push(item);



}

);





return (



<section


key={session.id}


className="history-card"


onClick={()=>


setExpanded(

isExpanded

?

null

:

session.id

)

}


>





<h2>
{session.title}
</h2>





<p>
{session.date}
</p>





<p>
⏱ {Math.floor(session.duration / 60)} mins
</p>





{

!isExpanded && (


<p className="history-expand">

Tap to view details →

</p>


)

}







{

isExpanded && (



<div className="history-details">





<h3>
Performance
</h3>







{

Object.entries(grouped)

.map(

([exerciseId,sets]:any)=>(



<div


key={exerciseId}


className="history-exercise"


>



<h4>

{getExerciseName(exerciseId)}

</h4>







{

sets.map(

(set:any)=>(



<p


key={

set.exerciseId +

set.setNumber

}


>


Set {set.setNumber}:{" "}



{

set.weight && (

<>
{set.weight} ×{" "}
</>

)

}





{

set.reps && (

<>
{set.reps} reps
</>

)

}





{

set.duration && (

<>
{set.duration}s
</>

)

}





</p>



)

)

}







</div>



)

)

}







</div>



)

}





</section>




)


}

)

}





</main>


);


}



export default History;