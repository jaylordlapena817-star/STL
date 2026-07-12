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
            <button type="button">
                Go to Dashboard
            </button>
        </a>

        `;

    }else{


        buttons.innerHTML=`

        <a href="login.html">
            <button type="button">
                Login
            </button>
        </a>


        <a href="register.html">
            <button type="button">
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



    document.getElementById("num1").textContent =
    latest.number1;



    document.getElementById("num2").textContent =
    latest.number2;



    document.getElementById("drawName").textContent =
    latest.draw || "Latest Result";

});






// ===========================
// BETTING TIME COUNTDOWN
// ===========================

function updateCountdown(){


    const now=new Date();

    let target=new Date();


    const hour=now.getHours();

    const minute=now.getMinutes();

    const currentTime = hour * 60 + minute;



    /*
    
    MORNING
    4:00 AM - 9:00 AM
    Result 11:00 AM

    */


    if(currentTime >= 240 && currentTime < 540){


        target.setHours(9,0,0,0);


        document.getElementById("cutoff").textContent =
        "🌅 Morning Betting Ends 9:00 AM";


    }



    /*
    
    AFTERNOON
    11:00 AM - 2:00 PM
    Result 4:00 PM

    */


    else if(currentTime >= 660 && currentTime < 840){


        target.setHours(14,0,0,0);



        document.getElementById("cutoff").textContent =
        "☀️ Afternoon Betting Ends 2:00 PM";


    }




    /*
    
    EVENING
    2:00 PM - 8:00 PM
    Result 8:00 PM

    */


    else if(currentTime >= 840 && currentTime < 1200){


        target.setHours(20,0,0,0);



        document.getElementById("cutoff").textContent =
        "🌙 Evening Betting Ends 8:00 PM";


    }





    // CLOSED TIME

    else{


        if(currentTime < 240){


            target.setHours(4,0,0,0);


            document.getElementById("cutoff").textContent =
            "⏳ Morning Betting Opens 4:00 AM";


        }

        else{


            target.setDate(target.getDate()+1);

            target.setHours(4,0,0,0);



            document.getElementById("cutoff").textContent =
            "⏳ Next Betting Tomorrow 4:00 AM";


        }


    }




    const diff=target-now;



    const h=Math.floor(diff/1000/60/60);


    const m=Math.floor(diff/1000/60)%60;


    const s=Math.floor(diff/1000)%60;




    document.getElementById("countdown").textContent =

    `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;


}




setInterval(updateCountdown,1000);

updateCountdown();
