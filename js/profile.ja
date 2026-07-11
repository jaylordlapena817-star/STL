import { auth, db } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
ref,
get
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const username=document.getElementById("username");
const email=document.getElementById("email");
const uid=document.getElementById("uid");
const credits=document.getElementById("credits");
const role=document.getElementById("role");
const logoutBtn=document.getElementById("logoutBtn");

onAuthStateChanged(auth,async(user)=>{

if(!user){

location.href="login.html";
return;

}

uid.textContent=user.uid;
email.textContent=user.email;

const snap=await get(ref(db,"users/"+user.uid));

if(snap.exists()){

const data=snap.val();

username.textContent=data.username || "Unknown";
credits.textContent=data.credits || 0;
role.textContent=data.role || "User";

}else{

username.textContent="Unknown";

}

});

logoutBtn.onclick=async()=>{

await signOut(auth);

location.href="login.html";

};
