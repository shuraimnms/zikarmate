document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");

    if (type) {
        document.getElementById("list-title").innerText = type === "surah" ? "Surah List" : "Juz List";
        fetchList(type);
    }
});

// Fetch Surah or Juz List
async function fetchList(type) {
    let url = type === "surah"
        ? "https://api.alquran.cloud/v1/surah"
        : "https://api.alquran.cloud/v1/juz";

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data || !data.data) {
            document.getElementById("list-container").innerHTML = "<p>Error loading data. Please try again.</p>";
            return;
        }

        const listContainer = document.getElementById("list-container");
        listContainer.innerHTML = ""; 

        data.data.forEach((item) => {
            const div = document.createElement("div");
            div.className = "list-item";
            div.innerHTML = `<strong>${item.number}. ${item.englishName || `Juz ${item.number}`}</strong>`;
            div.addEventListener("click", () => openDetails(type, item.number));
            listContainer.appendChild(div);
        });
    } catch (error) {
        document.getElementById("list-container").innerHTML = `<p>Failed to load data: ${error.message}</p>`;
    }
}

// Open Surah or Juz Details Page
function openDetails(type, number) {
    window.location.href = `details.html?${type}=${number}`;
}

// Go Back
function goBack() {
    window.history.back();
}
