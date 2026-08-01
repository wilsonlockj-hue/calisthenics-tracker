type Props = {

  exerciseId:string;

  sets:number;

  completedSets:string[];

  toggleSet:(id:string)=>void;

};



function SetTracker({

exerciseId,

sets,

completedSets,

toggleSet

}:Props){



return (

<section className="set-tracker">


{

Array.from({length:sets}).map((_,index)=>{


const id =
`${exerciseId}-set-${index+1}`;


const completed =
completedSets.includes(id);



return (

<div

key={index}

className="set-row-tracker"

>


<strong>
Set {index+1}
</strong>



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


export default SetTracker;