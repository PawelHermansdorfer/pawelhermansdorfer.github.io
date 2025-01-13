function setArrayToCookie(cookieName, array) {
    const jsonArray = JSON.stringify(array);
    document.cookie = `${cookieName}=${encodeURIComponent(jsonArray)};`;
}
function getArrayFromCookie(cookieName) {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(cookieName + '='));
    if (cookieValue) {
        const decodedValue = decodeURIComponent(cookieValue.split('=')[1]);
        return JSON.parse(decodedValue);
    }
    return null;
}

////////////////////////////////////////
const pets = [
    ['cat1.jpg', `Luna`,    '1'],
    ['cat2.jpg', `Max`,     '2'],
    ['cat3.jpg', `Bella`,   '3'],
    ['dog1.jpg', `Milo`,    '4'],
    ['dog2.jpg', `Kiki`,    '5'],
    ['dog3.jpg', `Rufus`,   '6'],
    ['dog4.jpg', `Daisy`,   '7'],
    ['dog5.jpg', `Simba`,   '8'],
    ['dog6.jpg', `Charlie`, '9'],
];
let pet_idx = 0;
let favourites = new Set(getArrayFromCookie('favourites'));


////////////////////////////////////////
function next_img() {
    pet_idx += 1;
    switchImgs(pet_idx);
}

function prev_img() {
    pet_idx -= 1;
    if(pet_idx < 0) pet_idx = pets.length - 1;
    switchImgs(pet_idx);
}

function switchImgs(new_idx){
    if(new_idx == null) new_idx = pet_idx; // on init
    const petImageContainer = document.querySelector('.petImage');
    const petNameContainer = document.querySelector('.petName');

    let idx = new_idx % pets.length;
    const selectedImage = `../images/pets/${pets[idx][0]}`;
    const selectedName = pets[idx][1];
    const selectedDesc = pets[idx][2];

    // Update popup name and descriptio
    document.getElementById('popupText-petName').innerText = selectedName;
    document.getElementById('popupText-petDesc').innerText = selectedDesc;
    document.getElementById('popupText-PetImage').src = selectedImage;


    const imgElement = document.createElement('img');
    imgElement.src = selectedImage;
    imgElement.alt = 'Random pet image';

    petImageContainer.innerHTML = '';
    petImageContainer.appendChild(imgElement);
    petNameContainer.textContent = selectedName;

}
switchImgs();

////////////////////////////////////////
function add_to_favourite() {
    favourites.add(pets[pet_idx % pets.length]);
    favourites_array = Array.from(favourites);
    setArrayToCookie('favourites', favourites_array);
    next_img();
}
