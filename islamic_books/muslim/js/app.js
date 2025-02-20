document.addEventListener("DOMContentLoaded", function () {
    loadChapters(); // Load chapters initially
});

// Function to load chapters dynamically
function loadChapters() {
    const chaptersContainer = document.getElementById("chapters");
    chaptersContainer.innerHTML = '';

    sahihMuslimData.chapters.forEach(chapter => {
        const chapterElement = document.createElement("li");
        chapterElement.classList.add("chapter");

        // Display both Arabic and English names
        chapterElement.innerHTML = `
            <span class="chapter-arabic">${chapter.arabic}</span> - 
            <span class="chapter-english">${chapter.english}</span>
        `;

        chapterElement.onclick = () => {
            window.location.href = `topic.html?chapterId=${chapter.id}`;
        };

        chaptersContainer.appendChild(chapterElement);
    });
}

// Function to perform instant search with smooth appearance
function searchHadith() {
    const query = document.getElementById('search-bar').value.trim().toLowerCase();
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';

    if (query === '') {
        searchResultsContainer.style.display = 'none'; // Hide search results if empty
        return;
    }

    searchResultsContainer.style.display = 'block'; // Show search results
    const filteredHadiths = sahihMuslimData.hadiths.filter(hadith => 
        hadith.arabic.toLowerCase().includes(query) || 
        hadith.english.text.toLowerCase().includes(query)
    );

    if (filteredHadiths.length === 0) {
        searchResultsContainer.innerHTML = '<p style="text-align: center; color: #f1c40f;">No results found</p>';
    } else {
        filteredHadiths.forEach((hadith, index) => {
            setTimeout(() => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                resultItem.innerHTML = `
                    <p><strong>Hadith Number:</strong> ${hadith.number}</p>
                    <p class="hadith-arabic">${hadith.arabic}</p>
                    <p class="hadith-english"><strong>${hadith.english.narrator}:</strong> ${hadith.english.text}</p>
                `;
                searchResultsContainer.appendChild(resultItem);
            }, index * 100); // Staggered appearance effect
        });
    }
}

// Attach event listener for real-time search
const searchBar = document.getElementById('search-bar');
if (searchBar) {
    searchBar.addEventListener('input', searchHadith);
}
