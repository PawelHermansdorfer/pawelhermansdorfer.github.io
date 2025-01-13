document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const profileType = urlParams.get('profile');
    const accTypeElement = document.getElementById('accType');


    if (profileType === 'user') {
        accTypeElement.textContent = 'Profil użytkownika';
    } else if (profileType === 'shelter') {
        accTypeElement.textContent = 'Profil schroniska';
    } else {
        accTypeElement.textContent = 'Nie wybrano profilu';
    }
});

document.querySelector('.login-button').addEventListener('click', (event) => {
    handleLogin(event);
});

////////////////////////////////////////
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

function handleLogin(event) {
    event.preventDefault(); // Zatrzymaj domyślne działanie formularza

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Regex do sprawdzania poprawności adresu email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Podaj prawidłowy adres email.');
        return;
    }

    if (password.length < 8) {
        alert('Hasło musi mieć co najmniej 8 znaków.');
        return;
    }

    // Pobierz parametry z URL
    const urlParams = new URLSearchParams(window.location.search);
    const profile = urlParams.get('profile'); // Odczytaj parametr 'profile'

    saved_email = getCookie('UserMail');
    saved_password = getCookie('UserPassword');
    saved_account_type = getCookie('ProfileType');

    if(saved_email != email || saved_password != password)
    {
        alert('Niepoprawne hasło/email');
    }
    else
    {
        if(saved_account_type != profile)
        {
            alert('Niepoprawny rodzaj konta');
        }
        else 
        {
            if (profile === 'user') {
                window.location.href = 'dashboard-user.html';
            } else if (profile === 'shelter') {
                window.location.href = 'dashboard-shelter.html';
            } else {
                window.location.href = 'dashboard-user.html';
            }
        }
    }
}
