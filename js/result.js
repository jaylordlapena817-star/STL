import { db } from "./firebase.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const history=document.getElementById("history");

onValue(ref(db,"results"),(snapshot)=>{

const data=snapshot.val();

if(!data) return;

const keys=Object.keys(data);

const latest=data[keys[keys.length-1]];

document.getElementById("drawName").innerHTML=latest.draw;

document.getElementById("number1").innerHTML=latest.number1;

document.getElementById("number2").innerHTML=latest.number2;

document.getElementById("drawTime").innerHTML=
new Date(latest.time).toLocaleString();

history.innerHTML="";

keys.reverse().forEach(key=>{

const item=data[key];

history.innerHTML+=`

<div class="history-card">

<b>${item.draw}</b><br>

${item.number1} - ${item.number2}

<br><br>

<small>

${new Date(item.time).toLocaleString()}

</small>

</div>

`;

});

});
