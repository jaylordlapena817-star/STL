import { auth, db } from "./firebase.js";

import {
    push,
    ref,
    set,
    get,
    child
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";


const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const draw = document.getElementById("draw");
const amount = document.getElementById("amount");
const status = document.getElementById("status");
const betBtn = document.getElementById("betBtn");


// Generate numbers 1-40

for(let i = 1; i <= 40; i++){

    const option1 = document.createElement("option");
    option1.value = i;
    option1.text = i;
    num1.appendChild(option1);


    const option2 = document.createElement("option");
    option2.value = i;
    option2.text = i;
    num2.appendChild(option2);

}



// Check betting schedule

function bettingOpen(){

    const now = new Date();
    const hour = now.getHours();


    if(draw.value === "morning"){

        return hour < 9;

    }


    if(draw.value === "afternoon"){

        return hour < 14;

    }


    if(draw.value === "evening"){

        return hour < 18;

    }


    return false;

}




function updateStatus(){

    if(bettingOpen()){

        status.innerHTML = "🟢 Betting Open";

        betBtn.disabled = false;


    }else{


        status.innerHTML = "🔴 Betting Closed";

        betBtn.disabled = true;


    }

}


draw.onchange = updateStatus;

updateStatus();





// Submit Bet

betBtn.onclick = async()=>{


    const user = auth.currentUser;



    if(!user){

        alert("Please login first.");

        return;

    }




    const betAmount = Number(amount.value);



    if(!betAmount || betAmount <= 0){

        alert("Enter valid bet amount.");

        return;

    }





    // Check user balance

    try{


        const dbRef = ref(db);


        const snapshot = await get(
            child(dbRef, "users/" + user.uid)
        );



        if(!snapshot.exists()){


            alert("User account not found.");

            return;


        }





        const userData = snapshot.val();


        const balance = Number(userData.credits || 0);





        if(balance < betAmount){


            alert(
                "Insufficient credits!\nYour balance: " 
                + balance
            );


            return;


        }






        // Create bet


        const betRef = push(ref(db,"bets"));



        await set(betRef,{


            uid:user.uid,


            number1:Number(num1.value),


            number2:Number(num2.value),


            draw:draw.value,


            credits:betAmount,



            // Admin approval status

            status:"Pending",



            // Draw result status

            result:"Waiting",



            time:Date.now()


        });





        alert(
            "Bet Submitted!\nWaiting for admin approval."
        );



    }catch(error){


        console.error(error);


        alert("Error submitting bet.");


    }



};
