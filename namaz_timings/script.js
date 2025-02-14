navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
    .then(res => res.json())
    .then(data => {
      const locationName = `${data.city}, ${data.countryName}`;
      document.getElementById('location').innerText = `Location: ${locationName}`;
      fetchPrayerTimes(lat, lon, locationName);
    });
}

function error() {
  document.getElementById('location').innerText = "Location access denied!";
}

async function fetchPrayerTimes(lat, lon, locationName) {
  const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`);
  const data = await response.json();

  displayPrayerTimes(data.data.timings, locationName);
  document.getElementById('hijri-date').innerText = `Hijri Date: ${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year}`;
}

function displayPrayerTimes(timings, locationName) {
  const prayerContainer = document.getElementById('prayer-times');
  prayerContainer.innerHTML = `<h2 class="location-header">Prayer Timings for ${locationName}</h2>`;

  const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const prayerNames = {
    Fajr: 'فجر',
    Dhuhr: 'ظہر',
    Asr: 'عصر',
    Maghrib: 'مغرب',
    Isha: 'عشاء'
  };

  prayerOrder.forEach(prayer => {
    const card = document.createElement('div');
    card.className = 'prayer-card';

    const prayerName = document.createElement('h2');
    prayerName.className = 'prayer-name';
    prayerName.innerHTML = `<i class="fas fa-praying-hands"></i> ${prayer} (${prayerNames[prayer]})`;

    const prayerTime = document.createElement('p');
    prayerTime.className = 'prayer-time';
    prayerTime.innerText = timings[prayer];

    card.appendChild(prayerName);
    card.appendChild(prayerTime);

    prayerContainer.appendChild(card);
  });
}
