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

const form = document.getElementById('customer-form');
const notification = document.getElementById('notification');

function verifyCustomer(event) {
    event.preventDefault(); // Prevent default form submission

    const aadhaarNumber = document.getElementById('aadhaarNumber').value.trim();
    const fullName = document.getElementById('fullName').value.trim();

    // Basic validation
    if (aadhaarNumber === "" || aadhaarNumber.length !== 4) {
        notification.textContent = "Please enter a valid 4-digit Aadhaar number.";
        notification.style.color = "red";
        return;
    }

    if (fullName === "") {
        notification.textContent = "Please enter the full name as per Aadhaar.";
        notification.style.color = "red";
        return;
    }

    // Save data to Firebase
    set(ref(db, 'verifycustomer/' + aadhaarNumber), {
        AadhaarNumber: aadhaarNumber,
        FullName: fullName
    })
    .then(() => {
        notification.textContent = "Customer verified successfully!";
        notification.style.color = "green";

        // Clear form fields
        document.getElementById('aadhaarNumber').value = "";
        document.getElementById('fullName').value = "";

        // Redirect after success
        setTimeout(() => {
            window.location.href = "axis8.html";
        }, 1000); // Delay for user to see the success message
    })
    .catch((error) => {
        notification.textContent = "Failed to verify customer: " + error.message;
        notification.style.color = "red";
    });
}

// Attach event listener to the form
form.addEventListener('submit', verifyCustomer);
