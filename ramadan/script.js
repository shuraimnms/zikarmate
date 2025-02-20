document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
    setInterval(getUserLocation, 600000); // Refresh location every 10 minutes (600000ms)
});

function initializeApp() {
    setupEventListeners();
    createRozaTracker();
    updateRozaProgress();
    applySavedPreferences();
    getUserLocation(); // Get user location & calculate timings
}

function setupEventListeners() {
    const modeToggle = document.getElementById("dark-mode-toggle");
    modeToggle.addEventListener("click", toggleDarkMode);
    document.getElementById("toggle-language").addEventListener("click", toggleLanguage);
    document.getElementById("calculate-zakat").addEventListener("click", calculateZakat);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const modeToggle = document.getElementById("dark-mode-toggle");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", true);
        modeToggle.textContent = "Light Mode";
    } else {
        localStorage.setItem("darkMode", false);
        modeToggle.textContent = "Dark Mode";
    }
}

function toggleLanguage() {
    const currentLang = document.getElementById("title").textContent;
    if (currentLang === "Ramadan Tracker") {
        document.getElementById("title").textContent = "رمضان ٹریکر";
    } else {
        document.getElementById("title").textContent = "Ramadan Tracker";
    }
}

function calculateZakat() {
    const amount = parseFloat(document.getElementById("zakat-input").value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById("zakat-result").textContent = "Please enter a valid amount.";
        return;
    }
    const zakat = (amount * 2.5) / 100;
    document.getElementById("zakat-result").textContent = `Your Zakat: $${zakat.toFixed(2)}`;
}

// 🌍 Get User's Location & Fetch Timings
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchPrayerTimes, showError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// 📌 Fetch Suhur & Iftar based on user's location
function fetchPrayerTimes(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiURL = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1`; // Karachi Uni Method

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const timings = data.data.timings;
            const suhurTime = convertTo12HourFormat(timings.Fajr);
            const iftarTime = convertTo12HourFormat(timings.Maghrib);

            document.getElementById("suhur-time").textContent = `Suhur: ${suhurTime}`;
            document.getElementById("iftar-time").textContent = `Iftar: ${iftarTime}`;
        })
        .catch(error => console.error("Error fetching prayer times:", error));

    // 📍 Get and display the user's city/town name
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            const location = data.address.city || data.address.town || data.address.village || "Unknown Location";
            document.getElementById("location").textContent = `📍 Location: ${location}`;
        })
        .catch(error => console.error("Error fetching location:", error));
}

// ⏰ Convert 24-hour format to 12-hour format (AM/PM)
function convertTo12HourFormat(time) {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    let period = hours >= 12 ? "PM" : "AM";

    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }

    return `${hours}:${minutes} ${period}`;
}

function applySavedPreferences() {
    document.body.classList.add("dark-mode"); // Always start in dark mode
    const modeToggle = document.getElementById("dark-mode-toggle");
    modeToggle.textContent = "Light Mode"; // Initial button text
}

function createRozaTracker() {
    const rozaDays = document.getElementById("calendar");
    rozaDays.innerHTML = "";

    for (let i = 1; i <= 30; i++) {
        let dayButton = document.createElement("button");
        dayButton.classList.add("day");
        dayButton.innerText = i;

        if (localStorage.getItem("roza-" + i) === "completed") {
            dayButton.classList.add("completed");
        }

        dayButton.addEventListener("click", () => {
            dayButton.classList.toggle("completed");

            if (dayButton.classList.contains("completed")) {
                localStorage.setItem("roza-" + i, "completed");
            } else {
                localStorage.removeItem("roza-" + i);
            }

            updateRozaProgress();
        });

        rozaDays.appendChild(dayButton);
    }
}

function updateRozaProgress() {
    let completedFasts = 0;

    for (let i = 1; i <= 30; i++) {
        if (localStorage.getItem("roza-" + i) === "completed") {
            completedFasts++;
        }
    }

    let progressPercent = Math.round((completedFasts / 30) * 100);
    document.getElementById("roza-progress").innerText = `${progressPercent}%`;
    document.getElementById("total-fasts").innerText = `${completedFasts}/30`;
}

// ❌ Handle Geolocation Errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
