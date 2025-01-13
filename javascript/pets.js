
document.addEventListener('DOMContentLoaded', function() {
    const imageGrid = document.getElementById('imageGrid');
    if (imageGrid) {
        imageGrid.addEventListener('click', function(event) {
            if (event.target.tagName.toLowerCase() === 'img') {
                openPopup();
            }
        });
    }
});


// TEMPORAL FUNCTIONS — REPLACE WITH BACKEND
function favoritesGrid() {

    // Array of image filenames
    const images = [
        'cat1.jpg',
        'cat2.jpg',
        'cat3.jpg',
        'dog1.jpg',
        'dog2.jpg',
        'dog3.jpg',
        'dog4.jpg',
        'dog5.jpg',
        'dog6.jpg',  
    ];

    const imageGrid = document.getElementById('imageGrid');
    if (!imageGrid) {
        console.log("No imageGrid found.");
        return; // Exit if imageGrid is not found
    }

    images.forEach(imagePath => {
        const imgElement = document.createElement('img');
        imgElement.src = `../images/${imagePath}`;
        imgElement.alt = 'Random pet image';
        imgElement.classList.add('image-item');

        // Append the image element to the grid container
        imageGrid.appendChild(imgElement);
        // console.log(`Image appended: ${imgElement.src}`);
    });
}

favoritesGrid();


