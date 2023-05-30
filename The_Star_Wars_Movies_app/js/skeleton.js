function renderSkeleton() {
    const skeletonContainer = document.querySelector('.films_wrapper');
    let html = `
        <a>
            <img class='film-cover skeleton'>
        </a>		  
        <div class="description">
            <div class = "short-description">
                <div class="wrapper">
                    <a>
                        <div class='episode-number loading'>
                            <div class="skeleton-text skeleton"></div>
                        </div>
                        <div class='episode-title loading'>
                            <div class="skeleton-text skeleton"></div>
                        </div>	
                    </a>
                    <div class='release-date loading'>
                        <div class="skeleton-text skeleton"></div>
                    </div>
                    <div class="film-producer loading">
                        <div class="skeleton-text skeleton"></div>
                    </div>
                </div>
                <button type="button" class="favorite skeleton"></button>
            </div>
            <div class="film-text loading">
                <div class="skeleton-text skeleton"></div>
                <div class="skeleton-text skeleton"></div>
                <div class="skeleton-text skeleton"></div>
                <div class="skeleton-text skeleton"></div>
            </div>
        </div>
    `;
    for(let i=0; i < 7; i++) {
        const filmTemplate = document.createElement('div');
        filmTemplate.classList.add('film');
        filmTemplate.innerHTML = html;
        skeletonContainer.append(filmTemplate);
    }
}