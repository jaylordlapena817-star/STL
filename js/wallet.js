import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
ref,
push,
set,
onValue
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const credits=document.getElementById("credits");
const amount=document.getElementById("amount");
const requestBtn=document.getElementById("requestBtn");
const history=document.getElementById("history");

onAuthStateChanged(auth,(user)=>{

if(!user){

location.href="login.html";
return;

}

onValue(ref(db,"users/"+user.uid),(snapshot)=>{

const data=snapshot.val();

credits.innerHTML=data.credits;

});

onValue(ref(db,"creditRequests"),(snapshot)=>{

history.innerHTML="";

const data=snapshot.val();

if(!data) return;

Object.keys(data).reverse().forEach(key=>{

const item=data[key];

if(item.uid!==user.uid) return;

history.innerHTML+=`

<div class="history-card">

<p><b>${item.amount} Credits</b></p>

<p>Status: ${item.status}</p>

<p>${new Date(item.time).toLocaleString()}</p>

</div>

`;

});

});

requestBtn.onclick=()=>{

if(amount.value===""){

alert("Enter credits.");
return;

}

const newRequest=push(ref(db,"creditRequests"));

set(newRequest,{

uid:user.uid,
amount:Number(amount.value),
status:"Pending",
time:Date.now()

});

alert("Request Sent!");

amount.value="";

};

});
