// === MAP INITIALIZATION ===

let init_zoom = 6;
let min_zoom = 0;
let max_zoom = 17;

let icon_size = 35;
let min_icon_size = 10;
let max_icon_size = 90;

let map = new maplibregl.Map({
    container: 'map',
    style: 'https://tiles.openfreemap.org/styles/bright',
    center: [19.145, 52.069],
    zoom: init_zoom,
    maxZoom: max_zoom,
    minZoom: min_zoom,
    antialias: true,
    attributionControl: false,
    hash: false,
});

// === DRAG & DROP SETUP ===
const dropdown_overlay = document.getElementById('dropdown-overlay');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropdown_overlay.addEventListener(eventName, (e) => e.preventDefault());
    document.body.addEventListener(eventName, (e) => e.preventDefault());
});

['dragenter', 'dragover'].forEach(eventName => {
    document.body.addEventListener(eventName, () => {
        if (logged_in) dropdown_overlay.classList.add('active');
    });
});

['dragleave', 'drop'].forEach(eventName => {
    dropdown_overlay.addEventListener(eventName, () => dropdown_overlay.classList.remove('active'));
});

document.body.addEventListener('drop', (e_) => {
    e_.preventDefault();
    e_.stopPropagation();

    const file = e_.dataTransfer.files[0];
    if (!file) return;
    let file_name = file.name;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        showError('Błąd: obsługiwane są tylko pliki Excel (.xlsx, .xls).');
        return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
        try {
            const data = new Uint8Array(ev.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const column_names = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
            const rows = XLSX.utils.sheet_to_json(worksheet, { raw: false, defval: "" });

            if (!column_names || column_names.length === 0) {
                showError('Plik nie zawiera nagłówków kolumn.');
                return;
            }
            if (!rows || rows.length === 0) {
                showError('Plik nie zawiera wierszy danych.');
                return;
            }

            const coords_column_idx = detectCoordColumn(column_names, rows);

            make_read_excel_panel(file_name, column_names, rows, coords_column_idx);

        } catch (err) {
            console.error(err);
            showError('Błąd podczas odczytu pliku Excel: ' + err.message);
        }
    };
    reader.readAsArrayBuffer(file);
});

