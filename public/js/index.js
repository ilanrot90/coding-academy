function init() {
    var moviesNames = getLocalMovies();

    createCards(moviesNames);
}
//add new movie
async function submitMovie(el) {
    let movieName = $('.form__input').val();  

    let movie = await getDetails(movieName); 

    if(!movie.title) {
        $('.form__input').val('');
        $(el).popover('show');
        return
    }

    createCardContent(movie);
    updateList(movie.title)

    $('.form__input').val('');
    $('#addMovieModal').modal('hide');
    $('.msg').addClass( "show" );
}
//delete card
function deleteMovie(t) {
    let movieCard = $(t).parent().parent();
    $(".confirm__btn.btn-primary").data('movie', movieCard);
    $(".confirm").removeClass("d-none");
}

function confirmDelete(btn) {
    $(".confirm").addClass("d-none");
    if(!$(btn).data("movie")) return;

    let movie = $(btn).data("movie");
    
    let movieTitle = movie.find( ".card-title" ).text();   
    let localNames = getLocalMovies().filter(movie => movie !== movieTitle);

    movie.remove();
    localStorage.setItem("movies", JSON.stringify(localNames));
    $('.album__row').find(`[data-id='${movie.data( "id" )}']`).remove()
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