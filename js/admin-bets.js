import { db } from "./firebase.js";

import {
ref,
onValue,
remove
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const betsList=document.getElementById("betsList");
const search=document.getElementById("search");
const drawFilter=document.getElementById("drawFilter");
const statusFilter=document.getElementById("statusFilter");

let bets={};

onValue(ref(db,"bets"),snapshot=>{

bets=snapshot.val()||{};

render();

});

search.oninput=render;
drawFilter.onchange=render;
statusFilter.onchange=render;

function render(){

betsList.innerHTML="";

Object.keys(bets).reverse().forEach(id=>{

const bet=bets[id];

if(search.value!=""&&!bet.uid.includes(search.value)) return;

if(drawFilter.value!=""&&bet.draw!==drawFilter.value) return;

if(statusFilter.value!=""&&bet.status!==statusFilter.value) return;

betsList.innerHTML+=`

<div class="bet-card">

<p><b>UID:</b> ${bet.uid}</p>

<p><b>Numbers:</b> ${bet.number1} - ${bet.number2}</p>

<p><b>Draw:</b> ${bet.draw}</p>

<p><b>Credits:</b> ${bet.credits}</p>

<p><b>Status:</b> ${bet.status}</p>

<p>${new Date(bet.time).toLocaleString()}</p>

<button
class="delete"
onclick="deleteBet('${id}')">

Delete Bet

</button>

</div>

`;

});

}

window.deleteBet=async(id)=>{

if(!confirm("Delete this bet?")) return;

await remove(ref(db,"bets/"+id));

};
