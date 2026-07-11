import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    ref,
    set
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

document.getElementById("registerBtn").onclick = async () => {

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if(!username || !email || !password){
        alert("Please fill in all fields.");
        return;
    }

    try{

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await set(ref(db, "users/" + user.uid), {

            uid: user.uid,
            username: username,
            email: email,
            credits: 0,
            role: "user",
            createdAt: Date.now()

        });

        alert("Registration successful!");

        window.location.href = "dashboard.html";

    }catch(error){

        alert(error.message);

    }

};
