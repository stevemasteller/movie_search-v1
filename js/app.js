
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
	
	$('div.main-description').hide();
	$('div.main-content').show();
	 
	if (results.Response === "True") {
		 
		$.each(results.Search, function (i, movie) {
			
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
		moviesHTML += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + searchTitle + ".";
		moviesHTML += "</li>"; 
	}
	
	$('#movies').html(moviesHTML);	 
}

$(document).on('click', 'div.poster-wrap', function() {
	
	searchTitle = $(this).next('.movie-title').text();
	searchYear  = $(this).next('.movie-title').next('.movie-year').text();
	
	alert(searchTitle + searchYear);
	
	omdbOptions = {
		t: searchTitle,
		y: searchYear,
		plot: "full",
		r: "json"
	};

	$.getJSON(omdbAPI, omdbOptions, displayDescription);
});

var displayDescription = function (results) {
	
	$('div.main-content').hide();
	$('div.main-description').show();
}
