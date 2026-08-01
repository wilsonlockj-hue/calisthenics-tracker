import {
  useEffect,
  useState
} from "react";

import type {
  Workout
} from "../types/workout";


export function useWorkout(workout:Workout){


let saved = null;

try {

  saved = JSON.parse(
    localStorage.getItem(`workout-${workout.id}`) || "null"
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
useState(
  saved?.currentExercise ?? 0
);


const [completedSets,setCompletedSets] =
useState<string[]>(
  saved?.completedSets ?? []
);


const [performance,setPerformance] =
useState<any[]>(
  saved?.performance ?? []
);


const [elapsed,setElapsed] =
useState(
  saved?.elapsed ?? 0
);


const [restTimer,setRestTimer] =
useState(
  saved?.restTimer ?? 0
);


  const [restPaused,setRestPaused] = useState(false);


const [workoutComplete,setWorkoutComplete] =
useState(false);




const [history,setHistory] =
useState<any[]>(savedHistory);






  /*
    Load saved workout
  */

 




  /*
    Save workout
  */

  useEffect(()=>{


if(workoutComplete){

return;

}


localStorage.setItem(

      `workout-${workout.id}`,

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
    workout.id
  ]);





  /*
    Workout timer
  */

  useEffect(()=>{


    const timer = setInterval(()=>{

      setElapsed(prev=>prev+1);

    },1000);


    return ()=>clearInterval(timer);


  },[]);





  /*
    Rest timer
  */

  useEffect(()=>{


    if(restTimer <= 0 || restPaused){

      return;

    }


    const timer = setInterval(()=>{

      setRestTimer(prev=>prev-1);

    },1000);


    return ()=>clearInterval(timer);


  },[
    restTimer,
    restPaused
  ]);





  const exercise =
    workout.exercises[currentExercise];





  /*
    Set completion
  */

  function toggleSet(id:string){


    if(completedSets.includes(id)){


      setCompletedSets(prev =>
        prev.filter(
          item => item !== id
        )
      );


    }

    else{


      setCompletedSets(prev => [

        ...prev,

        id

      ]);


      setRestTimer(
        exercise.rest
      );


      setRestPaused(false);


    }


  }





  /*
    Timed exercise completion
  */

  function completeExercise(){


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
      exercise.rest
    );


    setRestPaused(false);


  }





  function undoExerciseComplete(){


    setCompletedSets(prev =>

      prev.filter(

        item =>
        item !== `${exercise.id}-complete`

      )

    );


  }





  function nextExercise(){


    if(
      currentExercise <
      workout.exercises.length - 1
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
        ? 0
        : value;


    });


  }


function finishWorkout(){

if(workoutComplete){
  return;
}


const session = {

id: Date.now(),

workoutId: workout.id,

title: workout.title,

date: new Date().toLocaleDateString(),

duration: elapsed,

completedSets,

performance

};


setHistory(prev=>{


const updated = [

...prev,

session

];


localStorage.setItem(

"workout-history",

JSON.stringify(updated)

);


return updated;


});


// clear current workout save
localStorage.removeItem(
  `workout-${workout.id}`
);


setWorkoutComplete(true);


}


  function resetWorkout(){


    setCurrentExercise(0);

    setCompletedSets([]);

    setElapsed(0);

    setRestTimer(0);

    setRestPaused(false);


    localStorage.removeItem(
      `workout-${workout.id}`
    );


  }





  return {

  history,

  performance,

  setPerformance,

  currentExercise,

  workoutComplete,

  finishWorkout,

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


    previousExercise,


    skipRest,


    changeRest,


    resetWorkout


  };


}