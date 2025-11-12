function parseCoordinates(pos) {
    if (pos === undefined || pos === null) return null;
    let s = String(pos).trim();
    const coord_regex = /^\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*$/;
    if (!coord_regex.test(s)) return null;
    const parts = s.split(',');
    const lat = parseFloat(parts[0].trim());
    const lon = parseFloat(parts[1].trim());
    if (isNaN(lat) || isNaN(lon)) return null;
    return [lon, lat];
}

function detectCoordColumn(column_names, rows) {
    const coord_regex = /^\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*$/;
    let bestIdx = -1;
    let bestScore = 0;

    for (let i = 0; i < column_names.length; i++) {
        const col = column_names[i];
        let score = 0;
        const sample = rows.slice(0, 50);
        for (let r of sample) {
            const v = r[col];
            if (typeof v === 'string' && coord_regex.test(v.trim())) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            bestIdx = i;
        }
    }
    return bestScore > 0 ? bestIdx : -1;
}

function make_read_excel_panel(title, column_names, rows, coords_column_idx) {
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '999';
    document.body.appendChild(overlay);

    let possible_date_column_idx = 0;
    let possible_category_column_idx = 0;
    for (let i = 0; i < column_names.length; i++) {
        if (String(column_names[i]).toLowerCase().startsWith('data')) {
            possible_date_column_idx = i;
        }
        if (String(column_names[i]).toLowerCase().startsWith('rodzaj')) {
            possible_category_column_idx = i;
        }
    }

    let params = {
        coords_column: coords_column_idx !== -1 ? column_names[coords_column_idx] : column_names[0],
        date_column: column_names[possible_date_column_idx],
        category_column: column_names[possible_category_column_idx],
    };

    let coords_column = params.coords_column;
    let date_column = params.date_column;
    let category_column = params.category_column;

    let options = {};
    column_names.forEach(name => {
        options[name] = name;
    });

    let pane = new Tweakpane.Pane({ title: title});

    if (coords_column_idx === -1) {
        pane.addInput(params, 'coords_column', { options, label: 'Coordinates column' })
            .on('change', (ev) => {
                coords_column = ev.value;
            });
    } else {
        pane.addInput(params, 'coords_column', {
            options,
            label: 'Coordinates column (detected)',
            disabled: false,
        });
    }

    pane.addInput(params, 'date_column', { options, label: 'Date column' })
        .on('change', (ev) => {
            date_column = ev.value;
        });

    pane.addInput(params, 'category_column', { options, label: 'Category column' })
        .on('change', (ev) => {
            category_column = ev.value;
        });

    pane.addButton({ title: 'Load file', })
        .on('click', () => {
            overlay.remove();
            pane.dispose();
            load_map_data(date_column, category_column, coords_column, column_names, rows);
        });

    pane.element.style.width = '420px';
    pane.element.style.position = 'fixed';
    pane.element.style.top = '50%';
    pane.element.style.left = '50%';
    pane.element.style.transform = 'translate(-50%, -50%)';
    pane.element.style.zIndex = '1000';
}