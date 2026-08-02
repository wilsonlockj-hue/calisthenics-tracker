import {
useNavigate
} from "react-router-dom";


function WorkoutLibrary(){

const navigate = useNavigate();


const customWorkouts =
JSON.parse(
localStorage.getItem("custom-workouts") || "{}"
);



const workouts =
Object.entries(customWorkouts)

.filter(([_,workout]:any)=>workout.custom)

.map(([id,workout]:any)=>({

id,

...workout

}));



return (

<main className="library-page">


<button

className="back-button"

onClick={()=>navigate(-1)}

>

← Back

</button>



<h1>
📚 Workout Library
</h1>



<p>
Your custom workouts
</p>



<div className="library-grid">


{
workouts.map((workout:any)=>(


<section

className="library-card"

key={workout.id}

>


<h2>
{workout.title}
</h2>


<span>
{workout.focus}
</span>


<p>
💪 {workout.exercises.length} Exercises
</p>



<div>


<button

onClick={()=>navigate(
`/workout/${workout.id}/exercises`
)}

>

Edit

</button>



<button

onClick={()=>{

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

Delete

</button>


</div>



</section>


))

}


</div>



<button

className="add-workout-button"

onClick={()=>navigate("/create-workout")}

>

+ Create Workout

</button>



</main>

);


}


export default WorkoutLibrary;