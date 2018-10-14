//create element
function createCards(movies) {
    let cardsObj = [];
    movies.forEach(movie => {
        let data = {
            title: movie.Title,
            poster: movie.Poster,
            id: movie.imdbID,
            year: movie.Year,
            rating: movie.imdbRating,
            runtime: movie.Runtime,
            plot: movie.Plot,
            link: movie.Website,
            genre: movie.Genre
        }
        cardsObj.push(data)
    });

    return cardsObj;
}

//render elements to dom
function randerCards(movies) {
    movies.forEach(movieItem => {
        createCardContent(movieItem);
    })
}

function createCardContent(card) {
    let newMovie =  $(`<div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="card bg-dark text-white">
                            <img class="card-img" src="${card.poster}" alt="Card image">
                            <div class="card-img-overlay">
                                <button type="button" class="close card__delete card-text"  onclick="deleteMovie(this.parentElement)"
                                    aria-label="Close" data-toggle="tooltip" data-placement="top" title="Click to delete movie">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 class="card-title">${card.title}</h5>
                                <p class="card-text">${card.plot}</p>
                                <p class="card-text"><span class="card-rating">${'&#9733;'}</span> ${card.rating}</p>
                                <p class="card-text card-time">${card.year}</p>
                                <p class="card-text card-genre">${card.genre}</p>
                                <p class="card-text">${card.runtime}</p>
                                <a class="card-text card-link" href="${(card.link !== 'N/A') ? card.link : '#'}">Go see!&rarr;</a>
                            </div>
                        </div>
                    </div>`)
    newMovie.data('id', card.id);
    
    $('.album__row').append(newMovie);
}
//delete card
function deleteMovie(t) {
    let movieTitle = $(t ).find( ".card-title" ).text();
    let movieId = $(t).parent().parent().data( "id" );
    let localNames = getLocalMovies().filter(movie => movie !== movieTitle);

    $(t).parent().parent().remove();
    localStorage.setItem("movies", JSON.stringify(localNames));
    $('.album__row').find(`[data-id='${movieId}']`).remove()
}
