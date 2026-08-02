import {
  exerciseLibrary
} from "../data/exerciseLibrary";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  workouts
} from "../data/workouts";

import {
  useEffect,
  useState
} from "react";


import type { Workout } from "../types/workout";





const CUSTOM_WORKOUTS_KEY = "custom-workouts";


function ExerciseList(){





const {
day
}=useParams<{day:string}>();

if(!day){
  return <h1>Workout not found</h1>;
}

const navigate = useNavigate();



const originalWorkout =
workouts.find(
(item)=>item.id===day
);


const customWorkouts =
JSON.parse(
localStorage.getItem(CUSTOM_WORKOUTS_KEY) || "{}"
);






let workout: Workout | undefined = originalWorkout;


// Custom created workout
if(customWorkouts[day]?.custom){

workout = customWorkouts[day];

}


// Modified original workout
else if(customWorkouts[day]?.exercises && originalWorkout){

workout = {

...originalWorkout,

exercises:
customWorkouts[day].exercises

};

}


if(!workout){
  return <h1>Workout not found</h1>;
}


const [editMode,setEditMode] =
useState(false);






const [hasModified,setHasModified] =
useState(false);




const [exercises,setExercises] =
useState<any[]>(()=>{

if(!workout){

return [];

}


if(workout.custom){

return workout.exercises;

}


const saved =
JSON.parse(
localStorage.getItem(CUSTOM_WORKOUTS_KEY) || "{}"
);


return saved[workout.id]?.exercises ?? workout.exercises;


});



const emptyExercise = {

name:"",
category:"pull",
sets:3,
reps:8,
rest:60,
equipment:"",
notes:""

};



const [newExercise,setNewExercise] =
useState<any>(emptyExercise);



const [addingExercise,setAddingExercise] =
useState(false);



const [showLibrary,setShowLibrary] =
useState(false);



const [editingExercise,setEditingExercise] =
useState<string|null>(null);




useEffect(()=>{


if(!workout || !hasModified){

return;

}

if(!workout){

return;

}


const saved =
JSON.parse(
localStorage.getItem(CUSTOM_WORKOUTS_KEY) || "{}"
);



saved[workout.id] = {

...saved[workout.id],

originalId: workout.id,

modified:true,

exercises: exercises

};

localStorage.setItem(
CUSTOM_WORKOUTS_KEY,
JSON.stringify(saved)
);



},[exercises,workout,hasModified]);








function removeExercise(id:string){

setHasModified(true);

setExercises(prev=>

prev.filter(
exercise=>exercise.id !== id
)

);

}




function moveExercise(
index:number,
direction:number
){


const updated =
[...exercises];


const newIndex =
index + direction;



if(
newIndex < 0 ||
newIndex >= updated.length
){

return;

}



[
updated[index],
updated[newIndex]

]=[

updated[newIndex],
updated[index]

];


setHasModified(true);

setExercises(updated);


}





function editExercise(id:string){


const exercise =
exercises.find(
item=>item.id===id
);



if(!exercise){

return;

}



setNewExercise({

name:exercise.name,

category:exercise.category,

sets:exercise.sets,

reps:exercise.reps,

rest:exercise.rest,

equipment:exercise.equipment ?? "",

notes:exercise.notes ?? ""

});



setEditingExercise(id);

setAddingExercise(true);


}

function revertWorkout(){

if(!workout){
  return;
}

const saved =
JSON.parse(
localStorage.getItem(CUSTOM_WORKOUTS_KEY) || "{}"
);


delete saved[workout.id];


localStorage.setItem(
CUSTOM_WORKOUTS_KEY,
JSON.stringify(saved)
);


setExercises(workout.exercises);

setHasModified(false);

}










function saveExercise(){

setHasModified(true);


if(!newExercise.name){

return;

}






if(editingExercise){


setExercises(prev=>

prev.map(exercise=>

exercise.id===editingExercise

?

{
...exercise,
...newExercise
}

:

exercise

)

);


}

if(editingExercise){

setExercises(prev=>

prev.map(exercise=>

exercise.id===editingExercise

?

{
...exercise,
...newExercise
}

:

exercise

)

);

}

else{

setExercises(prev=>[

...prev,

{

id:`custom-${Date.now()}`,

...newExercise

}

]);

}


setNewExercise(emptyExercise);

setEditingExercise(null);

setAddingExercise(false);


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



<button

className={
editMode
?
"edit-workout-button active"
:
"edit-workout-button"
}

onClick={()=>setEditMode(!editMode)}

>

{
editMode
?
"✓ Done Editing"
:
"✏️ Edit Workout"
}

</button>




{
editMode && !workout.custom && (

<button

className="revert-button"

onClick={revertWorkout}

>

↩ Revert to Original

</button>

)

}











<div className="exercise-list">


{

exercises.map((exercise,index)=>(


<section

key={exercise.id}

className={
`exercise-row ${
exercise.category?.toLowerCase()
}`
}

>


<div className="exercise-number">

{index+1}

</div>



<div className="exercise-content">


<h2>
{exercise.name}
</h2>



<p>

{
exercise.duration

?

`⏱ ${exercise.duration}`

:

`${exercise.sets} × ${exercise.reps}`

}

</p>



{
exercise.equipment && (

<span>

🏋️ {exercise.equipment}

</span>

)

}



{
exercise.notes && (

<p>
{exercise.notes}
</p>

)

}


</div>



<div className="exercise-rest">

Rest

<strong>

{exercise.rest}s

</strong>

</div>












{

editMode && (

<div className="exercise-actions">


<button

className="move-exercise"

onClick={()=>moveExercise(index,-1)}

>

↑

</button>



<button

className="move-exercise"

onClick={()=>moveExercise(index,1)}

>

↓

</button>




<button

className="edit-exercise"

onClick={()=>editExercise(exercise.id)}

>

✏️

</button>




<button

className="delete-exercise"

onClick={()=>removeExercise(exercise.id)}

>

🗑

</button>



</div>

)

}



</section>


))

}


</div>





{
editMode && (

<div className="exercise-add-buttons">


<button

className="add-exercise"

onClick={()=>{

setShowLibrary(!showLibrary);

}}

>

📚 Exercise Library

</button>



<button

className="add-exercise"

onClick={()=>{

setEditingExercise(null);

setNewExercise(emptyExercise);

setAddingExercise(!addingExercise);

}}

>

✏️ Create Exercise

</button>


</div>

)

}




{
showLibrary && (

<section className="exercise-library">

<h2>
📚 Exercise Library
</h2>


<div className="library-grid">

{
exerciseLibrary.map(exercise=>(

<div

key={exercise.id}

className="library-card"

>


<div>

<h3>
{exercise.name}
</h3>


<span>
{exercise.category}
</span>

</div>



<button

onClick={()=>{


const alreadyAdded =
exercises.some(
(item)=>item.name === exercise.name
);


if(alreadyAdded){

return;

}


setExercises(prev=>[

...prev,

{

...exercise,

id:`custom-${Date.now()}`

}

]);


setHasModified(true);


}}

>

+

</button>


</div>

))

}

</div>


</section>

)

}







{

addingExercise && (

<section className="exercise-edit-panel">


<h2>

{

editingExercise

?

"Edit Exercise"

:

"New Exercise"

}

</h2>





<label>

Exercise Name

</label>


<input

value={newExercise.name}

placeholder="e.g. Pull Ups"

onChange={(e)=>

setNewExercise({

...newExercise,

name:e.target.value

})

}

/>





<label>

Category

</label>


<select

value={newExercise.category}

onChange={(e)=>

setNewExercise({

...newExercise,

category:e.target.value

})

}

>

<option value="pull">

Pull

</option>


<option value="push">

Push

</option>


<option value="skill">

Skill

</option>


<option value="core">

Core

</option>


<option value="warmup">

Warmup

</option>


</select>





<label>

Sets

</label>


<input

type="number"

value={newExercise.sets}

onChange={(e)=>

setNewExercise({

...newExercise,

sets:Number(e.target.value)

})

}

/>





<label>

Reps

</label>


<input

type="number"

value={newExercise.reps}

onChange={(e)=>

setNewExercise({

...newExercise,

reps:Number(e.target.value)

})

}

/>





<label>

Rest (seconds)

</label>


<input

type="number"

value={newExercise.rest}

onChange={(e)=>

setNewExercise({

...newExercise,

rest:Number(e.target.value)

})

}

/>





<label>

Equipment

</label>


<input

value={newExercise.equipment}

onChange={(e)=>

setNewExercise({

...newExercise,

equipment:e.target.value

})

}

/>





<label>

Notes

</label>


<input

value={newExercise.notes}

onChange={(e)=>

setNewExercise({

...newExercise,

notes:e.target.value

})

}

/>





<button

className="save-exercise"

onClick={saveExercise}

>

{

editingExercise

?

"Update Exercise"

:

"Save Exercise"

}

</button>



</section>

)

}







</main>

);

}




export default ExerciseList;