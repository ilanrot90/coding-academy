//get single movie details
function getDetails(movieName) {
    let host = 'https://cors-anywhere.herokuapp.com/';
//    return $.getJSON(`${host}https://www.omdbapi.com/?t=${movieName}&apikey=thewdb`); //without this its not going to work on githab

    return $.getJSON(`https://www.omdbapi.com/?t=${movieName}&apikey=thewdb`)
            .then(res => {
                let data = {
                    title: res.Title,
                    poster: res.Poster,
                    id: res.imdbID,
                    year: res.Year,
                    rating: res.imdbRating,
                    runtime: res.Runtime,
                    plot: res.Plot,
                    link: res.Website,
                    genre: res.Genre
                }

                return data;
            })
            .fail(function() {
                alert( "error" );
            });
}

function createCards(moviesNames) {
    moviesNames.map(async function (movie) {
        let card = await getDetails(movie);

        createCardContent(card); 
    })
}

/* using async function on array

async function init() {
    var moviesNames = getLocalMovies();

    let movies = await getMovies(moviesNames, async (movieName) => {
        return await getDetails(movieName)
    })

    let cards = createCards(movies);
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
*/