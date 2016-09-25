
var omdbAPI = "http://www.omdbapi.com/?";
var searchVal;

$('form').submit( function(event) {
	event.preventDefault();
	
	searchVal = $('#search').val();
	alert(searchVal);
	
	omdbOptions = {
		s: searchVal,
		r: "json"
	};

	$.getJSON(omdbAPI, omdbOptions, displayMovies);
});
 

var displayMovies = function (results) {
	 
	var moviesHTML = '';
	 
	if (results.Response) {
		 
		$.each(results.Search, function (i, movie) {
			
			if (movie.Poster === 'N/A') {
				
			} else {
				moviePoster = movie.Poster;
			}
			
			moviesHTML += '<li>';
			moviesHTML += '<div class="poster-wrap">';
			
			
			if (movie.Poster === 'N/A') {
				moviesHTML += '<i class="material-icons poster-placeholder">crop_original</i>'
			} else {
				moviesHTML += '<img class="movie-poster" src="' + movie.Poster + '">';
			}
			
			moviesHTML += '</div>';
			moviesHTML += '<span class="movie-title">' + movie.Title + '</span>';
			moviesHTML += '<span class="movie-year">' + movie.Year + '</span>';
			moviesHTML += '</li>';
		});
		
	} else {
		
		moviesHTML += "<li class='no-movies'>";
		moviesHTML += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: .";
		moviesHTML += "</li>"; 
	}
	
	$('#movies').html(moviesHTML);	 
}