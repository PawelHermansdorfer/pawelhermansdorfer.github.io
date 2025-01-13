document.querySelector('.login-button').addEventListener('click', (event) => {
    handleRegister(event);
});

function handleRegister(event) {
    event.preventDefault(); // Zatrzymaj domyślne działanie formularza

    // Pobierz wartości pól formularza
    const shelterName = document.getElementById('shelter_name').value.trim();
    const city = document.getElementById('city').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const repeatPassword = document.getElementById('repeat_password').value.trim();
    const documentInput = document.getElementById('document');

    // Walidacja pól formularza
    if (!shelterName) {
        alert('Pole "Imię" nie może być puste.');
        return;
    }

    if (!city) {
        alert('Pole "Nazwisko" nie może być puste.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Podaj prawidłowy adres email.');
        return;
    }

    if (password.length < 8) {
        alert('Hasło musi mieć co najmniej 8 znaków.');
        return;
    }

    if (password !== repeatPassword) {
        alert('Hasła muszą się zgadzać.');
        return;
    }

    // if (!documentInput.files || documentInput.files.length === 0) {
    //     alert('Nie załączono pliku PDF.');
    //     return;
    // } else {

    //     // Jeśli plik jest załączony, jest pobierany
    //     const uploadedFile = documentInput.files[0];
        
    //     // Sprawdzenie czy plik ma odpowiedni typ - PDF
    //     if (uploadedFile.type !== 'application/pdf') {
    //         alert('Załączony plik nie jest w formacie PDF.');
    //         return;
    //     }

    // }
    const profileType = localStorage.getItem('profileType');

    document.cookie = `UserMail=${email};`
    document.cookie = `UserPassword=${password};`
    document.cookie = `ProfileType=${profileType};`

    if (profileType === 'user') {
        window.location.href = 'dashboard-user.html';

    } else if (profileType === 'shelter') {

        window.location.href = 'dashboard-shelter.html';
    }
}

// Dodawanie zdj
const documentInput = document.getElementById('document');
const addButton = document.getElementById('addButton');
const documentContainer = document.querySelector('.instr_position');

// Komunikat o dodaniu zdj
documentInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        // Sprawdzamy, czy plik jest PDF
        if (file.type !== 'application/pdf') {
            alert('Proszę wybrać plik PDF.');
            documentContainer.innerHTML = ''; // Czyszczenie poprzednich danych
            return;
        }

        const fileSizeInKB = (file.size / 1024).toFixed(2); // Rozmiar pliku w KB
        const fileSizeMessage = `Pomyślnie dodano plik. Rozmiar pliku: ${fileSizeInKB} KB`;

        // Tworzenie komunikatu o rozmiarze pliku
        const sizeMessageElement = document.createElement('div');
        sizeMessageElement.textContent = fileSizeMessage;
        
        // Stylizacja komunikatu o rozmiarze
        sizeMessageElement.style.marginTop = '10px';
        sizeMessageElement.style.fontWeight = 'bold';
        sizeMessageElement.style.color = '#4CAF50';  // Kolor tekstu
        sizeMessageElement.style.backgroundColor = '#f0f0f0';  // Szare tło
        sizeMessageElement.style.padding = '10px';  // Padding wewnętrzny
        sizeMessageElement.style.borderRadius = '8px';  // Zaokrąglone rogi
        sizeMessageElement.style.border = '1px solid #ddd';  // Delikatny border

        // Dodanie komunikatu o rozmiarze do kontenera
        documentContainer.innerHTML = ''; // Czyszczenie poprzednich zawartości
        documentContainer.appendChild(sizeMessageElement);

        // Można wysłać plik na serwer lub zapisać go lokalnie
        console.log('Plik do wysłania:', file);
    } else {
        // Jeśli nie wybrano pliku, czyścimy kontener
        documentContainer.innerHTML = 'Brak załadowanego dokumentu.';
    }
});

// Funkcja obsługująca kliknięcie przycisku "Dodaj dokument"
addButton.addEventListener('click', () => {
    documentInput.click(); // Otwarcie okna wyboru pliku
});
