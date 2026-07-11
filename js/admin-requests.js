import { db } from "./firebase.js";

import {
ref,
onValue,
update,
get
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const requestList = document.getElementById("requestList");

let requests = {};

onValue(ref(db,"creditRequests"),(snapshot)=>{

    requests = snapshot.val() || {};

    render();

});

function render(){

    requestList.innerHTML = "";

    Object.keys(requests).reverse().forEach(id=>{

        const item = requests[id];

        requestList.innerHTML += `

        <div class="request-card">

            <p><b>User UID:</b> ${item.uid}</p>

            <p><b>Credits:</b> ${item.amount}</p>

            <p><b>Status:</b> ${item.status}</p>

            <p>${new Date(item.time).toLocaleString()}</p>

            ${
                item.status==="Pending"
                ?
                `<div class="actions">

                    <button
                    class="approve"
                    onclick="approve('${id}')">

                    Approve

                    </button>

                    <button
                    class="reject"
                    onclick="reject('${id}')">

                    Reject

                    </button>

                </div>`
                :
                ""
            }

        </div>

        `;

    });

}

window.approve = async(id)=>{

    const req = requests[id];

    const userRef = ref(db,"users/"+req.uid);

    const userSnap = await get(userRef);

    if(userSnap.exists()){

        const user = userSnap.val();

        await update(userRef,{

            credits:(user.credits||0)+Number(req.amount)

        });

    }

    await update(ref(db,"creditRequests/"+id),{

        status:"Approved"

    });

};

window.reject = async(id)=>{

    await update(ref(db,"creditRequests/"+id),{

        status:"Rejected"

    });

};
