import {
  useEffect,
  useState
} from "react";


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


if(!running || seconds <=0){

return;

}


const timer =
setInterval(()=>{


setSeconds(prev=>prev-1);


},1000);



return ()=>clearInterval(timer);


},[running,seconds]);




useEffect(()=>{


if(seconds===0){

onComplete();

}


},[seconds,onComplete]);




const minutes =
Math.floor(seconds/60);


const remaining =
seconds % 60;



return (

<div className="exercise-timer">


<strong>

{minutes}:
{remaining
.toString()
.padStart(2,"0")}

</strong>



<button

onClick={()=>
setRunning(!running)
}

>

{
running
?
"Pause"
:
"Start Timer"
}

</button>



</div>

);


}


export default ExerciseTimer;