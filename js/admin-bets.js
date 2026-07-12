import { db } from "./firebase.js";

import {
ref,
onValue,
remove,
update
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



        if(search.value!=="" && !bet.uid.includes(search.value))
            return;


        if(drawFilter.value!=="" && bet.draw!==drawFilter.value)
            return;


        if(statusFilter.value!=="" && bet.status!==statusFilter.value)
            return;



        let action="";



        // Pending approval

        if(bet.status==="Pending"){


            action=`

            <button 
            class="approve"
            onclick="approveBet('${id}')">

            ✅ Approve

            </button>


            <button 
            class="reject"
            onclick="rejectBet('${id}')">

            ❌ Reject

            </button>

            `;


        }





        betsList.innerHTML+=`


        <div class="bet-card">


        <p><b>UID:</b> ${bet.uid}</p>


        <p><b>Numbers:</b> ${bet.number1} - ${bet.number2}</p>


        <p><b>Draw:</b> ${bet.draw}</p>


        <p><b>Credits:</b> ${bet.credits}</p>


        <p><b>Status:</b> ${bet.status}</p>


        <p><b>Result:</b> ${bet.result}</p>


        <p>${new Date(bet.time).toLocaleString()}</p>


        ${action}



        <button
        class="delete"
        onclick="deleteBet('${id}')">

        Delete Bet

        </button>



        </div>


        `;


    });


}





// Approve bet

window.approveBet=async(id)=>{


    if(!confirm("Approve this bet?"))
        return;



    await update(ref(db,"bets/"+id),{


        status:"Approved"


    });



};





// Reject bet

window.rejectBet=async(id)=>{


    if(!confirm("Reject this bet?"))
        return;



    await update(ref(db,"bets/"+id),{


        status:"Rejected"


    });



};





// Delete bet

window.deleteBet=async(id)=>{


    if(!confirm("Delete this bet?"))
        return;



    await remove(ref(db,"bets/"+id));


};
