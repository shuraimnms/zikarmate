let availableQaris = [];
let selectedQari = "1"; // Default to Sudais
let currentPlaying = null;
let surahData = [];
let currentIndex = -1;

// 📂 Use IndexedDB for efficient storage
let db;
const DB_NAME = "QuranAudioDB";
const STORE_NAME = "surahs";

// Open IndexedDB
function openDB() {
    let request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = function (event) {
        let db = event.target.result;
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
    };
    request.onsuccess = function (event) {
        db = event.target.result;
        loadSurahs();
    };
    request.onerror = function () {
        console.error("Error opening database");
    };
}

// 📂 Check if Surah is downloaded for the selected Qari
function isSurahDownloaded(surahID, qariID, callback) {
    let transaction = db.transaction([STORE_NAME], "readonly");
    let store = transaction.objectStore(STORE_NAME);
    let request = store.get(`${surahID}_${qariID}`);

    request.onsuccess = function () {
        callback(request.result ? true : false);
    };
}

// 🔄 Load Available Qaris (Reciters)
async function loadQaris() {
    try {
        const response = await fetch("https://api.quran.com/api/v4/resources/recitations");
        const data = await response.json();
        const qariSelector = document.getElementById("qariSelector");

        qariSelector.innerHTML = "";
        availableQaris = data.recitations;

        availableQaris.forEach(qari => {
            let option = document.createElement("option");
            option.value = qari.id;
            option.textContent = `🎙️ ${qari.reciter_name}`;
            qariSelector.appendChild(option);
        });

        qariSelector.value = "1"; // Set Sudais as default
        selectedQari = "1";
        qariSelector.addEventListener("change", () => {
            selectedQari = qariSelector.value;
            loadSurahs(); // Reload the download status
        });
    } catch (error) {
        console.error("Error loading Qaris:", error);
        alert("⚠ Error fetching Reciters.");
    }
}

// 📖 Load Surahs
async function loadSurahs() {
    try {
        const response = await fetch("https://api.quran.com/api/v4/chapters");
        const data = await response.json();
        surahData = data.chapters;
        displaySurahs(surahData);
    } catch (error) {
        console.error("Error loading Surahs:", error);
        alert("⚠ Error fetching Surahs.");
    }
}

// 🔎 Filter Surahs based on Search Query
function filterSurahs() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let filteredSurahs = surahData.filter(surah =>
        surah.name_simple.toLowerCase().includes(query) ||
        surah.name_arabic.toLowerCase().includes(query) ||
        surah.id.toString().includes(query)
    );
    displaySurahs(filteredSurahs);
}

// 📌 Display Surahs in the List
function displaySurahs(surahListData) {
    const surahList = document.getElementById("surahList");
    surahList.innerHTML = "";

    surahListData.forEach((surah, index) => {
        isSurahDownloaded(surah.id, selectedQari, (isDownloaded) => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${surah.id}. ${surah.name_simple} (${surah.name_arabic})</span>
                <button class="small-btn" onclick="playSurah(${index})">▶ Play</button>
                <button class="small-btn" id="downloadBtn_${surah.id}" onclick="downloadSurah(${index})">
                    ${isDownloaded ? "✅ Downloaded" : "⬇ Download"}
                </button>
            `;
            surahList.appendChild(listItem);
        });
    });
}

// 🎵 Play Surah Audio (Offline/Online)
async function playSurah(index) {
    if (index < 0 || index >= surahData.length) return;

    currentIndex = index;
    let surahID = surahData[index].id;
    const audioPlayer = document.getElementById("audioPlayer");

    let transaction = db.transaction([STORE_NAME], "readonly");
    let store = transaction.objectStore(STORE_NAME);
    let request = store.get(`${surahID}_${selectedQari}`);

    request.onsuccess = function () {
        if (request.result) {
            // Play offline
            document.getElementById("playingSurah").textContent = `🎵 Now Playing (Offline): ${surahData[index].name_simple}`;
            audioPlayer.src = request.result.audio;
            audioPlayer.play();
        } else {
            // Fetch online if not downloaded
            const apiUrl = `https://api.quran.com/api/v4/chapter_recitations/${selectedQari}/${surahID}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.audio_file && data.audio_file.audio_url) {
                        document.getElementById("playingSurah").textContent = `🎵 Now Playing: ${surahData[index].name_simple}`;
                        audioPlayer.src = data.audio_file.audio_url;
                        audioPlayer.play();
                    }
                })
                .catch(error => console.error("Error playing Surah audio:", error));
        }
    };
}

// ⬇ Download Surah (Save in IndexedDB for the selected Qari)
async function downloadSurah(index) {
    let surahID = surahData[index].id;
    const apiUrl = `https://api.quran.com/api/v4/chapter_recitations/${selectedQari}/${surahID}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.audio_file && data.audio_file.audio_url) {
            let transaction = db.transaction([STORE_NAME], "readwrite");
            let store = transaction.objectStore(STORE_NAME);
            store.put({ id: `${surahID}_${selectedQari}`, audio: data.audio_file.audio_url });

            // Update button UI
            document.getElementById(`downloadBtn_${surahID}`).textContent = "✅ Downloaded";

            // Play the downloaded surah immediately
            playSurah(index);
        }
    } catch (error) {
        console.error("Error downloading Surah:", error);
        alert("⚠ Error downloading audio.");
    }
}

// 🔄 Load Qaris & Open Database on Page Load
window.onload = function () {
    openDB();
    loadQaris();
};
