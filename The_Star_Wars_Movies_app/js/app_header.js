let favorites = restoreFavoriteItems();
let currentLang = localData.lang || 'en';


generateFavoriteFilms();
renderSelectLang();

function generateFavoriteFilms() {
    const favoritesContainer = document.querySelector('.favorites-films');
    favoritesContainer.innerHTML = '';
    favorites.forEach(film => {
        let filmContainer = document.createElement('div');
        filmContainer.classList.add('favorite-film');
        filmContainer.innerHTML = `
        <a href="film.html?episode=${+film.episode}" >Episode ${film.episode} - ${film.title}</a>
        `;
        favoritesContainer.append(filmContainer);
    });
}

function toogleFavoritesFilms () {
    const favoritesContainer = document.querySelector('.favorites-films');
    favoritesContainer.classList.toggle('opened');
}

function changeTheme() {
    if (document.documentElement.hasAttribute('theme')) {
        document.documentElement.removeAttribute('theme');
        delete localData.theme;
        storeItems();
    } else {
        document.documentElement.setAttribute('theme', 'light');
        localData.theme = 'light';
        storeItems();
    }
}

function renderSelectLang() {
    const langContainer = document.querySelector('.localization');
    langContainer.innerHTML = `
        <select onchange="getLanguage(this)" class="lang-select">
			<option value="en" class="english">EN</option>
			<option value="ru" class="russian">RU</option>
		</select>
    `;
    getSelectedLang();
}

function getLanguage(selectElement) {
    changeLagnuage(selectElement.value);
}

function changeLagnuage(lang) {
    const dictionary = DICTIONARIES[lang];
    localData.lang = lang;
    storeItems();
    document.querySelectorAll('[data-lang-key]')
    .forEach(elem => {
        const translateKey = elem.dataset.langKey;
        elem.textContent = dictionary[translateKey];
    });
    searchPlaceholderLangChange();
}

function searchPlaceholderLangChange() {
    const searchInput = document.querySelector('#search_input');
    if(localData.lang === "ru") {
        searchInput.setAttribute('placeholder', 'Поиск по номеру эпизода, названию эпизода');
    } else {
        searchInput.setAttribute('placeholder', 'Search by Episode Number, Episode Title');
    }
}