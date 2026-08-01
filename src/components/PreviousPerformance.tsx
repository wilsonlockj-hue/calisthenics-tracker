type Props = {

  exerciseId:string;

};



function PreviousPerformance({

  exerciseId

}:Props){



let history:any[] = [];


try {

history = JSON.parse(
localStorage.getItem("workout-history") || "[]"
);

}

catch {

history = [];

}




const previousSessions = history
.slice()
.reverse()
.filter(
session =>
session.performance?.some(
(item:any)=>
item.exerciseId === exerciseId
)
);




if(previousSessions.length === 0){

return null;

}




const lastSession =
previousSessions[0];



const performance =
lastSession.performance.filter(
(item:any)=>
item.exerciseId === exerciseId
);




const firstSet =
performance[0];



if(!firstSet){

return null;

}




return (

<section className="previous-performance">



<h3>
Previous
</h3>



<p>


{

firstSet.weight && (

<>
{firstSet.weight}kg ×{" "}
</>

)

}



{

firstSet.reps && (

<>
{firstSet.reps} reps
</>

)

}



{

firstSet.duration && (

<>
{firstSet.duration}s hold
</>

)

}



</p>



</section>

);

}



export default PreviousPerformance;