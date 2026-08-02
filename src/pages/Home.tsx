import Stats from "../components/Stats";

import PersonalRecords from "../components/PersonalRecords";

import {
  useNavigate
} from "react-router-dom";

import {
  workouts
} from "../data/workouts";



function Home(){


const navigate =
useNavigate();







const customWorkouts =
JSON.parse(
localStorage.getItem("custom-workouts") || "{}"
);


const allWorkouts = [

...workouts,

...Object.entries(customWorkouts)

.filter(([_,workout]:any)=>workout.custom)

.map(([id,workout]:any)=>({

id,

title:workout.title,

focus:workout.focus,

exercises:workout.exercises,

custom:true

}))

];



const savedWorkouts =
JSON.parse(
localStorage.getItem("custom-workouts") || "{}"
);



return (


<main className="home-page">





<h1 className="app-title">

🤸 Calisthenics Tracker

</h1>





<Stats/>

<PersonalRecords/>







<h2>
Choose Workout
</h2>







<div className="workout-buttons">





{

allWorkouts.map(workout=>(


<div

key={workout.id}

className={`workout-card ${
  workout.custom
  ? "custom-workout"
  : workout.id
}`}

onClick={()=>{

const activeWorkout =
localStorage.getItem("active-workout");


if(
activeWorkout &&
activeWorkout !== workout.id
){


const confirmSwitch =
window.confirm(

"You have an active workout session open. Do you want to start this workout instead? Your current session will be closed."

);


if(!confirmSwitch){

return;

}


localStorage.removeItem(
`workout-${activeWorkout}`
);


}


localStorage.setItem(
"active-workout",
workout.id
);


navigate(`/workout/${workout.id}`);

}}

>





<div className="workout-title-row">

<strong>
{workout.title}
</strong>

{
workout.custom && (
<span className="custom-label">
CUSTOM
</span>
)
}

</div>





{
!workout.custom && savedWorkouts[workout.id]?.modified && (

<span className="modified-badge">

🛠 MODIFIED

</span>

)

}







<span>

{workout.focus}

</span>






{
workout.custom && (

<button

className="delete-workout"

onClick={(e)=>{

e.stopPropagation();


const confirmDelete =
window.confirm(
`Delete ${workout.title}?`
);


if(!confirmDelete){

return;

}



const saved =
JSON.parse(
localStorage.getItem("custom-workouts") || "{}"
);



delete saved[workout.id];


localStorage.setItem(
"custom-workouts",
JSON.stringify(saved)
);



window.location.reload();


}}

>

🗑 Delete

</button>

)
}



</div>



))

}







</div>




<button

className="add-workout-button"

onClick={()=>navigate("/create-workout")}

>

+ Add Workout

</button>




<button


className="history-button"



onClick={()=>navigate("/history")}



>


Workout History


</button>






</main>


);


}



export default Home;