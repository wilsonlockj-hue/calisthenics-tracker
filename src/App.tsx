import { useEffect, useState } from "react";
import {
  Dumbbell,
  Timer,
  Play,
  ArrowLeft,
  CheckCircle,
  SkipForward,
  Plus,
  Minus,
} from "lucide-react";

import "./App.css";


type Category =
  | "Warmup"
  | "Skill"
  | "Pull"
  | "Push"
  | "Core";


type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest: number;
  category: Category;
};


type Workout = {
  title: string;
  focus: string;
  exercises: Exercise[];
};



const previewExercises: Record<string, string[]> = {

  Monday:[
    "Handstand Practice",
    "Pull-ups",
    "Australian Rows",
    "Pike Push-ups",
    "Compression",
    "Core"
  ],

  Wednesday:[
    "Handstand Practice",
    "High Pull-ups",
    "Ring Muscle Ups",
    "Front Lever",
    "Dips",
    "Compression",
    "Core"
  ],

  Friday:[
    "Handstand Practice",
    "Weighted Pull-ups",
    "Australian Rows",
    "Skull Crushers"
  ],

  Sunday:[
    "Handstand Practice",
    "Planche",
    "Australian Rows",
    "Dips",
    "Pike Push-ups",
    "Core"
  ]

};





const workouts: Record<string, Workout> = {


Monday:{

title:"Pull Volume",

focus:"Pull endurance + volume",

exercises:[

{
name:"Warmup",
sets:1,
reps:"10 min",
rest:60,
category:"Warmup"
},

{
name:"Handstand Supported Holds",
sets:2,
reps:"45s",
rest:90,
category:"Skill"
},

{
name:"CTW Handstand Toe Taps / Hold",
sets:5,
reps:"10 reps / 10s",
rest:90,
category:"Skill"
},

{
name:"Dead Hang + Scapular Pull-ups",
sets:1,
reps:"15s + 10 reps",
rest:90,
category:"Warmup"
},

{
name:"Bodyweight Pull-ups",
sets:5,
reps:"8 reps",
rest:120,
category:"Pull"
},

{
name:"Banded Pull-ups",
sets:1,
reps:"10 reps",
rest:120,
category:"Pull"
},

{
name:"Australian Rows",
sets:2,
reps:"10 reps",
rest:120,
category:"Pull"
},

{
name:"Pike Push-ups",
sets:2,
reps:"5-8 reps",
rest:120,
category:"Push"
},

{
name:"Push-ups",
sets:2,
reps:"20-25 reps",
rest:120,
category:"Push"
},

{
name:"Seated Compression Lifts",
sets:2,
reps:"8-12 reps",
rest:90,
category:"Core"
},

{
name:"Hollow Body Holds",
sets:2,
reps:"30s",
rest:90,
category:"Core"
}

],


},



Wednesday:{

title:"Pull Skill",

focus:"Muscle-up + front lever skill",

exercises:[

{
name:"Warmup",
sets:1,
reps:"10 min",
rest:60,
category:"Warmup"
},

{
name:"Handstand Supported Holds",
sets:2,
reps:"45s",
rest:90,
category:"Skill"
},

{
name:"Handstand Kick-ups and Taps",
sets:5,
reps:"10 reps",
rest:90,
category:"Skill"
},

{
name:"Pike Push-ups",
sets:3,
reps:"5-8 reps",
rest:120,
category:"Push"
},

{
name:"High Pull-ups",
sets:2,
reps:"3-5 reps",
rest:120,
category:"Pull"
},

{
name:"Ring Muscle Up Attempts",
sets:3,
reps:"1-2 reps",
rest:120,
category:"Skill"
},

{
name:"Banded High Pull-ups",
sets:3,
reps:"3-5 reps",
rest:120,
category:"Pull"
},

{
name:"Front Lever Holds",
sets:2,
reps:"10-15s",
rest:120,
category:"Pull"
},

{
name:"Front Lever Raises",
sets:2,
reps:"5 reps",
rest:120,
category:"Pull"
},

{
name:"Straight Bar Dips",
sets:4,
reps:"10 reps",
rest:90,
category:"Push"
},

{
name:"Seated Compression Lifts",
sets:2,
reps:"8 reps",
rest:90,
category:"Core"
},

{
name:"Hollow Body Holds",
sets:2,
reps:"30s",
rest:90,
category:"Core"
}

]

},

Friday:{

title:"Pull Strength",

focus:"Weighted pulling strength",

exercises:[

{
name:"Warmup",
sets:1,
reps:"10 min",
rest:60,
category:"Warmup"
},

{
name:"Handstand Circuit",
sets:2,
reps:"5 reps",
rest:90,
category:"Skill"
},

{
name:"Handstand Attempts",
sets:1,
reps:"10 min",
rest:90,
category:"Skill"
},

{
name:"Explosive Weighted Pull-ups +15kg",
sets:1,
reps:"5 reps",
rest:300,
category:"Pull"
},

{
name:"Explosive Weighted Pull-ups +12.5kg",
sets:4,
reps:"5 reps",
rest:300,
category:"Pull"
},

{
name:"Australian Rows",
sets:3,
reps:"10 reps",
rest:120,
category:"Pull"
},

{
name:"Bodyweight Skull Crushers",
sets:4,
reps:"8-10 reps",
rest:90,
category:"Push"
}

]

},




Sunday:{

title:"Push Skill",

focus:"Planche + handstand pushing",

exercises:[

{
name:"Warmup",
sets:1,
reps:"10 min",
rest:60,
category:"Warmup"
},

{
name:"Handstand Attempts",
sets:1,
reps:"15 min",
rest:90,
category:"Skill"
},

{
name:"Planche",
sets:5,
reps:"10-15s",
rest:90,
category:"Skill"
},

{
name:"L-Sit to Tuck Planche",
sets:3,
reps:"MAX",
rest:180,
category:"Skill"
},

{
name:"Pseudo Planche Push-ups",
sets:3,
reps:"5 reps",
rest:120,
category:"Push"
},

{
name:"Australian Rows",
sets:4,
reps:"10 reps",
rest:120,
category:"Pull"
},

{
name:"Straight Bar Dips",
sets:2,
reps:"10 reps",
rest:90,
category:"Push"
},

{
name:"Pike Push-ups",
sets:4,
reps:"5 reps",
rest:120,
category:"Push"
},

{
name:"Dragon Flags",
sets:2,
reps:"1-3 reps",
rest:120,
category:"Core"
},

{
name:"Leg Lifts",
sets:2,
reps:"10 + 20 cycles",
rest:90,
category:"Core"
}

]

}

};





