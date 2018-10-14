async function init() {
    var moviesNames = getLocalMovies();

    var movies = await getMovies(moviesNames, async (movieName) => {
        return await getDetails(movieName)
    })

    var cards = createCards(movies);
    console.log(cards);
    randerCards(cards);

}

async function getMovies(movieNames, callback) {
    let movies = []
    for (let index = 0; index < movieNames.length; index++) {
        let movie = await callback(movieNames[index]);
        movies.push(movie);
    }

    return movies;
}

function getDetails(movieName) {
    return $.getJSON(`http://www.omdbapi.com/?t=${movieName}&apikey=thewdb`);
}

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

//get movies names from localstorage
function getLocalMovies() {
    return (localStorage.getItem("movies")) ?
        JSON.parse(localStorage.getItem("movies")) : initData();
}

function initData(){
    let movies = ['Harry Potter and the Deathly Hallows: Part 2', 
        'Blade Runner 2049', 'The Shape of Water', 
        'All the Money in the World', 'The Greatest Showman', 'Thor: Ragnarok',
        'Spider-Man: Homecoming', 'Star Wars', 'Cold Skin', 'Get Out'
    ];

    localStorage.setItem("movies", JSON.stringify(movies));

    return movies;
}

async function submitMovie(el) {
    let movieName = $('.form__input').val();  

    let movie = await getDetails(movieName); 

    if(movie.Error) {
        $('.form__input').val('');
        $(el).popover('show');
        return
    }

    let movieInfo = createCards([movie]);
    createCardContent(...movieInfo); 
    console.log(movieInfo);
    updateList(movieInfo[0].title)

    $('.form__input').val('');
    $('.btn-close-model').click();
}

//update  localstorage
function updateList(movie) {
    let movies = (getLocalMovies().length !== 0) ? [...JSON.parse(localStorage.getItem("movies")), movie] : [movie];

    localStorage.setItem("movies", JSON.stringify(movies));
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

//scroll up
//Check to see if the window is top if not then display button
$(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $('.scrollToTop').fadeIn();
    } else {
        $('.scrollToTop').fadeOut();
    }
});

//Click event to scroll to top
$('.scrollToTop').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
});

//clear input when modal close
$('#addMovieModal').on('hide.bs.modal', () => $('.form__input').val(''));

//when open modal set focus on input
$('#addMovieModal').on('show.bs.modal', () => $('#name').focus());