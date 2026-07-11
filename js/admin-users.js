import { db } from "./firebase.js";

import {
ref,
onValue,
update
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const usersList=document.getElementById("usersList");
const search=document.getElementById("search");

let users={};

onValue(ref(db,"users"),snapshot=>{

users=snapshot.val()||{};

render();

});

search.oninput=render;

function render(){

usersList.innerHTML="";

Object.keys(users).forEach(uid=>{

const user=users[uid];

if(
!user.username.toLowerCase().includes(search.value.toLowerCase())
)return;

usersList.innerHTML+=`

<div class="user-card">

<h2>${user.username}</h2>

<p>${user.email}</p>

<p>Credits: ${user.credits}</p>

<div class="actions">

<button
class="add"
onclick="addCredits('${uid}')">

+100

</button>

<button
class="remove"
onclick="removeCredits('${uid}')">

-100

</button>

</div>

</div>

`;

});

}

window.addCredits=async(uid)=>{

const user=users[uid];

await update(ref(db,"users/"+uid),{

credits:(user.credits||0)+100

});

};

window.removeCredits=async(uid)=>{

const user=users[uid];

let credits=(user.credits||0)-100;

if(credits<0) credits=0;

await update(ref(db,"users/"+uid),{

credits

});

};
