// Check if running inside WebView
function isWebView() {
    return navigator.userAgent.includes("wv") || navigator.userAgent.includes("Android") || navigator.userAgent.includes("iPhone");
}

// Function to request location permission
function requestLocationPermission(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, handleLocationError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to handle location errors
function handleLocationError(error) {
    if (error.code === error.PERMISSION_DENIED) {
        alert("Location access denied! Enable location in settings.");
    } else {
        alert("Error getting location. Please try again.");
    }
}

// Function to find nearby masjids (Opens Google Maps App in WebView)
function findNearbyMasjid() {
    requestLocationPermission((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const mapsUrl = `https://www.google.com/maps/search/masjid/@${lat},${lon},15z`;

        if (isWebView()) {
            // Open in external browser for WebView apps
            window.open(mapsUrl, "_system");
        } else {
            // Open normally in browser
            window.location.href = mapsUrl;
        }
    });
}

// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    themeToggle.innerHTML = document.body.classList.contains("dark-mode")
        ? `<i class="fas fa-sun"></i> Light Mode`
        : `<i class="fas fa-moon"></i> Dark Mode`;
});
