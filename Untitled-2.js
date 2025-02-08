// Selecting treasure elements
const treasures = document.querySelectorAll('.treasure');
const nftPopup = document.getElementById('nft-popup');
const closePopup = document.getElementById('close-popup');
const nftImage = document.getElementById('nft-image');

// List of NFT images (you can replace these with real image URLs)
const nftImages = [
    'https://via.placeholder.com/150/FF0000/FFFFFF?text=NFT+1',
    'https://via.placeholder.com/150/00FF00/FFFFFF?text=NFT+2',
    'https://via.placeholder.com/150/0000FF/FFFFFF?text=NFT+3',
];

// Adding click event listeners to treasures
treasures.forEach((treasure, index) => {
    treasure.addEventListener('click', () => {
        nftImage.src = nftImages[index];
        nftPopup.style.display = 'flex';
    });
});

// Close the popup
closePopup.addEventListener('click', () => {
    nftPopup.style.display = 'none';
});

// Close the popup when clicking outside of the content
window.addEventListener('click', (e) => {
    if (e.target === nftPopup) {
        nftPopup.style.display = 'none';
    }
});
