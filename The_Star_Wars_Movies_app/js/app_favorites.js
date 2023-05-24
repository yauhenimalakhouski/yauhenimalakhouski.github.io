// let localData = restoreItems();
let favorites = restoreFavoriteItems();
let currentLang = localData.lang || 'en';

// getTheme();
generateFavoriteFilms();
// renderSelectLang();


function generateFavoriteFilms() {
    const container = document.querySelector('.favorites-films');
    container.innerHTML = '';
    favorites.forEach(film => {
        let filmContainer = document.createElement('div');
        filmContainer.classList.add('favorite-film');
        filmContainer.innerHTML = `
        <a href="film.html?episode=${+film.episode}" >Episode ${film.episode} - ${film.title}</a>
        `;
        container.append(filmContainer);
    });
}

function toogleFavoritesFilms () {
    const container = document.querySelector('.favorites-films');
    container.classList.toggle('opened');
}


// function changeTheme() {
//     const btn = document.querySelector('#toggle-theme');
//     if (document.documentElement.hasAttribute('theme')) {
//         document.documentElement.removeAttribute('theme');
//         btn.value = 'Dark';
//         delete localData.theme;
//         storeItems();
//     } else {
//         document.documentElement.setAttribute('theme', 'light');
//         btn.value = 'Light';
//         localData.theme = 'light';
//         storeItems();
//     }
// }

// function getTheme() {
//     const btn = document.querySelector('#toggle-theme');
//     if(localData.theme) {
//         document.documentElement.setAttribute('theme', 'light');
//         btn.value = 'Light';
//     } else {
//         btn.value = 'Dark';
//     }
// }

// function renderSelectLang() {
//     const container = document.querySelector('.localization');
//     container.innerHTML = `
//         <select onchange="getLanguage(this)" class="lang-select">
// 			<option value="en" class="english">EN</option>
// 			<option value="ru" class="russian">RU</option>
// 		</select>
//     `
//     getSelectedLang();
// }

// function getLanguage(selectElement) {
//     changeLagnuage(selectElement.value);
// }

// function changeLagnuage(lang){
//     const dictionary = DICTIONARIES[lang];
//     localData.lang = lang;
//     storeItems();
//     document.querySelectorAll('[data-lang-key]')
//     .forEach(elem => {
//         const translateKey = elem.dataset.langKey;
//         elem.textContent = dictionary[translateKey];
//     });
// }