import { auth, db } from "./firebase.js";


import {

onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";



import {

ref,

onValue

} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";





// ===========================
// LOGIN CHECK
// ===========================


onAuthStateChanged(auth,(user)=>{


const buttons=document.getElementById("buttons");



if(user){


buttons.innerHTML=`

<a href="dashboard.html">

<button>
Go to Dashboard
</button>

</a>
`;


}else{


buttons.innerHTML=`

<a href="login.html">

<button>
Login
</button>

</a>



<a href="register.html">

<button>
Register
</button>

</a>

`;

}


});








// ===========================
// LATEST RESULT
// ===========================


onValue(ref(db,"results"),(snapshot)=>{


const data=snapshot.val();



if(!data) return;




const keys=Object.keys(data);


const latest=data[keys[keys.length-1]];



document.getElementById("num1").textContent=
latest.number1;



document.getElementById("num2").textContent=
latest.number2;



document.getElementById("drawName").textContent=
latest.draw;



});









// ===========================
// BETTING COUNTDOWN
// ===========================


function updateCountdown(){



const now=new Date();


let target=new Date();



const hour=now.getHours();






// Morning betting cutoff

if(hour < 10){


target.setHours(10,0,0,0);


document.getElementById("cutoff").textContent=
"Morning Betting Ends";


}





// Afternoon betting cutoff

else if(hour < 15){


target.setHours(15,0,0,0);



document.getElementById("cutoff").textContent=
"Afternoon Betting Ends";


}





// Evening betting cutoff

else if(hour < 19){


target.setHours(19,0,0,0);



document.getElementById("cutoff").textContent=
"Evening Betting Ends";


}






else{


target.setDate(target.getDate()+1);


target.setHours(10,0,0,0);



document.getElementById("cutoff").textContent=
"Next Betting Opens Tomorrow";


}






const diff=target-now;



const h=Math.floor(diff/1000/60/60);



const m=Math.floor(diff/1000/60)%60;



const s=Math.floor(diff/1000)%60;





document.getElementById("countdown").textContent=

`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;



}



setInterval(updateCountdown,1000);


updateCountdown();
