import {
  useEffect,
  useState
} from "react";

import type {
  Workout
} from "../types/workout";


const ACTIVE_WORKOUT_KEY = "active-workout";



export function useWorkout(workout:Workout){


const savedCustomWorkouts =
JSON.parse(
localStorage.getItem("custom-workouts") || "{}"
);



const savedWorkout =
savedCustomWorkouts[workout.id];


const activeWorkout =
Array.isArray(savedWorkout)

?
{
  ...workout,
  exercises:savedWorkout
}

:

savedWorkout ?? workout;




let saved = null;

try {

saved = JSON.parse(
localStorage.getItem(`workout-${activeWorkout.id}`) || "null"
);

} catch {

saved = null;

}





let savedHistory = [];

try {

savedHistory = JSON.parse(
localStorage.getItem("workout-history") || "[]"
);

} catch {

savedHistory = [];

}





const [currentExercise,setCurrentExercise] =
useState<number>(0);


const [completedSets,setCompletedSets] =
useState<any[]>(
  saved?.completedSets ?? []
);



const [performance,setPerformance] =
useState<any[]>(
saved?.performance ?? []
);



const [elapsed,setElapsed] =
useState<number>(
  saved?.elapsed ?? 0
);



const [restTimer,setRestTimer] =
useState<number>(
  saved?.restTimer ?? 0
);



const [restPaused,setRestPaused] =
useState(false);



const [workoutComplete,setWorkoutComplete] =
useState(false);



const [workoutSummary,setWorkoutSummary] =
useState(false);



const [history,setHistory] =
useState<any[]>(savedHistory);







useEffect(()=>{


const current =
localStorage.getItem(
ACTIVE_WORKOUT_KEY
);



if(!current){

localStorage.setItem(
ACTIVE_WORKOUT_KEY,
activeWorkout.id
);

}


},[activeWorkout.id]);







useEffect(()=>{


if(workoutComplete){

return;

}



localStorage.setItem(

`workout-${activeWorkout.id}`,

JSON.stringify({

currentExercise,

completedSets,

elapsed,

restTimer,

performance

})

);


},[

currentExercise,

completedSets,

elapsed,

restTimer,

performance,

activeWorkout.id,

workoutComplete

]);








useEffect(()=>{


const timer =
setInterval(()=>{

setElapsed(
prev=>prev+1
);


},1000);



return ()=>clearInterval(timer);


},[]);








useEffect(()=>{


if(
restTimer <= 0 ||
restPaused
){

return;

}



const timer =
setInterval(()=>{


setRestTimer(
prev=>prev-1
);


},1000);



return ()=>clearInterval(timer);


},[

restTimer,

restPaused

]);







const exercise =
activeWorkout.exercises?.[currentExercise];








function closeSummary(){

setWorkoutSummary(false);

}








function toggleSet(id:string){


if(completedSets.includes(id)){


setCompletedSets(prev=>

prev.filter(
item=>item !== id
)

);


}

else{


setCompletedSets(prev=>[

...prev,

id

]);


setRestTimer(
exercise?.rest ?? 0
);


setRestPaused(false);


}


}







function completeExercise(){


if(!exercise){

return;

}


setCompletedSets(prev=>{


if(
prev.includes(
`${exercise.id}-complete`
)
){

return prev;

}


return [

...prev,

`${exercise.id}-complete`

];


});



setRestTimer(
exercise.rest ?? 0
);


setRestPaused(false);


}








function undoExerciseComplete(){


if(!exercise){

return;

}



setCompletedSets(prev=>

prev.filter(

item=>

item !== `${exercise.id}-complete`

)

);


}








function nextExercise(){


if(
currentExercise <
activeWorkout.exercises.length - 1
){


setCurrentExercise(
prev=>prev+1
);


setRestTimer(0);


window.scrollTo({

top:0,

behavior:"smooth"

});


}

else{


setWorkoutSummary(true);


}


}








function previousExercise(){


if(currentExercise > 0){


setCurrentExercise(
prev=>prev-1
);


setRestTimer(0);


window.scrollTo({

top:0,

behavior:"smooth"

});


}


}








function skipRest(){

setRestTimer(0);

}








function changeRest(amount:number){


setRestTimer(prev=>{


const value =
prev + amount;


return value < 0
?
0
:
value;


});


}









function finishWorkout(){


if(workoutComplete){

return;

}



const session = {


id:Date.now(),

workoutId:activeWorkout.id,

title:activeWorkout.title,

date:new Date().toLocaleDateString(),

duration:elapsed,

completedSets,

performance


};





setHistory(prev=>{


const updated=[

...prev,

session

];


localStorage.setItem(

"workout-history",

JSON.stringify(updated)

);


return updated;


});





localStorage.removeItem(
`workout-${activeWorkout.id}`
);



localStorage.removeItem(
ACTIVE_WORKOUT_KEY
);



setWorkoutSummary(false);

setWorkoutComplete(true);


}









function scrapWorkout(){


localStorage.removeItem(
`workout-${activeWorkout.id}`
);


localStorage.removeItem(
ACTIVE_WORKOUT_KEY
);



setCurrentExercise(0);

setCompletedSets([]);

setPerformance([]);

setElapsed(0);

setRestTimer(0);


}









function resetWorkout(){


setCurrentExercise(0);

setCompletedSets([]);

setElapsed(0);

setRestTimer(0);

setRestPaused(false);



localStorage.removeItem(
`workout-${activeWorkout.id}`
);


}









return {


history,

performance,

setPerformance,


currentExercise,


workoutComplete,


workoutSummary,


finishWorkout,


scrapWorkout,


setCurrentExercise,


exercise,


completedSets,


elapsed,


restTimer,


setRestTimer,


restPaused,


setRestPaused,


toggleSet,


completeExercise,


undoExerciseComplete,


nextExercise,


closeSummary,


previousExercise,


skipRest,


changeRest,


resetWorkout


};


}