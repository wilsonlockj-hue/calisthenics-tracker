export type Category =
  | "Warmup"
  | "Skill"
  | "Pull"
  | "Push"
  | "Core"
  | "Mobility";


export type ProgressionType =
  | "none"
  | "weight"
  | "reps"
  | "hold"
  | "skill";


export type TrackingType =
  | "none"
  | "reps"
  | "weight"
  | "hold";






export type SetRecord = {

  setNumber:number;

  reps:string;

  weight?:string;

};





export type Exercise = {

  tracking?: TrackingType;

  id:string;

  name:string;

  category:Category;

  sets:number;

  reps:string;

  duration?:string;

  rest:number;

  notes?:string;

  equipment?:string;

  superset?:string;

  progression?:{

    type:ProgressionType;

    increment?:number;

  };

};




export type Workout = {
  id: string;

  title: string;

  focus: string;

  exercises: Exercise[];
};