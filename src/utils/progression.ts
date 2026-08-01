export function getProgressionSuggestion(
  exercise:any,
  performance:any[]
){


if(!exercise.progression){

return null;

}



const sets =
performance.filter(
item =>
item.exerciseId === exercise.id
);



if(sets.length === 0){

return null;

}





/*
  Weight progression
*/

if(exercise.progression.type === "weight"){


const weights =
sets
.filter(
set => set.weight
)
.map(
set =>
parseFloat(
set.weight
)
);



const lastWeight =
weights[weights.length - 1];



if(!lastWeight){

return {

title:"Increase weight",

message:"Enter your current weight first"

};

}



const nextWeight =
lastWeight + exercise.progression.increment;



return {

title:"Increase weight",

message:
`Next session: ${nextWeight}kg`

};


}





/*
  Rep progression
*/

if(exercise.progression.type === "reps"){


return {

title:"Increase reps",

message:
"Aim for more reps next session"

};


}





/*
  Hold progression
*/

if(exercise.progression.type === "hold"){


return {

title:"Increase hold time",

message:
"Add a few seconds next session"

};


}





/*
  Skill progression
*/

if(exercise.progression.type === "skill"){


return {

title:"Improve quality",

message:
"Focus on cleaner reps and better control"

};


}



return null;

}