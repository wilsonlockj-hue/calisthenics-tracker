type Props = {
  seconds:number;
};


function WorkoutTimer({
  seconds
}:Props){


const minutes =
Math.floor(seconds / 60);

const remaining =
seconds % 60;


return (

<div className="timer-card workout-timer">

<span>
Workout Time
</span>


<strong>
{minutes}:{remaining
.toString()
.padStart(2,"0")}
</strong>


</div>

);


}


export default WorkoutTimer;