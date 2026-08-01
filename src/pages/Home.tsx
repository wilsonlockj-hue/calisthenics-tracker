import Stats from "../components/Stats";

import PersonalRecords from "../components/PersonalRecords";

import {
  useNavigate
} from "react-router-dom";

import {
  workouts
} from "../data/workouts";


function Home(){


  const navigate = useNavigate();



  return (

    <main className="home-page">


     <h1 className="app-title">

🤸 Calisthenics Tracker

</h1>

<Stats/>

<PersonalRecords/>



      <h2>
        Choose Workout
      </h2>




      <div className="workout-buttons">


      {
        workouts.map(workout=>(


          <button

key={workout.id}

className={`workout-card ${workout.id}`}


          onClick={()=>{

            navigate(
              `/workout/${workout.id}`
            );

          }}

          >


            <strong>
              {workout.title}
            </strong>


            <span>
              {workout.focus}
            </span>


          </button>


        ))
      }


            </div>


      <button

      className="history-button"

      onClick={()=>navigate("/history")}

      >

      Workout History

      </button>


    </main>

  );

}


export default Home;