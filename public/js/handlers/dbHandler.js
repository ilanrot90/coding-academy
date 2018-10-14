//get movies names from localstorage
function getLocalMovies() {
    return (localStorage.getItem("movies")) ?
        JSON.parse(localStorage.getItem("movies")) : initData();
}

//update  localstorage
function updateList(movie) {
    let movies = (getLocalMovies().length !== 0) ? [...JSON.parse(localStorage.getItem("movies")), movie] : [movie];

    localStorage.setItem("movies", JSON.stringify(movies));
}

//init data to local storage
function initData(){
    let movies = ['Harry Potter and the Deathly Hallows: Part 2', 
        'Blade Runner 2049', 'The Shape of Water', 
        'All the Money in the World', 'The Greatest Showman', 'Thor: Ragnarok',
        'Spider-Man: Homecoming', 'Star Wars', 'Cold Skin', 'Get Out'
    ];

    localStorage.setItem("movies", JSON.stringify(movies));

    return movies;
}

//update  localstorage
function updateList(movie) {
    let movies = (getLocalMovies().length !== 0) ? [...JSON.parse(localStorage.getItem("movies")), movie] : [movie];

    localStorage.setItem("movies", JSON.stringify(movies));
}