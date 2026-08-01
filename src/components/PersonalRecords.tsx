import {
  workouts
} from "../data/workouts";



function PersonalRecords(){


let history:any[] = [];


try {

history = JSON.parse(
localStorage.getItem("workout-history") || "[]"
);

}

catch {

history = [];

}




const performances =
history.flatMap(
workout =>
workout.performance || []
);





function getExerciseName(id:string){

return workouts
.flatMap(
workout =>
workout.exercises
)
.find(
exercise =>
exercise.id === id
)?.name
||
id;

}





const weights =
performances
.filter(
item=>item.weight
)
.map(
item=>({

value:parseFloat(item.weight),

exerciseId:item.exerciseId

})
);



const holds =
performances
.filter(
item=>item.duration
)
.map(
item=>({

value:parseFloat(item.duration),

exerciseId:item.exerciseId

})
);



const reps =
performances
.filter(
item=>item.reps
)
.map(
item=>({

value:parseFloat(item.reps),

exerciseId:item.exerciseId

})
);






const maxWeight =
weights.length
?
weights.reduce(
(a,b)=>
a.value > b.value ? a : b
)
:
null;



const maxHold =
holds.length
?
holds.reduce(
(a,b)=>
a.value > b.value ? a : b
)
:
null;



const maxReps =
reps.length
?
reps.reduce(
(a,b)=>
a.value > b.value ? a : b
)
:
null;






return (

<section className="personal-records">


<h2>
🏆 Personal Records
</h2>





<div>

<h3>
Heaviest Weight
</h3>


<p>

{
maxWeight
?
`${getExerciseName(maxWeight.exerciseId)} - ${maxWeight.value}kg`
:
"-"

}

</p>

</div>





<div>

<h3>
Longest Hold
</h3>


<p>

{
maxHold
?
`${getExerciseName(maxHold.exerciseId)} - ${maxHold.value}s`
:
"-"

}

</p>

</div>





<div>

<h3>
Most Reps
</h3>


<p>

{
maxReps
?
`${getExerciseName(maxReps.exerciseId)} - ${maxReps.value} reps`
:
"-"

}

</p>

</div>





</section>

);

}


export default PersonalRecords;