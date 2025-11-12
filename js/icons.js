let icon_size = 35;
let min_icon_size = 10;
let max_icon_size = 90;


let default_icon = "assets/icon.png";
let buildin_icon = "assets/house.png";
let village_icon = "assets/village.png";
let river_icon = "assets/river.png";
let forest_icon = "assets/forest.png";
let field_icon = "assets/field.png";
let meadow_icon = "assets/meadow.png";
let mountain_icon = "assets/mountain.png";
let hill_icon = "assets/hill.png";
let valley_icon = "assets/valley.png";

let icons = [
    default_icon, buildin_icon, village_icon,
    river_icon, forest_icon, field_icon,
    meadow_icon, mountain_icon, hill_icon, valley_icon,
];

function default_icon_from_category(category) {
    let icon = default_icon;
    switch (category) {
        case 'budynek': icon = buildin_icon; break;
        case 'część wsi':
        case 'wieś': icon = village_icon; break;
        case 'rzeka':
        case 'potok': icon = river_icon; break;
        case 'las':
        case 'część lasu': icon = forest_icon; break;
        case 'pole':
        case 'pola': icon = field_icon; break;
        case 'łąki': icon = meadow_icon; break;
        case 'góra':
        case 'góra, szczyt': icon = mountain_icon; break;
        case 'kopiec':
        case 'masyw':
        case 'skała': icon = hill_icon; break;
        case 'dolina':
        case 'przełęcz':
        case 'jar': icon = valley_icon; break;
    }
    return icon;
}
