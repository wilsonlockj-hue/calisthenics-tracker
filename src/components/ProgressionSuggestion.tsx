import {
  getProgressionSuggestion
} from "../utils/progression";


type Props = {

  exercise:any;

};



function ProgressionSuggestion({

  exercise

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



const previousSession =
history
.reverse()
.find(
session =>
session.performance?.some(
(item:any)=>
item.exerciseId === exercise.id
)
);



if(!previousSession){

return null;

}



const previousPerformance =
previousSession.performance.filter(
(item:any)=>
item.exerciseId === exercise.id
);


console.log(
"PROGRESSION DATA",
JSON.stringify(previousPerformance, null, 2)
);



const suggestion =
getProgressionSuggestion(
exercise,
previousPerformance
);



if(!suggestion){

return null;

}



return (

<section className="progression-suggestion">


<h3>
{suggestion.title}
</h3>


<p>
{suggestion.message}
</p>


</section>

);

}


export default ProgressionSuggestion;