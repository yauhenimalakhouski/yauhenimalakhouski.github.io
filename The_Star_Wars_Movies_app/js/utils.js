function storeItems() {
  localStorage.setItem("localData", JSON.stringify(localData));
}

function restoreItems() {
  return JSON.parse(localStorage.getItem("localData")) || {};
}

function storeFavoriteItems() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function restoreFavoriteItems() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function sortEpisodeUp() {
  return (a,b) => +a.episode_id- +b.episode_id;
}

function sortEpisodeDown() {
  return (a,b) => +b.episode_id- +a.episode_id;
}

function sortFilmReleaseDown() {
  return (a,b) => +b.release_date.slice(0, 4)- +a.release_date.slice(0, 4);
}

function sortFilmReleaseUp() {
  return (a,b) => +a.release_date.slice(0, 4)- +b.release_date.slice(0, 4);
}

function getSort(sort) {
  if(sort === 'episode-up') {
    return sortEpisodeUp();
  }
  if(sort === 'episode-down') {
    return sortEpisodeDown();
  }
  if(sort === 'film-release-up') {
    return sortFilmReleaseUp();
  }
  if(sort === 'film-release-down') {
    return sortFilmReleaseDown();
  }
}

function getSelectedSort() {
  if(localData.sort === undefined){
    return;
  }
  const select = document.querySelector(`[value = ${localData.sort}]`)
  select.setAttribute('selected', '');
}

async function getDataFilms() {
  const response = await fetch(`https://desfarik.github.io/star-wars/api/film/all.json`);
  const data = await response.json();
  return data;
}

async function getDataFilm(episode) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/film/${episode}.json`
  );
  const data = await response.json();
  return data;
}

function getSelectedLang() {
  if(localData.lang === undefined){
    return;
  }
  const select = document.querySelector(`[value = ${localData.lang}]`)
  select.setAttribute('selected', '');
}

function removeLoadingStyle() {
  const elements = document.querySelectorAll('.loading');
  elements.forEach(elem => {
    elem.classList.remove('loading');
  })
}