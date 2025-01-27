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
        imgElement.addEventListener('click', () => {
            document.getElementById('fv_popupText-petName').innerText = pet[1];;
            document.getElementById('fv_popupText-petDesc').innerText = pet[2];;
            document.getElementById('fv_popupText-PetImage').src = `../images/pets/${pet[0]}`;;
        });

        imageGrid.appendChild(imgElement);
    });
}

favoritesGrid();


