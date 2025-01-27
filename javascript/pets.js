
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
    // const images = [
    //     'cat1.jpg',
    //     'cat2.jpg',
    //     'cat3.jpg',
    //     'dog1.jpg',
    //     'dog2.jpg',
    //     'dog3.jpg',
    //     'dog4.jpg',
    //     'dog5.jpg',
    //     'dog6.jpg',  
    // ];
    const images = [
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

    const imageGrid = document.getElementById('imageGrid');
    if (!imageGrid) {
        console.log("No imageGrid found.");
        return; // Exit if imageGrid is not found
    }

    images.forEach(imagePath => {
        const imgElement = document.createElement('img');
        imgElement.src = `../images/pets/${imagePath[0]}`;
        imgElement.alt = 'Random pet image';
        imgElement.classList.add('image-item');
        imgElement.addEventListener('click', () => {
            document.getElementById('pets_popupText-petName').innerText = imagePath[1];;
            document.getElementById('pets_popupText-petDesc').innerText = imagePath[2];;
            document.getElementById('pets_popupText-PetImage').src = `../images/pets/${imagePath[0]}`;;
        });

        // Append the image element to the grid container
        imageGrid.appendChild(imgElement);
        // console.log(`Image appended: ${imgElement.src}`);
    });
}

favoritesGrid();


