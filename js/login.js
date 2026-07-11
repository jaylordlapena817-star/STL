import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const email=document.getElementById("email");
const password=document.getElementById("password");
const loginBtn=document.getElementById("loginBtn");
const toggle=document.getElementById("togglePassword");

onAuthStateChanged(auth,(user)=>{

if(user){

location.href="dashboard.html";

}

});

toggle.onclick=()=>{

password.type=password.type==="password"?"text":"password";

};

loginBtn.onclick=async()=>{

if(email.value===""||password.value===""){

alert("Please fill in all fields.");
return;

}

loginBtn.innerHTML="Logging in...";
loginBtn.disabled=true;

try{

await signInWithEmailAndPassword(
auth,
email.value.trim(),
password.value
);

location.href="dashboard.html";

}catch(error){

alert(error.message);

}

loginBtn.innerHTML="Login";
loginBtn.disabled=false;

};
