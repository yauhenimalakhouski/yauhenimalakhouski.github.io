let localData = restoreItems();

getTheme();

function getTheme() {
    if(localData.theme) {
        document.documentElement.setAttribute('theme', 'light');
    }
}

