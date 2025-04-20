// Function to shuffle the images
function shuffleImages() {
    const galleryContainer = document.querySelector('.gallery-container');
    const images = Array.from(galleryContainer.children);

    // Shuffle using Fisher-Yates algorithm
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }

    // Reattach shuffled images
    galleryContainer.innerHTML = '';
    images.forEach(image => galleryContainer.appendChild(image));
}

// Modal elements
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const images = document.querySelectorAll(".gallery-image");

// Attach click listeners to all gallery images
images.forEach(image => {
    image.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = image.src;
        captionText.textContent = image.alt || "DeenPlus Islamic Image";
    });
});

// Close modal function
function closeModal() {
    modal.style.display = "none";
}

// Download (and optionally share) image
function shareImage() {
    const imageURL = modalImg.src;
    const imageCaption = captionText.textContent || "DeenPlus Islamic Image";

    if (!imageURL) {
        alert("Image URL not found.");
        return;
    }

    // Fetch the image as a blob and download it
    fetch(imageURL, { mode: 'cors' })
        .then(response => response.blob())
        .then(blob => {
            const blobURL = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobURL;
            link.download = imageCaption.replace(/\s+/g, '_') + '.jpg'; // Clean file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobURL);
            alert("Image downloaded successfully.");
        })
        .catch(error => {
            console.error("Download failed:", error);
            alert("Failed to download image. Please try again.");
        });
}

// Close modal on background click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Shuffle images when the window loads
window.addEventListener('load', shuffleImages);
