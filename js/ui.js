function showError(message) {
    const box = document.createElement('div');
    box.textContent = message;
    box.classList.add('error-notification');

    document.body.appendChild(box);
    setTimeout(() => box.remove(), 6000);
}

function setupUI() {
    const pane = new Tweakpane.Pane({ title: 'Settings' });

    const tabs = pane.addTab({
        pages: [
            {title: 'General'},
            {title: 'Show'},
            {title: 'Icons'},
        ],
    });
    return { pane, tabs };
}

function setupDescriptionUI(pane, tabs, columns, places) {
    const description_folder = tabs.pages[0].addFolder({
        title: 'Description columns',
        expanded: true,
    });
    let description_columns_params = { };
    columns.forEach(column_name => {
        description_columns_params[column_name] = true;
        let checkbox = description_folder.addInput(description_columns_params, column_name);
        checkbox.on('change', (ev) => {
            places.forEach(place => {
                let desc = '';
                columns.forEach(column_name => {
                    if(description_columns_params[column_name])
                    {
                        desc += '<b>' + column_name + '</b>' + ': ' + place.row[column_name] + '<br>'
                    }
                });
                place.marker.setPopup(new maplibregl.Popup().setHTML(desc))
            });
        });
    });
}

function setupDateUI(pane, tabs, dates, places, category_is_active, date_is_active) {
    const dates_folder = tabs.pages[0].addFolder({
        title: 'Dates',
        expanded: true,
    });

    const date_slider_params = {
        show_all_dates: true,
        date_idx: 0,
        include_past: false,
    };
    let date_slider;
    let checkbox_include_past;

    let checkbox_all_dates = dates_folder.addInput(date_slider_params, 'show_all_dates', {label: 'Show all dates'});
    checkbox_all_dates.on('change', (ev) => {
        date_slider.disabled = ev.value;
        checkbox_include_past.disabled = ev.value;
        update_date_filter();
    });

    date_slider = dates_folder.addInput(date_slider_params, 'date_idx', {
        min: 0,
        max: Math.max(0, dates.length - 1),
        step: 1,
        label: 'Display year',
        format: (v) => `${dates[v]}`,
        disabled: true,
    })

    date_slider.on('change', (ev) => {
        update_date_filter();
    });

    checkbox_include_past = dates_folder.addInput(date_slider_params, 'include_past', {
        label: 'Show up to date',
        disabled: true
    })

    checkbox_include_past.on('change', (ev) => {
        update_date_filter();
    })

    function update_date_filter() {
        dates.forEach(date => { date_is_active[date] = false; });

        if (date_slider_params.show_all_dates) {
            dates.forEach(date => { date_is_active[date] = true; });
        } else {
            let selected_year = dates[date_slider_params.date_idx];
            if (date_slider_params.include_past) {
                dates.forEach(date => {
                    if (date <= selected_year) {
                        date_is_active[date] = true;
                    }
                });
            } else {
                date_is_active[selected_year] = true;
            }
        }
        update_markers(places, category_is_active, date_is_active);
    }
}

