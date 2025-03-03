let films = [];

async function parseFilms() {
    const response = await fetch("data.json")
    films = await response.json();
    showFilms(films);
    countryFilter(films);
    sort();
}

function showFilms(films) {
    // new container
    const container = document.getElementById("film-container");
    container.innerHTML = "";

    // run through films
    films.forEach((film) => {
        // create new section
        const element = document.createElement("section");
        element.classList.add("film");

        // image with link
        const imageLink = document.createElement("a");
        imageLink.href = film.url;
        imageLink.target = "_blank";
        imageLink.innerHTML = `<img src="${film.img}" alt="${film.title}">`;

        // text content
        const content = document.createElement("div");
        content.classList.add("film-content");

        // title with link
        const titleLink = document.createElement("a");
        titleLink.href = film.url || "#";
        titleLink.target = "_blank";
        titleLink.innerHTML = `<h2>${film.title}</h2>`;

        // main info
        content.appendChild(titleLink);
        content.innerHTML += `
            <p><strong>Directed by:</strong> ${film.director}</p>
            <p><strong>Release Year:</strong> ${film.release_year}</p>
            <p><strong>Box Office:</strong> $${film.box_office}</p>
            <p><strong>Country:</strong> ${film.country}</p>
        `;

        element.appendChild(imageLink);
        element.appendChild(content);

        container.appendChild(element);
    });
}

function countryFilter(films) {
    const filter = document.getElementById("country-filter");

    // get unique countries
    const countries = [...new Set(films.map((film) => film.country))];

    // add options to dropdown menu
    countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        filter.appendChild(option);
    });

    filter.addEventListener("change", applyFiltersAndSorting);
}

function sort() {
    const sortBy = document.getElementById("sort-by");

    // get event of change of sort parameter
    sortBy.addEventListener("change", applyFiltersAndSorting);
}

function applyFiltersAndSorting() {
    // filter films by country
    const country = document.getElementById("country-filter").value;
    let filteredFilms = country === "all"
        ? films
        : films.filter((film) => film.country === country);

    // sort films by given parameter
    const sortBy = document.getElementById("sort-by").value;
    switch (sortBy) {
        case "year-asc":
            filteredFilms.sort((a, b) => a.release_year - b.release_year);
            break;
        case "year-desc":
            filteredFilms.sort((a, b) => b.release_year - a.release_year);
            break;
        case "title-asc":
            filteredFilms.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "title-desc":
            filteredFilms.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            break;
    }

    showFilms(filteredFilms);
}

parseFilms();