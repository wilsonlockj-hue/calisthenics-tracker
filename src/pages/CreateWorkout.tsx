import {
useNavigate
} from "react-router-dom";

import {
useState
} from "react";


const CUSTOM_WORKOUTS_KEY =
"custom-workouts";



function CreateWorkout(){


const navigate =
useNavigate();


const [title,setTitle] =
useState("");



const [focus,setFocus] =
useState("");





function createWorkout(){


if(!title){

return;

}



const id =
"custom-" + Date.now();



const saved =
JSON.parse(
localStorage.getItem(CUSTOM_WORKOUTS_KEY) || "{}"
);



saved[id] = {

id,

custom:true,

title,

focus,

exercises:[]

};



localStorage.setItem(

CUSTOM_WORKOUTS_KEY,

JSON.stringify(saved)

);



navigate(`/workout/${id}`);

}



return (

<main className="create-workout-page">


<h1>
Create Workout
</h1>


<label>
Workout Name
</label>


<input

placeholder="e.g. Leg Day"

value={title}

onChange={(e)=>
setTitle(e.target.value)
}

/>



<label>
Focus
</label>


<input

placeholder="e.g. Strength + Mobility"

value={focus}

onChange={(e)=>
setFocus(e.target.value)
}

/>



<button

onClick={createWorkout}

>

Create Workout

</button>


</main>

);


}


export default CreateWorkout;