const searchParams = new URLSearchParams(location.search);
let characterId = +searchParams.get("characterid") || 0;

renderCharacterPage();

async function getDataCharacter(characterId) {
  const response = await fetch(`https://desfarik.github.io/star-wars/api/people/${characterId}.json`);
  const dataCharacter = await response.json();
  return dataCharacter;
}

async function renderCharacter() {
  const loader = document.querySelector('.loader');
  const character = await getDataCharacter(characterId);
  console.log(character)
  const container = document.querySelector('.character-wrapper');
  container.innerHTML = `
  <img src="${character.image}" alt="" class="character-photo">
  <div class="character-info">
    <h1 class="character-name">${character.name}</h1>
    <h2 class="character-title" data-lang-key="biographical">Biographical information</h2>
    <ul class="bio-info list">
      <li class="homeworld">
        <span data-lang-key="homeworld">Homeworld</span>
        <span class="item__dotted"></span>
        <span>${character.homeworld}</span>
      </li>
      <li class="born">
        <span data-lang-key="born">Born</span>
        <span class="item__dotted"></span>
        <span>${character.birth_year}</span>
      </li>
    </ul>
    <h2 class="character-title" data-lang-key="physical">Physical description</h2>
    <ul class="physic-info list">
      <li class="species">
        <span data-lang-key="species">Species</span>
        <span class="item__dotted"></span>
        <span>${character.species}</span>
      </li>
      <li class="gender">
        <span data-lang-key="gender">Gender</span>
        <span class="item__dotted"></span>
        <span>${character.gender}</span>
      </li>
      <li class="height">
        <span data-lang-key="height">Height</span>
        <span class="item__dotted"></span>
        <span>${character.height} centimeters</span>
      </li>
      <li class="mass">
        <span data-lang-key="mass">Mass</span>
        <span class="item__dotted"></span>
        <span>${character.mass} kilograms</span>
      </li>
      <li class="hair-color">
        <span data-lang-key="hair-color">Hair color</span>
        <span class="item__dotted"></span>
        <span>${character.hair_color}</span>
      </li>
      <li class="eye-color">
        <span data-lang-key="eye-color">Eye color</span>
        <span class="item__dotted"></span>
        <span>${character.eye_color}</span>
      </li>
      <li class="skin-color">
        <span data-lang-key="skin-color">Skin color</span>
        <span class="item__dotted"></span>
        <span>${character.skin_color}</span>
      </li>
      <li class="more-info">
        <a href="${character.wiki}" target="_blank"><span class="wiki" data-lang-key="more-information">More information</span><span><i class="fa-solid fa-link"></i></span></a>
      </li>  
    </ul>
  </div>  
  `;
  loader.classList.add('hide');
}

async function renderFilms() {
  const character = await getDataCharacter(characterId);
  const allFilms = await getDataFilms();
  let characterFilms = [];
  const container = document.querySelector('.films-wrapper');
  const titlecontainer = document.querySelector('.title-films');
  titlecontainer.innerHTML = ` 
    <span data-lang-key="film-participation">Films with the participation of</span>
    <span class="title-films-name">${character.name}</span> 
  `;
  allFilms.forEach((film) => {
    if(character.films.includes(String(film.id)))
    characterFilms.push(film);
  });

  characterFilms.map((film) => {
    let filmContainer = document.createElement('div');
    filmContainer.classList.add('film');
    filmContainer.innerHTML = `
    <a href="film.html?episode=${film.episode_id}">
      <img src="${FILMS_IMG[film.episode_id-1]}" alt="" class="film-img">
      <div>Episode ${film.episode_id}</div>
      <div>${film.title}</div>
    </a>
    `
    container.append(filmContainer);
  });
}

async function renderCharacterPage(){
  await renderCharacter();
  await renderFilms();
  changeLagnuage(currentLang);
}