function setupFilterUI(pane, tabs, columns, places, category_is_active, date_is_active) {
    const filter_folder = tabs.pages[0].addFolder({
        title: 'Filter',
        expanded: true,
    });

    let filter_params = {
        column: columns[0],
        case_sensitive: false,
        phrase: '',
    };

    function filter()
    {
        let min_x = Infinity;
        let max_x = -Infinity;
        let min_y = Infinity;
        let max_y = -Infinity;
        let found_any = false;

        places.forEach(place => {
            let filtered_out;
            const cell = place.row[filter_params.column] ?? '';
            if(filter_params.case_sensitive)
            {
                filtered_out = !(cell.includes(filter_params.phrase));
            }
            else
            {
                filtered_out = !(String(cell).toLowerCase().includes(filter_params.phrase.toLowerCase()));
            }
            place.filtered_out = filtered_out;

            if(!filtered_out)
            {
                min_x = Math.min(min_x, place.x);
                max_x = Math.max(max_x, place.x);

                min_y = Math.min(min_y, place.y);
                max_y = Math.max(max_y, place.y);
                found_any = true;
            }
        });
        update_markers(places, category_is_active, date_is_active);

        if(found_any)
        {
            let bounds = [[min_x, min_y], [max_x, max_y]];
            map.fitBounds(bounds, {
                padding: 70,
                duration: 1000,
                maxZoom: max_zoom * 0.8,
            });
        }
    }

    let column_column_map = {};
    columns.forEach(column => {column_column_map[column] = column;});

    filter_folder.addInput(filter_params, 'column', { options: column_column_map, label: 'Filter by column' })
        .on('change', (ev) => {
            filter();
        });

    filter_folder.addInput(filter_params, 'case_sensitive', { label: 'Case sensitive' })
        .on('change', (ev) => {
            filter();
        });


    filter_folder.addInput(filter_params, 'phrase', {
        label: 'Filter phrase',
        textMode: 'input',
    }).on('change', (ev) => {
        filter();
    });

}

function setupCategoryAndIconUI(pane, tabs, categories, places, category_is_active, date_is_active, bounds) {
    let button_center = tabs.pages[0].addButton({
        title: 'Center',
    });
    button_center.on('click', () => {
        map.fitBounds(bounds, {
            padding: 70,
            duration: 1000
        });
    });

    let icons_params = { };

    let redraw_markers = true;

    let icons_options = Object.fromEntries(icons.map(item => [item, item]));
    categories.forEach(category => {
        let checkbox = tabs.pages[1].addInput(category_is_active, category);
        checkbox.on('change', (ev) => {
            if(redraw_markers)
            {
                update_markers(places, category_is_active, date_is_active);
            }
        });

        // Icons select
        icons_params[category] = default_icon_from_category(category);
        let icon_select = tabs.pages[2].addInput(icons_params, category, {options: icons_options});
        icon_select.on('change', (v) => {
            places.forEach(place => {
                if(place.category == category)
                {
                    const img = place.marker_element.querySelector('img');
                    if (img) {
                        img.src = v.value;
                    }
                }
            });
        });
    });

    let button_show_all = tabs.pages[1].addButton({
        title: 'Show all',
    });
    button_show_all.on('click', () => {
        categories.forEach(category => {category_is_active[category] = true});
        redraw_markers = false;
        pane.refresh();
        update_markers(places, category_is_active, date_is_active);
        redraw_markers = true;
    });

    let button_hide_all = tabs.pages[1].addButton({
        title: 'Hide all',
    });
    button_hide_all.on('click', () => {
        categories.forEach(category => {category_is_active[category] = false});
        redraw_markers = false;
        pane.refresh();
        update_markers(places, category_is_active, date_is_active);
        redraw_markers = true;
    });


    tabs.pages[2].addButton({
        title: 'Set default',
    }).on('click', () => {
        // Przywracamy domyślne ścieżki ikon
        categories.forEach(category => {
            icons_params[category] = default_icon_from_category(category);
        });

        // Dla każdego markera ustawiamy img.src na domyślną ikonę
        places.forEach(place => {
            const img = place.marker_element.querySelector('img');
            if (img) {
                img.src = default_icon_from_category(place.category);
                img.style.width = icon_size + 'px';  // zachowujemy rozmiar
                img.style.height = icon_size + 'px';
            }
        })

        redraw_markers = false;
        pane.refresh();
        update_markers(places, category_is_active, date_is_active);
        redraw_markers = true;
    });



    let icon_size_params = {icon_size: icon_size};
    let icon_size_slider = tabs.pages[2].addInput(icon_size_params, 'icon_size', {
        min: min_icon_size,
        max: max_icon_size,
        step: 1,
        label: 'Icon size',
    });
    icon_size_slider.on('change', (ev) => {
        icon_size = ev.value;
        places.forEach(place => {
            const img = place.marker_element.querySelector('img');
            if (img) {
                img.style.width = ev.value + 'px';
                img.style.height = ev.value + 'px';
            }
        });
    });

}

