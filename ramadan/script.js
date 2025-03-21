document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
    setInterval(getUserLocation, 600000); // Refresh location every 10 minutes
});

function initializeApp() {
    setupEventListeners();
    createRozaTracker();
    updateRozaProgress();
    applySavedPreferences();
    getUserLocation();
}

function setupEventListeners() {
    document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
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
    document.getElementById("title").textContent = currentLang === "Ramadan Tracker" ? "رمضان ٹریکر" : "Ramadan Tracker";
}

// 📌 **Zakat Calculator (Now in Indian Rupees)**
function calculateZakat() {
    const amount = parseFloat(document.getElementById("zakat-input").value);
    
    if (isNaN(amount) || amount <= 0) {
        document.getElementById("zakat-result").textContent = "براہ کرم درست رقم درج کریں۔";
        return;
    }

    const zakat = (amount * 2.5) / 100; // 2.5% Zakat Calculation
    document.getElementById("zakat-result").textContent = `آپ کا زکوٰة: ₹${zakat.toFixed(2)}`;
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

// 📌 Fetch Suhur & Iftar Timings
function fetchPrayerTimes(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiURL = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const timings = data.data.timings;
            document.getElementById("suhur-time").textContent = `Suhur: ${convertTo12HourFormat(timings.Fajr)}`;
            document.getElementById("iftar-time").textContent = `Iftar: ${convertTo12HourFormat(timings.Maghrib)}`;
        })
        .catch(error => console.error("Error fetching prayer times:", error));

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

// 🌙 **Roza Tracker (Fast Tracking)**
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

// 🔄 **Update Roza Progress**
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

// ❌ **Handle Geolocation Errors**
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

// 🎨 **Apply Saved Preferences (Always Start in Dark Mode)**
function applySavedPreferences() {
    document.body.classList.add("light-mode");
    document.getElementById("dark-mode-toggle").textContent = "Light Mode";
}