function App(){


const [selectedDay,setSelectedDay]=useState("Monday");

const [started,setStarted]=useState(false);


const [startTime,setStartTime]=useState<number | null>(null);

const [elapsed,setElapsed]=useState(0);



const [currentExercise,setCurrentExercise]=useState(0);

const [completedSets,setCompletedSets]=useState<string[]>([]);



const [restTimer,setRestTimer]=useState(0);

const [restPaused,setRestPaused]=useState(false);






useEffect(()=>{

if(!started || !startTime)
return;


const timer=setInterval(()=>{

setElapsed(
Math.floor(
(Date.now()-startTime)/1000
)
);


},1000);


return()=>clearInterval(timer);


},[started,startTime]);






useEffect(()=>{


if(restTimer<=0 || restPaused)
return;


const timer=setInterval(()=>{

setRestTimer(t=>t-1);


},1000);


return()=>clearInterval(timer);



},[restTimer,restPaused]);







function formatTime(seconds:number){


const minutes=Math.floor(seconds/60);

const secs=seconds%60;


return `${minutes
.toString()
.padStart(2,"0")}:${secs
.toString()
.padStart(2,"0")}`;


}






function startWorkout(){


setStarted(true);

setStartTime(Date.now());

setElapsed(0);

setCurrentExercise(0);

setCompletedSets([]);

setRestTimer(0);

}





function finishWorkout(){


setStarted(false);

setStartTime(null);

setCompletedSets([]);

setRestTimer(0);

setCurrentExercise(0);


}







function completeSet(id:string,rest:number){


if(completedSets.includes(id))
return;


const updated=[
...completedSets,
id
];


setCompletedSets(updated);


setRestTimer(rest);

setRestPaused(false);



}





function skipRest(){

setRestTimer(0);

setRestPaused(false);

}





function changeRest(amount:number){

setRestTimer(
Math.max(0,restTimer+amount)
);


}

if(!started){


return (

<main className="app">


<header className="home-header">

<h1>
<Dumbbell/>
Calisthenics Tracker
</h1>

<p>
Choose workout day
</p>

</header>




<section className="preview-list">


{
Object.entries(workouts).map(([day,workout])=>(


<div

key={day}

className={`preview-card ${
selectedDay===day ? "selected" : ""
}`}

onClick={()=>setSelectedDay(day)}

>


<h2>
{day}
</h2>


<h3>
{workout.title}
</h3>


<p>
{workout.focus}
</p>



<ul>

{
previewExercises[day].map((item,index)=>(

<li key={index}>
{item}
</li>

))

}

</ul>


</div>


))

}


</section>





<button

className="start-button"

onClick={startWorkout}

>

<Play/>

Start {selectedDay} Workout

</button>



</main>

)

}






const workout=workouts[selectedDay];



const progress =
Math.round(
(currentExercise/workout.exercises.length)*100
);







return (

<main className="app">



<header className="workout-header">


<button

className="back-button"

onClick={finishWorkout}

>

<ArrowLeft/>

</button>





<h1>
{selectedDay}
</h1>




<div className="timer-card workout-timer">


<Timer/>

<span>
Workout Time
</span>


<strong>
{formatTime(elapsed)}
</strong>


</div>






{
restTimer > 0 &&

<div className="timer-card rest-timer">


<Timer/>

<span>
Rest Timer
</span>


<strong>
{formatTime(restTimer)}
</strong>



<div className="timer-controls">


<button
onClick={()=>changeRest(-30)}
>

<Minus/>
30

</button>



<button

onClick={()=>setRestPaused(!restPaused)}

>

{
restPaused ?

"Resume"

:

"Pause"

}


</button>




<button

onClick={()=>changeRest(30)}

>

<Plus/>
30

</button>



</div>



<button

className="skip-button"

onClick={skipRest}

>

<SkipForward/>

Skip Rest

</button>



</div>


}





<div className="progress">


<div

style={{
width:`${progress}%`
}}

/>

</div>


<p>
Exercise {currentExercise+1} / {workout.exercises.length}
</p>



</header>








<section className="exercise-list">



{

workout.exercises.map((item,index)=>{


const active=index===currentExercise;


return (


<div

key={index}

className={`exercise-card ${
active ? "active" : ""
}`}

>


{
active &&

<span className="current-tag">

CURRENT

</span>

}



<h2>
{item.name}
</h2>


<p>

{item.sets} × {item.reps}

{" • "}

Rest {item.rest}s

</p>




<div className="sets">


{

Array.from({
length:item.sets

}).map((_,set)=>{


const id=`${index}-${set}`;

const done =
completedSets.includes(id);



return (


<button

key={id}

className={
done ? "set-done" : ""
}


onClick={()=>{


completeSet(
id,
item.rest
);



if(
set===item.sets-1
&&
index<workout.exercises.length-1
){

setCurrentExercise(index+1);

}


}}

>


{
done ?

<CheckCircle/>

:

`${set+1}`

}


</button>


)


})


}


</div>


</div>



)


})


}



</section>






<button

className="finish-button"

onClick={finishWorkout}

>

Finish Workout

</button>



</main>


)



}



export default App;
