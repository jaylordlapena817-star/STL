import { auth, db } from "./firebase.js";

import {
push,
ref,
set
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const num1=document.getElementById("num1");
const num2=document.getElementById("num2");
const draw=document.getElementById("draw");
const amount=document.getElementById("amount");
const status=document.getElementById("status");
const betBtn=document.getElementById("betBtn");

// Generate numbers 1-40
for(let i=1;i<=40;i++){

const option1=document.createElement("option");
option1.value=i;
option1.text=i;
num1.appendChild(option1);

const option2=document.createElement("option");
option2.value=i;
option2.text=i;
num2.appendChild(option2);

}

function bettingOpen(){

const now=new Date();

const hour=now.getHours();

const selected=draw.value;

if(selected==="morning") return hour<9;

if(selected==="afternoon") return hour<14;

if(selected==="evening") return hour<18;

}

draw.onchange=updateStatus;

function updateStatus(){

if(bettingOpen()){

status.innerHTML="🟢 Betting Open";

betBtn.disabled=false;

}else{

status.innerHTML="🔴 Betting Closed";

betBtn.disabled=true;

}

}

updateStatus();

betBtn.onclick=()=>{

const user=auth.currentUser;

if(!user){

alert("Please login first.");

return;

}

if(num1.value===num2.value){

alert("Numbers must be different.");

return;

}

const betRef=push(ref(db,"bets"));

set(betRef,{

uid:user.uid,
number1:Number(num1.value),
number2:Number(num2.value),
draw:draw.value,
credits:Number(amount.value),
status:"Pending",
time:Date.now()

});

alert("Bet Submitted!");

};
