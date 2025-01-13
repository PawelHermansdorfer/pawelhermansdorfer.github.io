// Pobranie parametrów z URL
const urlParams = new URLSearchParams(window.location.search);
const action = urlParams.get('action'); // Odczytuje wartość parametru 'action'

// Ustawienie tytułu na podstawie akcji
const loginTitle = document.getElementById('loginTitle');
let LogOrReg = action;

if (typeof action !== 'undefined' && action) { 
    if (action === 'login') {
        loginTitle.textContent = 'Zaloguj się';
    } else if (action === 'register') {
        loginTitle.textContent = 'Zarejestruj się';
    } else {
        loginTitle.textContent = 'Wybierz opcję'; // Domyślny tytuł
    }
} else {
    console.warn('Brak zdefiniowanej akcji!'); // Ostrzeżenie w konsoli
}

var profileType = "";
function goToNextPage() {
    const selectedProfile = document.querySelector('input[name="profile_type"]:checked');
    if (selectedProfile) {

        profileType = selectedProfile.value;
        localStorage.setItem('profileType', profileType);

        if(LogOrReg === "login") {
            window.location.href = `login.html?profile=${profileType}`;
        } else if(LogOrReg === "register") {

            if(profileType === 'user'){
                window.location.href = `register-user.html`;   
            } else if(profileType === 'shelter') {
                window.location.href = `register-shelter.html`;
            }

        }

    } else {
        profileType = 'user';
    }
}


// Logika typu konta polegac narazie bedzie na tym ze decydujemy jakie konto mam na poczatku
// tutaj nam sie zmienia zmienna i to pozwala dobrze dzialac przelaczaniu sie kontentu na ekranach
// pozniej bedziemy to czytac z typu konta
// Trzyma profileType