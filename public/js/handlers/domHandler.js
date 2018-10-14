//create card
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
//render cards
function randerCards(movies) {
    movies.forEach(movieItem => {
        createCardContent(movieItem);
    })
}