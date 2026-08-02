type Props = {

  exerciseId:string;

  sets:number;

  tracking:string;

  rest:number;

  performance:any[];

  setPerformance:(value:any[])=>void;

  setRestTimer:(value:number)=>void;

};





function SetInput({

exerciseId,

sets,

tracking,

rest,

performance,

setPerformance,

setRestTimer

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







const newPerformance = [

...updated,

{

exerciseId,

setNumber,

reps:

field === "reps"

?

value

:

existing?.reps ?? "",


weight:

field === "weight"

?

value

:

existing?.weight ?? "",


duration:

field === "duration"

?

value

:

existing?.duration ?? ""

}

];





setPerformance(newPerformance);







const completedSet =

newPerformance.some(

(item:any)=>

item.exerciseId === exerciseId &&

item.setNumber === setNumber &&

(

item.reps ||

item.weight ||

item.duration

)

);





if(completedSet){

setRestTimer(rest);

}



}








function getValue(

setNumber:number,

field:string

){


return (

performance.find(

item =>

item.exerciseId === exerciseId &&

item.setNumber === setNumber

)?.[field]

||

""

);


}









return (

<section className="set-input">



<h3>

Sets

</h3>







{

Array.from({

length:sets

}).map((_,index)=>{



const setNumber = index + 1;





const completed =

performance.some(

(item:any)=>

item.exerciseId === exerciseId &&

item.setNumber === setNumber &&

(

item.reps ||

item.weight ||

item.duration

)

);








return (

<div

key={setNumber}

className="set-row"

>







<strong>

Set {setNumber}

</strong>









{

tracking !== "hold" && (


<input

type="number"

placeholder="Reps"

value={

getValue(

setNumber,

"reps"

)

}

onChange={(e)=>

updateSet(

setNumber,

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

type="number"

placeholder="Weight"

value={

getValue(

setNumber,

"weight"

)

}

onChange={(e)=>

updateSet(

setNumber,

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

type="number"

placeholder="Seconds"

value={

getValue(

setNumber,

"duration"

)

}

onChange={(e)=>

updateSet(

setNumber,

"duration",

e.target.value

)

}

/>


)

}









<span

className={

completed

?

"set-complete-button done"

:

"set-complete-button"

}

>

✓

</span>







</div>

);


})

}



</section>

);


}



export default SetInput;