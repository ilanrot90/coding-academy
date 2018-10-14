//get movies array
async function getMovies(movieNames, callback) {
    let movies = []
    for (let index = 0; index < movieNames.length; index++) {
        let movie = await callback(movieNames[index]);
        movies.push(movie);
    }

    return movies;
}
//get single movie details
function getDetails(movieName) {
    return $.getJSON(`https://www.omdbapi.com/?t=${movieName}&apikey=thewdb`);
}