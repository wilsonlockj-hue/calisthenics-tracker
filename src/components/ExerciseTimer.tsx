import {
  useEffect,
  useState
} from "react";


import {
  Play,
  Pause,
  RotateCcw
} from "lucide-react";



type Props = {

duration:string;

onComplete:()=>void;

};





function ExerciseTimer({

duration,

onComplete

}:Props){



const totalSeconds =
parseInt(duration) * 60;



const [seconds,setSeconds] =
useState(totalSeconds);



const [running,setRunning] =
useState(false);






useEffect(()=>{


if(!running || seconds <= 0){

return;

}



const timer =
setInterval(()=>{


setSeconds(prev=>prev-1);


},1000);




return ()=>clearInterval(timer);



},[running,seconds]);








useEffect(()=>{


if(seconds === 0){

setRunning(false);

onComplete();

}


},[seconds,onComplete]);







function resetTimer(){


setSeconds(totalSeconds);

setRunning(false);


}








const minutes =
Math.floor(seconds / 60);



const remaining =
seconds % 60;







return (

<div className="exercise-timer">


<span>

⏱ Timer

</span>





<strong>

{minutes}:
{remaining
.toString()
.padStart(2,"0")}

</strong>







<div className="exercise-timer-controls">



<button

onClick={()=>setRunning(!running)}

>

{

running

?

<>

<Pause size={18}/>

Pause

</>

:

<>

<Play size={18}/>

Start

</>

}


</button>







<button

onClick={resetTimer}

>

<RotateCcw size={18}/>

Reset

</button>






</div>






</div>

);


}


export default ExerciseTimer;