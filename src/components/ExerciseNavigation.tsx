type Props = {

previousExercise:()=>void;

nextExercise:()=>void;

};



function ExerciseNavigation({

previousExercise,

nextExercise

}:Props){


return (

<div className="exercise-navigation">


<button

onClick={previousExercise}

>

← Previous

</button>



<button

onClick={nextExercise}

>

Next →

</button>


</div>

);


}


export default ExerciseNavigation;