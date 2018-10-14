async function init() {
    var moviesNames = getLocalMovies();

    let movies = await getMovies(moviesNames, async (movieName) => {
        return await getDetails(movieName)
    })

    let cards = createCards(movies);
    console.log(cards);
    randerCards(cards);
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
    $('#addMovieModal').modal('hide');
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