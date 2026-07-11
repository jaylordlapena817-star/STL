import { auth, db } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const username=document.getElementById("username");
const credits=document.getElementById("credits");
const logout=document.getElementById("logoutBtn");

onAuthStateChanged(auth,(user)=>{

if(!user){

location.href="login.html";
return;

}

onValue(ref(db,"users/"+user.uid),(snapshot)=>{

const data=snapshot.val();

username.innerHTML="👋 "+data.username;

credits.innerHTML=data.credits;

});

});

logout.onclick=()=>{

signOut(auth);

};

function updateTimer(){

const now=new Date();

let target=new Date();

if(now.getHours()<9){

target.setHours(9,0,0,0);

}else if(now.getHours()<14){

target.setHours(14,0,0,0);

}else if(now.getHours()<18){

target.setHours(18,0,0,0);

}else{

target.setDate(target.getDate()+1);

target.setHours(9,0,0,0);

}

const diff=target-now;

const h=Math.floor(diff/1000/60/60);

const m=Math.floor(diff/1000/60)%60;

const s=Math.floor(diff/1000)%60;

document.getElementById("timer").innerHTML=
`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

}

updateTimer();

setInterval(updateTimer,1000);
