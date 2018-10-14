//get movies
function getMovies(moviesNames) {
    let movies = await getMovies(moviesNames, async (movieName) => {
        return await getDetails(movieName)
    })

    return movies;
}

//push promisses to array
async function getMovies(movieNames, callback) {
    let movies = []
    for (let index = 0; index < movieNames.length; index++) {
        let movie = await callback(movieNames[index]);
        movies.push(movie);
    }

    return movies;
}

//return movie details
function getDetails(movieName) {
    return $.getJSON(`http://www.omdbapi.com/?t=${movieName}&apikey=thewdb`);
}

//add new movie
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