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
    ['cat1.jpg', `Luna`,    'Luna to dostojna kotka o rudym, połyskującym futrze i dużych, bursztynowych oczach. Jest spokojna, ale lubi towarzystwo ludzi. Często wyleguje się na parapecie, podziwiając otoczenie. Idealna dla osoby, która ceni harmonię i kocią niezależność.'],
    ['cat2.jpg', `Max`,     'Max to młody, kocurek, pełen energii i psot. Uwielbia zabawy w chowanego i wszelkie interaktywne zabawki. Jest ciekawski i zawsze pierwszy do poznawania nowych rzeczy. Szuka aktywnego domu, w którym znajdzie dużo uwagi.'],
    ['cat3.jpg', `Bella`,   'Bella to delikatna kotka o miękkim, szylkretowym futrze. Kocha przytulanie i często mruczy, pokazując swoją wdzięczność. Lubi spędzać czas blisko człowieka i odnajdzie się w spokojnym domu, gdzie będzie jedyną królową.'],
    ['dog1.jpg', `Milo`,    'Milo to silny i zrównoważony pies, który uwielbia długie spacery i aktywności na świeżym powietrzu. Jest bardzo oddany swojemu opiekunowi i świetnie dogaduje się z dziećmi. Idealny kompan dla aktywnej rodziny.'],
    ['dog2.jpg', `Kiki`,    'Kiki to średniej wielkości suczka o puszystym, złocistym futrze. Jest łagodna i spokojna, lubi być głaskana i tulić się do swoich opiekunów. Bella najlepiej odnajdzie się w cichym domu, gdzie będzie mogła być centrum uwagi.'],
    ['dog3.jpg', `Rufus`,   'Rufus to młody pies z niespożytą energią. Uwielbia biegać i odkrywać nowe miejsca. Jest bystry, szybko się uczy i chętnie współpracuje z człowiekiem. Szuka domu, który zapewni mu aktywność i czułość.'],
    ['dog4.jpg', `Daisy`,   'Daisy to niewielka suczka o miękkiej, jasnej sierści i wielkich, brązowych oczach. Jest spokojna i delikatna, idealna do życia w mieszkaniu lub domu z ogrodem. Kocha ciche spacery i wieczory spędzane na kolanach opiekuna.'],
    ['dog5.jpg', `Simba`,   'Simba to duży pies o dostojnej postawie i piaskowym futrze. Jest czujny i opiekuńczy, doskonały jako towarzysz i stróż. Choć wygląda poważnie, w głębi serca to wesoły i czuły przyjaciel, który uwielbia zabawy na świeżym powietrzu.'],
    ['dog6.jpg', `Charlie`, 'Charlie to młody, energiczny piesek o krótkiej, Śnieżnobiałej sierści. Jest niezwykle towarzyski i szybko zaprzyjaźnia się z ludźmi oraz innymi zwierzętami. Idealny do domu, w którym jest miejsce na zabawę i długie spacery.'],
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

    const addToFavButton = document.querySelector('.onImageButton .add2Fav');
    if(favourites.has(pets[idx])) {
        addToFavButton.classList.add('clicked');
    } else {
        addToFavButton.classList.remove('clicked');
    }
}
switchImgs();

////////////////////////////////////////
function add_to_favourite() {
    let pet_to_add = pets[pet_idx % pets.length];
    let in_favourites = 0

    const addToFavButton = document.querySelector('.onImageButton .add2Fav');

    favourites.forEach(pet => {
        if(pet[0] == pet_to_add[0])
        {
            in_favourites = 1;
        }
    })

    if(in_favourites == 0)
    {
        favourites.add(pet_to_add);
        addToFavButton.classList.add('clicked');
    } else {
        favourites.delete(pet_to_add);
        addToFavButton.classList.remove('clicked');
    }

    favourites_array = Array.from(favourites);
    setArrayToCookie('favourites', favourites_array);
    console.log(favourites);

    next_img();
}