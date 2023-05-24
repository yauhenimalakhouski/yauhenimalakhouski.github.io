changeLagnuage(currentLang);
generateAllFilms();

let items;

const buttonTile = document.querySelector('.tile-view');
const buttonTable = document.querySelector('.table-view');

renderSortSelect();

async function generateAllFilms(){
  const films = await getDataFilms();
  items = await films.slice();
  getSelectedView();
  renderFilms(films, getSort(localData.sort) || sortEpisodeUp());
}

async function renderFilms(films, sortFn) {
  const loader = document.querySelector('.loader');
  const container = document.querySelector('.films_wrapper');
  container.innerHTML = '';
  films.sort(sortFn)
  .forEach((film) => {
    const item = document.createElement('div');
    item.classList.add('film');
    item.setAttribute('data-episode', `${film.episode_id}`);
    item.setAttribute('data-title', `${film.title}`);
    const release = moment(`${film.release_date}`).format("YYYY MMMM Do"); 
    item.innerHTML = `
      <a href = "film.html?episode=${film.episode_id}">
        <img src='${FILMS_IMG[film.episode_id-1]}' alt='${film.title}' class='film-cover'>
      </a>
        <div class="description">
          <div class = "short-description">
            <div>
              <a href = "film.html?episode=${film.episode_id}">
                <div class='episode-number'>Episode ${film.episode_id}</div>
                <div class='episode-title'>${film.title}</div>
              </a>
              <div class='release-date'>Release: ${release}</div>
              <div class="film-producer">Producers: ${film.producer}</div>
            </div>
            <button type="button" class="favorite" data-episode = ${film.episode_id}></button>
          </div>
          <div class="film-text">${film.opening_crawl}</div>
        </div>
    `;
    container.append(item);
  });
  await favorites.forEach((film) => {
    let favoriteFilm = document.querySelector(`.favorite[data-episode = "${film.episode}"]`);
    if(favoriteFilm){
      favoriteFilm.classList.add('active');
    }
  });
  loader.classList.add('hide');
}

async function searchFilms() {
  const films = await getDataFilms();
  const searchInput = document.querySelector('#search_input');
  const text = searchInput.value.toLowerCase();
  items = films.filter(film => {
    return film.title.toLowerCase().includes(text) || String(film.episode_id).includes(text);
  });
  renderFilms(items, getSort(localData.sort));
}

function onSortingChange(selectElement) {
  const sorting = selectElement.value;
  if (sorting === 'episode-up') {
    renderFilms(items, sortEpisodeUp());
    localData.sort = 'episode-up';
    storeItems();
  }
  if (sorting === 'episode-down') {
    renderFilms(items, sortEpisodeDown());
    localData.sort = 'episode-down';
    storeItems();
  }
  if (sorting === 'film-release-up') {
    renderFilms(items, sortFilmReleaseUp());
    localData.sort = 'film-release-up';
    storeItems();
  }
  if (sorting === 'film-release-down') {
    renderFilms(items, sortFilmReleaseDown());
    localData.sort = 'film-release-down';
    storeItems();
  }
}

function renderSortSelect() {
  const container = document.querySelector('.sort-container');
  container.innerHTML = `
  <select onchange="onSortingChange(this)" class="sort_select">
					<option value="episode-up" data-lang-key="sort-from-first">From the first episode</option>
					<option value="episode-down" data-lang-key="sort-from-last">From the last episode</option>
					<option value="film-release-up" data-lang-key="sort-from-old">From old to new</option>
					<option value="film-release-down" data-lang-key="sort-from-new">From new to old</option>
	</select>
  `;
  getSelectedSort();
}

function showTableView() {
  const container = document.querySelector('.films_wrapper');
  if(container.classList.contains('tile')) {
    container.classList.remove('tile');
    buttonTile.classList.remove('selected');
  }
  container.classList.add('table');
  buttonTable.classList.add('selected');
  localData.view = 'table';
  storeItems();
}

function showTileView() {
  const container = document.querySelector('.films_wrapper');
  if(container.classList.contains('table')) {
    container.classList.remove('table');
    buttonTable.classList.remove('selected');
  }
  container.classList.add('tile');
  buttonTile.classList.add('selected');
  localData.view = 'tile';
  storeItems();
}

function getSelectedView() {
  if(localData.view === 'tile'){
    showTileView();
  }
  if(localData.view === 'table'){
    showTableView();
    let elem = document.querySelector('.table-view');
    elem.classList.add('selected');
  }
}

function addToFavorites(event) {
  if(!event.target.classList.contains('favorite')){
    return;
  }
  let targetFilm = event.target.closest('.film');
  let newFavoriteFilm = {
    episode: `${targetFilm.dataset.episode}`,
    title: `${targetFilm.dataset.title}`,
  };
  if(event.target.classList.contains('active')){
    event.target.classList.remove('active');
    favorites = favorites.filter((film) => +film.episode !== +targetFilm.dataset.episode);
    storeFavoriteItems();
    generateFavoriteFilms();
  } else {
    event.target.classList.add('active');
    favorites.push(newFavoriteFilm);
    storeFavoriteItems();
    generateFavoriteFilms();
  }
}

let filmContainer = document.querySelector('.films_wrapper');
filmContainer.addEventListener('click', addToFavorites);

showTimeToRelease();

function showTimeToRelease(){
  let time = 0;
  const container = document.querySelector('.time-left');
  let timeContainer = document.createElement('div');
  timeContainer.classList.add('timer');
  container.append(timeContainer);
  let releaseTime = new Date(2023, 11, 12);
  let intervalId = setInterval(() => {
    let time = releaseTime - Date.now();

    // let html = `
    //   <span data-lang-key="days-left">Days</span>
    //   <span>: ${moment(time).format('DDD')}, </span>
    //   <span data-lang-key="hours-left">Hours</span>
    //   <span>: ${moment(time).format('HH')}, </span>
    //   <span data-lang-key="minutes-left">Minutes</span>
    //   <span>: ${moment(time).format('mm')},</span>
    //   <span data-lang-key="seconds-left">Seconds</span>
    //   <span>: ${moment(time).format('ss')}.</span>
    // `;
    // div.innerHTML = html;



    timeContainer.textContent = `Days: ${moment(time).format('DDD')}, Hours: ${moment(time).format('HH')},
     Minutes: ${moment(time).format('mm')}, Seconds: ${moment(time).format('ss')}.`;
});
  if(time < 0) {
    clearInterval(intervalId);
  }
}

changeLagnuage(currentLang);