import type { Workout } from "../types/workout";


export const workouts: Workout[] = [


{
id:"pull-volume",

title:"Pull Volume",

focus:"Pull volume + handstand development",

exercises:[


{
id:"monday-warmup",
name:"Warmup",
category:"Warmup",
sets:1,
reps:"",
duration:"10 mins",
rest:60,
tracking:"none"
},


{
id:"pullvolume-handstand-supported",
name:"Handstand Supported Holds",
category:"Skill",
sets:2,
reps:"45 seconds",
rest:90,
progression:{
type:"hold"
},
tracking:"hold"
},


{
id:"ctw-handstand",
name:"CTW Handstand",
notes:"Toe Taps / hold",
category:"Skill",
sets:5,
reps:"10 / 10 seconds",
rest:90,
progression:{
type:"skill"
},
tracking:"hold"
},


{
id:"pullvolume-warmup",
name:"Pull Warmup",
notes:"Dead Hang + Scapular Pull-ups + Band Pull-aparts + Band Rotations",
category:"Mobility",
sets:1,
reps:"15s / 10 / 15s / 15s",
rest:90,
superset:"A",
tracking:"none"
},


{
id:"bodyweight-pullups",
name:"Bodyweight Pull-ups",
category:"Pull",
sets:5,
reps:"8 reps",
rest:120,
progression:{
type:"reps"
},
tracking:"reps"
},


{
id:"banded-pullups",
name:"Banded Pull-ups",
category:"Pull",
sets:1,
reps:"10 reps",
rest:120,
tracking:"reps"
},


{
id:"pullvolume-australian-rows",
name:"Australian Rows",
category:"Pull",
sets:2,
reps:"10 reps",
rest:120,
progression:{
type:"reps"
},
tracking:"reps"
},


{
id:"pullvolume-pike-pushups",
name:"Pike Push-ups",
category:"Push",
sets:2,
reps:"5-8 reps",
rest:120,
tracking:"reps"
},


{
id:"pushups",
name:"Push-ups",
category:"Push",
sets:2,
reps:"20-25 reps",
rest:120,
tracking:"reps"
},


{
id:"pullvolume-compression",
name:"Seated Compression Lifts",
category:"Core",
sets:2,
reps:"8-12 reps",
rest:90,
tracking:"reps"
},


{
id:"pullvolume-hollow-holds",
name:"Hollow Body Holds",
category:"Core",
sets:2,
reps:"30 seconds",
rest:90,
tracking:"hold"
}


]

},


{
id:"pull-skill",

title:"Pull Skill",

focus:"Muscle-up + front lever skill",

exercises:[


{
id:"wednesday-warmup",
name:"Warmup",
category:"Warmup",
sets:1,
reps:"",
duration:"10 mins",
rest:60,
tracking:"none"
},


{
id:"pullskill-handstand-supported",
name:"Handstand Supported Holds",
category:"Skill",
sets:2,
reps:"45 seconds",
rest:90,
tracking:"hold"
},


{
id:"handstand-kickups",
name:"BTW Handstand",
notes:"Kick-up / Taps",
category:"Skill",
sets:5,
reps:"10 reps",
rest:90,
tracking:"reps"
},


{
id:"pullskill-pike-pushups",
name:"Pike Push-ups",
category:"Push",
sets:3,
reps:"5-8 reps",
rest:120,
tracking:"reps"
},


{
id:"pullskill-warmup",
name:"Pull Warmup",
notes:"Dead Hang + Scapular Pull-ups + Band Pull-aparts + Band Rotations",
category:"Mobility",
sets:1,
reps:"15s / 10 / 15s / 15s",
rest:90,
superset:"A",
tracking:"none"
},


{
id:"high-pulls",
name:"High Pull-ups",
category:"Pull",
sets:2,
reps:"3-5 reps",
rest:120,
notes:"No Band",
tracking:"reps"
},


{
id:"ring-muscle-ups",
name:"Ring Muscle-up Attempts",
category:"Skill",
sets:3,
reps:"1-2 reps",
rest:120,
progression:{
type:"skill"
},
tracking:"reps"
},


{
id:"banded-high-pulls",
name:"Banded High Pull-ups",
category:"Pull",
sets:3,
reps:"3-5 reps",
rest:120,
equipment:"Red Band",
tracking:"reps"
},


{
id:"front-lever-holds",
name:"Front Lever Holds",
category:"Skill",
sets:2,
reps:"10-15 seconds",
rest:120,
notes:"Advanced Tuck",
progression:{
type:"hold"
},
tracking:"hold"
},


{
id:"front-lever-raises",
name:"Front Lever Raises",
category:"Skill",
sets:2,
reps:"5 reps",
rest:120,
notes:"Advanced Tuck",
tracking:"reps"
},


{
id:"straight-bar-dips",
name:"Straight Bar Dips",
category:"Push",
sets:3,
reps:"10 reps",
rest:90,
tracking:"reps"
},


{
id:"pullskill-compression",
name:"Seated Compression Lifts",
category:"Core",
sets:2,
reps:"8 reps",
rest:90,
tracking:"reps"
},


{
id:"pullskill-hollow-holds",
name:"Hollow Body Holds",
category:"Core",
sets:2,
reps:"30 seconds",
rest:90,
tracking:"hold"
}


]

},



{
id:"friday",

title:"Pull Strength",

focus:"Weighted pulling strength",

exercises:[


{
id:"friday-warmup",
name:"Warmup",
category:"Warmup",
sets:1,
reps:"",
duration:"10 mins",
rest:60,
tracking:"none"
},


{
id:"handstand-circuit",
name:"Handstand Circuit",
category:"Skill",
sets:2,
reps:"5 reps",
rest:90,
notes:"Shrug, Push, Lean",
tracking:"reps"
},


{
id:"handstand-attempts-friday",
name:"Handstand Attempts",
category:"Skill",
sets:1,
reps:"",
duration:"10 mins",
rest:90,
tracking:"hold"
},


{
id:"friday-pull-warmup",
name:"Pull Warmup",
notes:"Dead Hang + Scapular Pull-ups + Band Pull-aparts + Band Rotations",
category:"Mobility",
sets:1,
reps:"15s / 10 / 15s / 15s",
rest:90,
superset:"A",
tracking:"none"
},


{
id:"weighted-pullups-heavy",
name:"Explosive Weighted Pull-ups",
category:"Pull",
sets:1,
reps:"5 reps",
rest:300,
equipment:"15kg",
notes:"Explosive",
progression:{
type:"weight",
increment:2.5
},
tracking:"weight"
},


{
id:"weighted-pullups-backoff",
name:"Explosive Weighted Pull-ups",
category:"Pull",
sets:4,
reps:"5 reps",
rest:300,
equipment:"12.5kg",
notes:"Explosive",
progression:{
type:"weight",
increment:2.5
},
tracking:"weight"
},


{
id:"skull-crushers",
name:"Bodyweight Skull-Crushers",
category:"Push",
sets:4,
reps:"8-10 reps",
rest:90,
notes:"Bar @ Hip",
tracking:"reps"
},


{
id:"friday-australian-rows",
name:"Australian Rows",
category:"Pull",
sets:3,
reps:"10 reps",
rest:120,
tracking:"reps"
}


]

},



{
id:"sunday",

title:"Push Skill",

focus:"Planche + handstand development",

exercises:[


{
id:"sunday-warmup",
name:"Warmup",
category:"Warmup",
sets:1,
reps:"",
duration:"10 mins",
rest:60,
tracking:"none"
},


{
id:"sunday-handstand-attempts",
name:"Handstand Attempts",
category:"Skill",
sets:1,
duration:"15 mins",
reps:"",
rest:90,
tracking:"hold"
},


{
id:"planche-leans",
name:"Planche Leans",
category:"Skill",
sets:5,
reps:"10-15 seconds",
rest:90,
progression:{
type:"hold"
},
tracking:"hold"
},


{
id:"lsit-planche",
name:"L-sit to Tuck Planche",
category:"Skill",
sets:3,
reps:"MAX",
rest:180,
progression:{
type:"skill"
},
tracking:"reps"
},


{
id:"pseudo-planche",
name:"Pseudo Planche Push-ups",
category:"Push",
sets:3,
reps:"5 reps",
rest:120,
tracking:"reps"
},


{
id:"sunday-pull-warmup",
name:"Pull Warmup",
notes:"Dead Hang + Scapular Pull-ups + Band Pull-aparts + Band Rotations",
category:"Mobility",
sets:1,
reps:"15s / 10 / 15s / 15s",
rest:90,
superset:"A",
tracking:"none"
},


{
id:"sunday-australian-rows",
name:"Australian Rows",
category:"Pull",
sets:6,
reps:"10 reps",
rest:120,
tracking:"reps"
},


{
id:"sunday-straight-bar-dips",
name:"Straight Bar Dips",
category:"Push",
sets:3,
reps:"10 reps",
rest:90,
tracking:"reps"
},


{
id:"sunday-pike-pushups",
name:"Pike Push-ups",
category:"Push",
sets:4,
reps:"5 reps",
rest:120,
tracking:"reps"
},


{
id:"dragon-flags",
name:"Dragon Flags",
category:"Core",
sets:2,
reps:"1-3 reps",
rest:120,
tracking:"reps"
},


{
id:"leg-lifts",
name:"Leg Lifts + 6 inch Cycles",
category:"Core",
sets:2,
reps:"10 / 20 reps",
rest:90,
superset:"A",
tracking:"reps"
}


]

}


];

export default workouts;