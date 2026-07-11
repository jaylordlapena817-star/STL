import { auth, db } from "./firebase.js";

import {
push,
ref,
set
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const number1=document.getElementById("number1");
const number2=document.getElementById("number2");

for(let i=1;i<=40;i++){

number1.innerHTML+=`<option>${i}</option>`;
number2.innerHTML+=`<option>${i}</option>`;

}

document.getElementById("publishBtn").onclick=()=>{

if(number1.value===number2.value){

alert("Numbers cannot be the same.");

return;

}

const resultRef=push(ref(db,"results"));

set(resultRef,{

draw:document.getElementById("draw").value,

number1:Number(number1.value),

number2:Number(number2.value),

time:Date.now()

});

alert("Result Published!");

};
