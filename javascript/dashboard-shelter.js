// Formularz sprawdzanie

// Ilosc znakow do pola tesktowego
const textarea = document.getElementById('description');
const charCount = document.getElementById('char-count');

textarea.addEventListener('input', function() {
    const remainingChars = 1000 - textarea.value.length;
    charCount.textContent = remainingChars;
});

// Sugerowana lista ras
const rasyPsow = [
    "Labrador Retriever",
    "Owczarek Niemiecki",
    "Golden Retriever",
    "Bulldog",
    "Beagle",
    "Yorkshire Terrier",
    "Pudel",
    "Siberian Husky",
    "Doberman",
    "Shih Tzu"
];

// Funkcja do wypelnienia sugerowanej datalisty
function fillBreedList() {
    const datalist = document.getElementById("rasyPsow");
    datalist.innerHTML = ""; // Wyczyść istniejące opcje
    rasyPsow.forEach(rasa => {
        const option = document.createElement("option");
        option.value = rasa;
        datalist.appendChild(option);
    });
}

// Wywołanie funkcji, aby załadować listę przy starcie
fillBreedList();

// Pobieranie elementów
const btn = document.querySelector(".btn");
const input = document.getElementById("message-input-2");
const datalist = document.getElementById("rasyPsow");

// Sprawdzanie danych przy wysylaniu

function checkBreed() {
    // Walidacja
    if (!rasyPsow.includes(input.value)) {
        alert("Proszę wybrać rasę psa z dostępnej listy!");
        return false;
    } else {
        return true;
    }
}

function checkAge() {
    const ageInput = document.getElementById("message-input-3");
    const age = parseInt(ageInput.value);

    if (isNaN(age)) { // Sprawdzamy, czy konwersja się powiodła
        alert("Wprowadź poprawną liczbę!");
        return false;
    }


    if(age > 0 && age < 29) return true; // Obecnie za najdłużej żyjącego psa uważa się Bluey, australijskiego psa pasterskiego (Australian Cattle Dog), który żył 29 lat i 5 miesięcy
    else {
        alert("Wprowadź poprawną liczbę!");
        return false;
    }
}

function checkSex() {
    const selectElement = document.getElementById("gender-select");
    const selectedValue = selectElement.value;

    if (!(selectedValue === "male" || selectedValue === "female" || selectedValue === "unknown")) {
        alert("Nie wybrano płci!"); // Prawdopodobnie opcja domyślna
    }
}

// Dodawanie zdj
const photo = document.getElementById('petImage');
const photoContainer = document.getElementById('photoContainer');

photo.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            // Create an img element with the uploaded image
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Uploaded Image';
            img.style.width = '250px';
            img.style.height = '250px';
            img.style.objectFit = 'cover';
            
            // Replace the content of the photoContainer with the image
            photoContainer.innerHTML = '';
            photoContainer.appendChild(img);
        };

        reader.readAsDataURL(file); // Read the file as a data URL

        // some backend stuff, send this img smoewhere i dunno
    }
});

// Tworzenie obiektu zwierzaka do pozniejszego zapisania gdzies
function createPet(name, breed, age, sex, desc) {
    const Pet = {
        name: name, 
        breed: breed, 
        age: age, 
        sex: sex, 
        desc: desc
    };

    const jsonPet = JSON.stringify(Pet);

    return jsonPet;
}

btn.addEventListener("click", function(event) {
    checkBreed();
    checkAge();
    checkSex();

    if(!(checkBreed() || checkAge() || checkSex())) {
        // cos rob
    } else {
        const name = document.getElementById("message-input-1").value;
        const breed = document.getElementById("message-input-2").value;
        const age = parseInt(document.getElementById("message-input-3").value);
        const sex = document.getElementById("gender-select").value;
        const desc = document.getElementById("description").value;

        closePopup();
        SuccessPopup();
        console.log(createPet(name, breed, age, sex, desc));
    }
});

