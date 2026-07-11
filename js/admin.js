import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    ref,
    get,
    onValue
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        location.href = "login.html";
        return;
    }

    try {

        // Check user data
        const userRef = ref(db, "users/" + user.uid);
        const userSnap = await get(userRef);

        if (!userSnap.exists()) {
            alert("User data not found!");
            location.href = "dashboard.html";
            return;
        }

        const userData = userSnap.val();

        // Check admin role
        if (userData.role !== "admin") {
            alert("Access Denied");
            location.href = "dashboard.html";
            return;
        }

        // ==========================
        // Total Users
        // ==========================
        onValue(ref(db, "users"), (snap) => {

            document.getElementById("users").textContent =
                snap.exists() ? Object.keys(snap.val()).length : 0;

        });

        // ==========================
        // Total Bets
        // ==========================
        onValue(ref(db, "bets"), (snap) => {

            document.getElementById("bets").textContent =
                snap.exists() ? Object.keys(snap.val()).length : 0;

        });

        // ==========================
        // Total Credit Requests
        // ==========================
        onValue(ref(db, "creditRequests"), (snap) => {

            document.getElementById("requests").textContent =
                snap.exists() ? Object.keys(snap.val()).length : 0;

        });

    } catch (err) {

        console.error(err);
        alert("Failed to load admin data.");

    }

});
