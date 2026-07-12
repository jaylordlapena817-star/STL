import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";


const betList=document.getElementById("betList");



onAuthStateChanged(auth,(user)=>{


if(!user){

location.href="login.html";

return;

}




onValue(ref(db,"bets"),(snapshot)=>{


betList.innerHTML="";


const data=snapshot.val();



if(!data){


betList.innerHTML="<p>No bets found.</p>";

return;


}





Object.keys(data).reverse().forEach(key=>{


const bet=data[key];



if(bet.uid!==user.uid) return;




betList.innerHTML+=`


<div class="bet-card">


<h2>${bet.draw.toUpperCase()} DRAW</h2>



<p>
Numbers:
<b>${bet.number1} - ${bet.number2}</b>
</p>



<p>
Credits:
<b>${bet.credits}</b>
</p>





<p>
Status:

<span class="status ${bet.status.toLowerCase()}">

${bet.status}

</span>

</p>






<p>
Result:

<span class="result ${bet.result?.toLowerCase() || 'waiting'}">

${bet.result || "Waiting"}

</span>

</p>





<p>

${new Date(bet.time).toLocaleString()}

</p>





</div>


`;



});



});



});
