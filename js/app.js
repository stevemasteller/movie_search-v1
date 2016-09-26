
var omdbAPI = "http://www.omdbapi.com/?";
var searchTitle;
var searchYear;

$('form').submit( function(event) {
	event.preventDefault();
	
	searchTitle = $('#search').val();
	searchYear = $('#year').val();
	
	omdbOptions = {
		s: searchTitle,
		y: searchYear,
		r: "json"
	};

	$.getJSON(omdbAPI, omdbOptions, displayMovies);
});
 

var displayMovies = function (results) {
	 
	var moviesHTML = '';
	 
	if (results.Response === "True") {
		 
		$.each(results.Search, function (i, movie) {
			
			moviesHTML += '<li><a href="http://www.imdb.com/title/' + movie.imdbID + '">';
			moviesHTML += '<div class="poster-wrap">';
			
			
			if (movie.Poster === 'N/A') {
				moviesHTML += '<i class="material-icons poster-placeholder">crop_original</i>'
			} else {
				moviesHTML += '<img class="movie-poster" src="' + movie.Poster + '">';
			}
			
			moviesHTML += '</div>';
			moviesHTML += '<span class="movie-title">' + movie.Title + '</span>';
			moviesHTML += '<span class="movie-year">' + movie.Year + '</span>';
			moviesHTML += '</a></li>';
		});
		
	} else {
		
		moviesHTML += "<li class='no-movies'>";
		moviesHTML += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + searchTitle + ".";
		moviesHTML += "</li>"; 
	}
	
	$('#movies').html(moviesHTML);	 
}