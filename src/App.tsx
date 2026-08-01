import {
  Routes,
  Route
} from "react-router-dom";

import History from "./pages/History";
import Home from "./pages/Home";
import Workout from "./pages/Workout";
import ExerciseList from "./pages/ExerciseList";



function App(){


return (

<Routes>




<Route

path="/history"

element={<History />}

/>



<Route

path="/"

element={<Home/>}

/>


<Route

path="/workout/:day"

element={<Workout/>}

/>


<Route

path="/workout/:day/exercises"

element={<ExerciseList/>}

/>


</Routes>

);


}


export default App;