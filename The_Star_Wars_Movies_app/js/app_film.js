changeLagnuage(currentLang);
const searchParams = new URLSearchParams(location.search);
let episodeNumber = ORDER_OF_FILMS[(searchParams.get("episode")-1) || 0];

let charactersAll = [];

renderFilmPage();

async function getDataCharacters() {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/people/all.json`
  );
  const dataCharacters = await response.json();
  const film = await getDataFilm(episodeNumber);
  if(charactersAll.length === 0){
    film.characters.map(element => {
      charactersAll.push(dataCharacters[element-1]);
    });
  }
  return charactersAll;
}

async function renderFilmInfo() {
  const film = await getDataFilm(episodeNumber);
  const filmContainer = document.querySelector(".main-info");
  const release = moment(`${film.release_date}`).format("YYYY MMMM Do");
  const html = `
  <img src="${FILMS_IMG[film.episode_id-1]}" alt='${film.title}' class='film-cover'>
  <div class="description">
    <div class='episode-number'>Episode ${film.episode_id
    }</div>
    <div class='episode-title'>${film.title}</div>
    <h2 data-lang-key="about-film">About film</h2>
    <ul class="about-film">
      <li class='release-date'>
        <span data-lang-key="year-release">Year of production</span>
        <span> ${release}</span>
      </li>
      <li class='country'>
        <span data-lang-key="country">Country</span>
        <span data-lang-key="usa">USA</span>
      </li>
      <li class='genre'>
        <span data-lang-key="genre">Genre</span>
        <span data-lang-key="genre-info">фантастика, фэнтези, боевик, приключения</span>
      </li>
      <li class='director'>
        <span data-lang-key="director">Director</span>
        <span>${film.director}</span>
      </li>
      <li class='screenwriter'>
        <span data-lang-key="writer">Writer</span>
        <span>${film.director}</span>
      </li>
      <li class='producer'>
        <span data-lang-key="producer">Producer</span>
        <span>${film.producer}</span>
      </li>
    </ul>
  </div>
  <div class="film-text">${film.opening_crawl}</div>
  `;
  filmContainer.innerHTML = html;
  const title = document.querySelector('.main-characters-title');
  title.classList.add('show');
}

function renderFilmTrailer(episode) {
  const trailerContainer = document.querySelector('.trailer-container');
  trailerContainer.innerHTML = `
  <iframe class="trailer" src='${FILMS_TRAILERS[episode-1]}' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
`;
}

async function renderCaracters() {
  const btnLoadMore = document.querySelector('#loadMore');
  btnLoadMore.classList.remove('show');
  const loader = document.querySelector('.loader');
  loader.classList.add('show');
  charactersAll = await getDataCharacters(episodeNumber);
  generateCharacters(charactersAll);
  loader.classList.remove('show');
  btnLoadMore.classList.add('show');
  changeLagnuage(currentLang);
}

function generateCharacters(characters) {
  let count = 0;
  const charactersContainer = document.querySelector('.characters');
  for(let i=0; i<characters.length; i++){
    if(charactersContainer.childElementCount%8===0 && charactersContainer.childElementCount!==0){
      i = charactersContainer.childElementCount;
    }
    if(charactersContainer.childElementCount >= characters.length){
      return;
    }
    if(count >= 8){
      return;
    }
    count++;
    let item = document.createElement('li');
    item.classList.add('character');
    item.innerHTML = generateCharacter(characters[i]);
    charactersContainer.append(item);
  }
  if(charactersContainer.childElementCount >= characters.length){
    const btnLoadMore = document.querySelector('#loadMore');
    btnLoadMore.remove();
  }
}

function generateCharacter(character) {
  return `
      <a href="character.html?characterid=${character.id}&filmid=${episodeNumber}">
        <img src="${character.image}" alt="Not found" class="character-photo">
        <div class="character-description">
          <div class="name">${character.name}</div>
          <div class="homeworld">
            <span data-lang-key="home-colon">Home:</span>
            <span>${character.homeworld}</span>
          </div>
          <div class="born">
            <span data-lang-key="born-colon">Born:</span>
            <span>${character.birth_year}</span>
          </div>
          <div class="species">
            <span data-lang-key="species-colon">Species:</span>
            <span>${character.species}</span>
          </div>
        </div>
      </a>
  `;
}

async function renderMoreFilms() {
  const films = await getDataFilms();
  const moreFilmsContainer = document.querySelector('.more-films');
  let episodesInterval = [];
  if( episodeNumber === 1 ) {
    episodesInterval.push(episodeNumber+1, episodeNumber+2);
  } else if ( episodeNumber === films.length) {
    episodesInterval.push(episodeNumber-1, episodeNumber-2);
  } else {
    episodesInterval.push(episodeNumber-1, episodeNumber+1);
  }
  let title = document.createElement('h3');
  title.setAttribute('data-lang-key', 'like-film');
  title.innerHTML = 'If you liked this movie:';
  moreFilmsContainer.before(title);
  const moreFilms = await films.filter(film => episodesInterval.includes(film.episode_id));
  moreFilms.forEach(film => {
    let filmContainer = document.createElement('div');
    filmContainer.classList.add('film');
    filmContainer.innerHTML = `
    <a href="film.html?episode=${film.episode_id}">
      <img src="${FILMS_IMG[film.episode_id-1]}" alt="" class="film-img">
      <div>Episode ${film.episode_id}</div>
      <div>${film.title}</div>
    </a>
    `;
    moreFilmsContainer.append(filmContainer);
  });
}

async function renderFilmPage() {
  await renderFilmInfo();
  renderFilmTrailer(episodeNumber);
  await renderCaracters();
  renderMoreFilms();
  removeLoadingStyle();
  changeLagnuage(currentLang);
}



