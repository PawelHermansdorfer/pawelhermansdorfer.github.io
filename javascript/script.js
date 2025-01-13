function goBack() {
    window.history.back();
}

// POPUP SETTINGS
function openPopup() {
    let popup = document.getElementById("popupWindow");
    popup.classList.add("Popup-open");
    document.body.style.overflow = 'hidden'; // Zablokowanie przewijania
}

function closePopup() {
    let popup = document.getElementById("popupWindow");
    popup.classList.remove("Popup-open");
    document.body.style.overflow = ''; // Przywrócenie przewijania
}

document.addEventListener('DOMContentLoaded', function() {

    const petWrapper = document.getElementById('petWrapper');
    if (petWrapper) {
        petWrapper.addEventListener('click', function(event) {
            if (event.target.tagName.toLowerCase() === 'img') {
                openPopup();
            }
        });
    }
});

function handleSearch(event) {

    event.preventDefault(); // Zapobiega przeładowaniu strony
    const searchValue = document.getElementById("searchInput").value.trim();

    if (searchValue) {
        // console.log("Wyszukiwane hasło:", searchValue);

        // Tutaj logika wyszukiwania lub przekierowanie

        // Czyści pole po wyszukaniu
        searchInput.value = "";
    } else {
        alert("Proszę wpisać frazę do wyszukania.");
    }
}

// Successful Popup
function SuccessPopup() {
    let popup = document.getElementById("SuccessPopup");
    popup.classList.add("SuccessPopup-open");

    // Ustaw timeout na 3 sekundy
    popupTimeout = setTimeout(CloseSuccessPopup, 3000); // 3000ms = 3s
}

function CloseSuccessPopup() {
    let popup = document.getElementById("SuccessPopup");
    popup.classList.remove("SuccessPopup-open");

    // Wyczyść timeout, jeśli popup zostanie zamknięty ręcznie
    clearTimeout(popupTimeout);
}

// HEADER DYNAMIC NAVIGATION
const naviLogo = document.getElementById('navAnchor');
const settNav = document.getElementById('settNav');
const typeOfProfile = localStorage.getItem('profileType');


if (typeOfProfile === 'user') {
    naviLogo.href = 'dashboard-user.html'; // Ustawienie linku dla użytkownika
    settNav.href = 'settings-user.html';

} else if (typeOfProfile === 'shelter') {
    naviLogo.href = 'dashboard-shelter.html'; // Ustawienie linku dla schroniska
    settNav.href = 'settings-shelter.html';
} 