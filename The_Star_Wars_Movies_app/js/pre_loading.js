let localData = restoreItems();
let currentLang = localData.lang || 'en';

getTheme();
renderSelectLang();

function changeTheme() {
    const btn = document.querySelector('#toggle-theme');
    if (document.documentElement.hasAttribute('theme')) {
        document.documentElement.removeAttribute('theme');
        btn.value = 'Dark';
        delete localData.theme;
        storeItems();
    } else {
        document.documentElement.setAttribute('theme', 'light');
        btn.value = 'Light';
        localData.theme = 'light';
        storeItems();
    }
}

function getTheme() {
    const btn = document.querySelector('#toggle-theme');
    if(localData.theme) {
        document.documentElement.setAttribute('theme', 'light');
        btn.value = 'Light';
    } else {
        btn.value = 'Dark';
    }
}

function getSelectedLang() {
    if(localData.lang === undefined){
      return;
    }
    const select = document.querySelector(`[value = ${localData.lang}]`)
    select.setAttribute('selected', '');
}

function renderSelectLang() {
    const container = document.querySelector('.localization');
    container.innerHTML = `
        <select onchange="getLanguage(this)" class="lang-select">
			<option value="en" class="english">EN</option>
			<option value="ru" class="russian">RU</option>
		</select>
    `
    getSelectedLang();
}

function getLanguage(selectElement) {
    changeLagnuage(selectElement.value);
}

function changeLagnuage(lang){
    const dictionary = DICTIONARIES[lang];
    localData.lang = lang;
    storeItems();
    document.querySelectorAll('[data-lang-key]')
    .forEach(elem => {
        const translateKey = elem.dataset.langKey;
        elem.textContent = dictionary[translateKey];
    });
}