type Props = {

  exerciseId:string;

  sets:number;

  tracking:string;

  performance:any[];

  setPerformance:(value:any)=>void;

  completedSets:string[];

  toggleSet:(id:string)=>void;

};



function SetInput({

exerciseId,

sets,

tracking,

performance = [],

setPerformance,

completedSets = [],

toggleSet

}:Props){



function updateSet(
setNumber:number,
field:string,
value:string
){


const existing =
performance.find(
item =>
item.exerciseId === exerciseId &&
item.setNumber === setNumber
);



const updated =
performance.filter(
item =>
!(
item.exerciseId === exerciseId &&
item.setNumber === setNumber
)
);



setPerformance([

...updated,

{

exerciseId,

setNumber,

[field]:value,

reps:existing?.reps ?? "",

weight:existing?.weight ?? "",

duration:existing?.duration ?? ""

}

]);


}



function getValue(
setNumber:number,
field:string
){

return performance.find(
item =>
item.exerciseId === exerciseId &&
item.setNumber === setNumber
)?.[field] || "";

}



return (

<section className="set-input">


<h3>
Sets
</h3>



{

Array.from({length:sets}).map((_,index)=>{


const id =
`${exerciseId}-set-${index+1}`;


const completed =
completedSets.includes(id);



return (

<div

key={index}

className="set-row"

>


<strong>
Set {index+1}
</strong>





{

tracking !== "hold" && (

<input

placeholder="Reps"

value={
getValue(index+1,"reps")
}

onChange={(e)=>
updateSet(
index+1,
"reps",
e.target.value
)
}

/>

)

}





{

tracking === "weight" && (

<input

placeholder="Weight"

value={
getValue(index+1,"weight")
}

onChange={(e)=>
updateSet(
index+1,
"weight",
e.target.value
)
}

/>

)

}





{

tracking === "hold" && (

<input

placeholder="Seconds"

value={
getValue(index+1,"duration")
}

onChange={(e)=>
updateSet(
index+1,
"duration",
e.target.value
)
}

/>

)

}





<button

className={
completed
?
"set-complete-button done"
:
"set-complete-button"
}

onClick={()=>toggleSet(id)}

>

✓

</button>



</div>

);

})

}



</section>

);

}


export default SetInput;