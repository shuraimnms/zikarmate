// JavaScript for Folder Click Navigation
document.querySelectorAll('.folder').forEach(folder => {
  folder.addEventListener('click', () => {
      const link = folder.getAttribute('data-link');
      window.location.href = link;
  });
});

// Randomize Card Positions on Page Load
window.addEventListener('DOMContentLoaded', () => {
  const folderContainer = document.querySelector('.folders'); 
  const folders = Array.from(folderContainer.children);

  // Shuffle folders using Fisher-Yates algorithm
  for (let i = folders.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      folderContainer.appendChild(folders[j]);
  }
});

// Search Functionality with Dynamic Filtering
const searchInput = document.getElementById('search');
const folderContainer = document.querySelector('.folders');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const folders = Array.from(folderContainer.children);

  // Filter folders based on search query
  folders.forEach(folder => {
      const title = folder.querySelector('h2').textContent.toLowerCase();
      folder.style.display = title.includes(query) ? 'flex' : 'none';
  });
});
