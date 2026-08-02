function Stats(){


let history:any[] = [];


try {

history = JSON.parse(
localStorage.getItem("workout-history") || "[]"
);

}

catch {

history = [];

}



const totalWorkouts =
history.length;



const totalSeconds =
history.reduce(
(total, workout)=>
total + workout.duration,
0
);



const hours =
Math.floor(
totalSeconds / 3600
);



const minutes =
Math.floor(
(totalSeconds % 3600) / 60
);



return (

<section className="workouts-stat">


<div>

<h3>
💪 Workouts
</h3>

<p>
{totalWorkouts}
</p>

</div>



<div>

<h3>
⏱ Time
</h3>

<p>
{hours}h {minutes}m
</p>

</div>


</section>

);

}


export default Stats;