import {
  Plus,
  Minus,
  Timer
} from "lucide-react";


type Props = {

seconds:number;

paused:boolean;

setPaused:(value:boolean)=>void;

changeRest:(amount:number)=>void;

skipRest:()=>void;

};



function RestTimer({

seconds,

paused,

setPaused,

changeRest,

skipRest

}:Props){



const minutes =
Math.floor(seconds / 60);


const remaining =
seconds % 60;



return (

<div className="timer-card rest-timer">


<Timer/>


<span>
Rest Timer
</span>


<strong>
{minutes}:{remaining
.toString()
.padStart(2,"0")}
</strong>



<div className="timer-controls">


<button
onClick={()=>changeRest(-30)}
>
<Minus/>
30
</button>


<button

onClick={()=>
setPaused(!paused)
}

>

{
paused
?
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

Skip Rest

</button>


</div>

);


}


export default RestTimer;