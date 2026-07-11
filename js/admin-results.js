import { auth, db } from "./firebase.js";

import {
    ref,
    push,
    set,
    get,
    update
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const draw = document.getElementById("draw");
const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const publishBtn = document.getElementById("publishBtn");

// Generate numbers
for(let i = 1; i <= 40; i++){

    number1.innerHTML += `<option value="${i}">${i}</option>`;
    number2.innerHTML += `<option value="${i}">${i}</option>`;

}

publishBtn.onclick = async () => {

    if(number1.value === number2.value){

        alert("Numbers cannot be the same.");
        return;

    }

    publishBtn.disabled = true;
    publishBtn.innerHTML = "Publishing...";

    try{

        // Save Result
        const resultRef = push(ref(db,"results"));

        await set(resultRef,{

            draw: draw.value,
            number1: Number(number1.value),
            number2: Number(number2.value),
            time: Date.now()

        });

        // Check Bets
        const betsSnapshot = await get(ref(db,"bets"));

        if(betsSnapshot.exists()){

            const bets = betsSnapshot.val();

            for(const betId in bets){

                const bet = bets[betId];

                if(
                    bet.draw.toLowerCase() !== draw.value.toLowerCase()
                ) continue;

                const win =

                    Number(bet.number1) === Number(number1.value) &&
                    Number(bet.number2) === Number(number2.value);

                if(win){

                    const prize = Number(bet.credits) * 2;

                    await update(ref(db,"bets/"+betId),{

                        status:"Win",
                        prize:prize

                    });

                    const userRef = ref(db,"users/"+bet.uid);

                    const userSnap = await get(userRef);

                    if(userSnap.exists()){

                        const user = userSnap.val();

                        await update(userRef,{

                            credits:(user.credits || 0) + prize

                        });

                    }

                }else{

                    await update(ref(db,"bets/"+betId),{

                        status:"Lose",
                        prize:0

                    });

                }

            }

        }

        alert("Result published successfully!");

    }catch(error){

        alert(error.message);

    }

    publishBtn.disabled = false;
    publishBtn.innerHTML = "Publish Result";

};
