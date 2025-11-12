function update_markers(places, category_is_active, date_is_active) {
    places.forEach(place => {
        if (category_is_active[place.category] && date_is_active[place.date] && !place.filtered_out) {
            place.marker.addTo(map);
        } else {
            place.marker.remove();
        }
    });
}


function load_map_data(date_column, category_column, coords_column, columns, rows) {
    const firstValid = findFirstValidCoordinate(rows, coords_column);
    if (!firstValid) {
        showError('Nie znaleziono poprawnych współrzędnych w kolumnie: ' + coords_column);
        return;
    }

    const { places, categories, dates, bounds } = preparePlaces(rows, coords_column, category_column, date_column, columns);

    if (places.length === 0) {
        showError('Brak poprawnych punktów do wyświetlenia.');
        return;
    }

    dates.sort(sortDates);
    const category_is_active = Object.fromEntries(categories.map(c => [c, true]));
    const date_is_active = Object.fromEntries(dates.map(d => [d, true]));

    update_markers(places, category_is_active, date_is_active);
    map.fitBounds(bounds, { padding: 70, duration: 1000 });

    const { pane, tabs } = setupUI();
    setupDescriptionUI(pane, tabs,  columns, places);
    setupDateUI(pane, tabs, dates, places, category_is_active, date_is_active);
    setupFilterUI(pane, tabs, columns, places, category_is_active, date_is_active);
    setupCategoryAndIconUI(pane, tabs, categories, places, category_is_active, date_is_active);
}

// ==================== LOGIKA DANYCH ====================

function findFirstValidCoordinate(rows, coords_column) {
    for (const r of rows) {
        const parsed = parseCoordinates(r[coords_column]);
        if (parsed) return parsed;
    }
    return null;
}

function preparePlaces(rows, coords_column, category_column, date_column, columns) {
    let min_x, max_x, min_y, max_y;
    const places = [];
    const categories = [];
    const dates = [];

    for (const row of rows) {
        const coords = parseCoordinates(row[coords_column]);
        if (!coords) continue;
        const [x, y] = coords;

        if (min_x === undefined) {
            min_x = max_x = x;
            min_y = max_y = y;
        } else {
            min_x = Math.min(min_x, x);
            max_x = Math.max(max_x, x);
            min_y = Math.min(min_y, y);
            max_y = Math.max(max_y, y);
        }

        const category = parseCategory(row[category_column]);
        const date = parseDate(row[date_column]);

        const desc = buildDescription(row, columns);
        const marker = createMarker(x, y, category, desc);
        const marker_element = marker.getElement();

        places.push({ marker, marker_element, row, x, y, category, date, filtered_out: false });

        if (!categories.includes(category)) categories.push(category);
        if (!dates.includes(date)) dates.push(date);
    }

    const bounds = [[min_x, min_y], [max_x, max_y]];
    return { places, categories, dates, bounds };
}

function parseCategory(value) {
    return value ? value : 'undefined';
}

function parseDate(value) {
    if (!value && value !== 0) return 'undefined';
    if (typeof value === 'number') return Math.floor(value);
    const match = String(value).match(/(\d{4})/);
    return match ? parseInt(match[1]) : 'undefined';
}

function buildDescription(row, columns) {
    return columns.map(c => `<b>${c}</b>: ${row[c] ?? ''}`).join('<br>');
}

function createMarker(x, y, category, desc) {
    const treeMarker = document.createElement('div');

    const img = document.createElement('img');
    img.src = default_icon_from_category(category);
    img.style.width = icon_size + 'px';
    img.style.height = icon_size + 'px';
    img.style.objectFit = 'contain';
    img.style.pointerEvents = 'none';

    treeMarker.appendChild(img);

    return new maplibregl.Marker({ element: treeMarker })
        .setLngLat([x, y])
        .setPopup(new maplibregl.Popup().setHTML(desc))
        .addTo(map);
}

function sortDates(a, b) {
    if (a === 'undefined') return 1;
    if (b === 'undefined') return -1;
    return a - b;
}



