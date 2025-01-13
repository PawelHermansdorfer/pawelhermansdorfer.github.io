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

function getArrayFromCookie(cookieName) {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(cookieName + '='));
    if (cookieValue) {
        const decodedValue = decodeURIComponent(cookieValue.split('=')[1]);
        return JSON.parse(decodedValue);
    }
    return null;
}

function favoritesGrid() {

    const favourites = getArrayFromCookie('favourites');

    const imageGrid = document.getElementById('imageGrid');
    if (!imageGrid) {
        console.log("No imageGrid found.");
        return;
    }

    favourites.forEach(pet => {
        const imgElement = document.createElement('img');
        imgElement.src = `../images/pets/${pet[0]}`;
        imgElement.alt = 'Pet image';
        imgElement.classList.add('image-item');

        imageGrid.appendChild(imgElement);
    });

    // const images = [
    //     'pets/cat1.jpg',
    //     'pets/cat2.jpg',
    //     'pets/cat3.jpg',
    //     'pets/dog1.jpg',
    //     'pets/dog2.jpg',
    //     'pets/dog3.jpg',
    //     'pets/dog4.jpg',
    //     'pets/dog5.jpg',
    //     'pets/dog6.jpg',  
    // ];

    // const imageGrid = document.getElementById('imageGrid');
    // if (!imageGrid) {
    //     console.log("No imageGrid found.");
    //     return; // Exit if imageGrid is not found
    // }

    // images.forEach(imagePath => {
    //     const imgElement = document.createElement('img');
    //     imgElement.src = `../images/${imagePath}`;
    //     imgElement.alt = 'Random pet image';
    //     imgElement.classList.add('image-item');

    //     imageGrid.appendChild(imgElement);
    // });
}

favoritesGrid();


