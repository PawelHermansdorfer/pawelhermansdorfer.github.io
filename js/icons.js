let questionmark_icon = "❓";
let buildin_icon = "🏚️";
let village_icon = "🏘️";
let river_icon = "🏞️";
let forest_icon = "🌲";
let field_icon = "🌾";
let meadow_icon = "🌿";
let mountain_icon = "🗻";
let hill_icon = "🏔️";
let valley_icon = "🛤️";

let icons = [
    questionmark_icon, buildin_icon, village_icon, "🏡", "🏰", "⛪",
    river_icon, "🏞️", forest_icon, "🌳", field_icon, "🌱",
    meadow_icon, mountain_icon, hill_icon, valley_icon,
];

function default_icon_from_category(category) {
    let icon = questionmark_icon;
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
