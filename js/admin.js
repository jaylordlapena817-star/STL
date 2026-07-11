import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const ADMIN_UID="YOUR_ADMIN_UID";

onAuthStateChanged(auth,user=>{

if(!user){

location.href="login.html";
return;

}

if(user.uid!==ADMIN_UID){

alert("Access Denied");

location.href="dashboard.html";
return;

}

onValue(ref(db,"users"),snap=>{

document.getElementById("users").innerHTML=
snap.exists()?Object.keys(snap.val()).length:0;

});

onValue(ref(db,"bets"),snap=>{

document.getElementById("bets").innerHTML=
snap.exists()?Object.keys(snap.val()).length:0;

});

onValue(ref(db,"creditRequests"),snap=>{

document.getElementById("requests").innerHTML=
snap.exists()?Object.keys(snap.val()).length:0;

});

});
