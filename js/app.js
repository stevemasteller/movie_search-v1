
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
	
	thisSearchTitle = $(this).next('.movie-title').text();
	thisSearchYear  = $(this).next('.movie-title').next('.movie-year').text();
	
	alert(thisSearchTitle + thisSearchYear);
	
	omdbOptions = {
		t: thisSearchTitle,
		y: thisSearchYear,
		plot: "full",
		r: "json"
	};

	$.getJSON(omdbAPI, omdbOptions, displayDescription);
});

var displayDescription = function (results) {
	
	var movieHTML = '';
	
	$('div.main-content').hide();
	$('div.main-description').show();
	
	// Grey Bar HTML
	movieHTML += '<div id="grey-bar">';
	movieHTML +=   '<div class="inner2">';
    movieHTML +=     '<div id="index-link">';
	movieHTML +=       '<a href="index.html"><  </a><span>Search results</span>';
	movieHTML +=     '</div>';
    movieHTML +=     '<div class="inner3">';
	movieHTML +=       '<h1 class="movie-title">' + results.Title + ' (' + results.Year + ')</h1>';
	movieHTML +=       '<span class="IMDB-rating">IMDB Rating: ' + results.imdbRating + '</span>';
	movieHTML +=     '</div>';
	movieHTML +=   '</div>';
	movieHTML += '</div>';

	// Bottom Bar HTML
	movieHTML += '<div id="bottom-bar">';
	movieHTML +=   '<div class="inner4">';
	movieHTML +=     '<div class="poster-wrapper">';
	
	if (results.Poster === 'N/A') {
		movieHTML +=   '<i class="material-icons poster-placeholder">crop_original</i>'
	} else {
		movieHTML +=   '<img class="movie-poster" src="' + results.Poster + '">';
	}
	
	movieHTML +=     '</div>';
	movieHTML +=     '<div class="inner3">';
	movieHTML +=       '<h1 class="movie-synopsis">Plot Synopsis:</h1>';
	movieHTML +=       '<p>' + results.Plot + '</p>'
	movieHTML +=       '<a href="http://www.imdb.com/title/' + results.imdbID + '"><button id="IMDB-button">View on IMDB</button></a>';
	movieHTML +=     '</div>';
	movieHTML +=   '</div>';
	movieHTML += '</div>';

	
	$('div.main-description').html(movieHTML);
}
