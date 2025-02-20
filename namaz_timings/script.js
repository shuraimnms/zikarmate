document.addEventListener("DOMContentLoaded", () => {
  requestLocation();
});

// **Request Location and Refresh Always**
function requestLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
  } else {
      document.getElementById('location').innerText = "⚠️ Geolocation is not supported by this browser.";
  }
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetchCityName(lat, lon);
  fetchPrayerTimes(lat, lon);
}

function error() {
  document.getElementById('location').innerText = "⚠️ Location access denied!";
}

// **Fetch City Name**
function fetchCityName(lat, lon) {
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then(res => res.json())
      .then(data => {
          const city = data.address.city || data.address.town || data.address.village || "Unknown";
          document.getElementById('location').innerText = `📍 Location: ${city}`;
      })
      .catch(() => {
          document.getElementById('location').innerText = "📍 Location: Not found";
      });
}

// **Fetch Prayer Times**
function fetchPrayerTimes(lat, lon) {
  fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=1`)
      .then(res => res.json())
      .then(data => {
          showPrayerTimes(data.data.timings);
          showAdditionalTimes(data.data.timings);
          document.getElementById('hijri-date').innerText = 
              `📅 Hijri Date: ${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`;
          scheduleAdhanNotifications(data.data.timings);
      })
      .catch(err => console.error("Error fetching prayer times:", err));
}

// **Convert 24-hour to 12-hour format**
function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute < 10 ? "0" : ""}${minute} ${ampm}`;
}

// **Show Prayer Times**
function showPrayerTimes(timings) {
  const prayerContainer = document.getElementById('prayer-times');
  prayerContainer.innerHTML = "";

  const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  prayerOrder.forEach(prayer => {
      const card = document.createElement('div');
      card.className = 'prayer-card';
      card.setAttribute("data-prayer", prayer);

      const muteStatus = localStorage.getItem(`mute_${prayer}`) === "true";

      card.innerHTML = `
          <strong>${prayer}</strong>: ${formatTime(timings[prayer])} 
          <button onclick="toggleMute('${prayer}')" id="mute-${prayer}">
              ${muteStatus ? "🔇 Unmute" : "🔔 Mute"}
          </button>
          <button onclick="listenAdhan('${prayer}')">🎵 Listen</button>
      `;

      prayerContainer.appendChild(card);
  });
}

// **Show Additional Timings**
function showAdditionalTimes(timings) {
  const extraContainer = document.getElementById('extra-times');
  extraContainer.innerHTML = `
      🌅 <strong>Sunrise:</strong> ${formatTime(timings.Sunrise)}  
      🌄 <strong>Sunset:</strong> ${formatTime(timings.Sunset)}  
      🌙 <strong>Tahajjud:</strong> ${formatTime(timings.Lastthird)}  
      🕛 <strong>Midnight:</strong> ${formatTime(timings.Midnight)}  
  `;
}

// **Mute Toggle**
function toggleMute(prayer) {
  const isMuted = localStorage.getItem(`mute_${prayer}`) === "true";
  localStorage.setItem(`mute_${prayer}`, !isMuted);
  document.getElementById(`mute-${prayer}`).innerText = isMuted ? "🔔 Mute" : "🔇 Unmute";
}

// **Global Audio Player**
let currentAudio = null;

// **Listen to Adhan**
function listenAdhan(prayer) {
  if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
  }

  const adhanFiles = {
      Fajr: "https://www.islamcan.com/audio/adhan/azan1.mp3",
      Dhuhr: "https://www.islamcan.com/audio/adhan/azan2.mp3",
      Asr: "https://www.islamcan.com/audio/adhan/azan3.mp3",
      Maghrib: "https://www.islamcan.com/audio/adhan/azan4.mp3",
      Isha: "https://www.islamcan.com/audio/adhan/azan5.mp3",
      Default: "https://www.islamcan.com/audio/adhan/azan2.mp3"
  };

  const audioUrl = adhanFiles[prayer] || adhanFiles.Default;
  currentAudio = new Audio(audioUrl);
  currentAudio.play().catch(error => console.error(`Audio play error for ${prayer}:`, error));
}

// **Auto Play Adhan**
function playAdhan(prayer) {
  if (localStorage.getItem(`mute_${prayer}`) === "true") {
      return;
  }

  if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
  }

  const audioUrl = adhanFiles[prayer] || adhanFiles.Default;
  currentAudio = new Audio(audioUrl);
  currentAudio.play().catch(error => console.error(`Adhan auto-play error for ${prayer}:`, error));
}

// **Schedule Notifications**
function scheduleAdhanNotifications(timings) {
  const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  prayerOrder.forEach(prayer => {
      const time = timings[prayer];
      if (!time) return;

      const [hour, minute] = time.split(":").map(Number);
      const now = new Date();
      const adhanTime = new Date();

      adhanTime.setHours(hour, minute, 0, 0);

      if (adhanTime > now) {
          setTimeout(() => {
              if (Notification.permission === "granted") {
                  new Notification(`Time for ${prayer}!`, { 
                      body: "Click to listen to the Adhan", 
                      icon: "https://example.com/icon.png" 
                  });
              }
              playAdhan(prayer);
          }, adhanTime.getTime() - now.getTime());
      }
  });
}

// **Request Notification Permission Once**
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}