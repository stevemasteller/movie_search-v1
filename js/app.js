/***********************************************************
*
*  Movie Search
*
*  Searches for movies based on Title and Year. A poster, 
*  title, and year of all matching movies are displayed.
*  Clicking on a poster brings up another page with a 
*  description, a link to the omdb page, and the omdb rating
*  as well.
*
*  Author: Steve Masteller
*  Email: stevermasteller@gmail.com
*
************************************************************/

var omdbAPI = "http://www.omdbapi.com/?";	// address to ombd API

var searchTitle;		// title used for movie search
var searchYear;			// year used for movie search
var thisSearchTitle;	// title used to find description of movie
var thisSearchYear;		// year used to find description of movie

// Event handler for #index-link. Brings user back to the original movie search page
$(document).on('click', 'div #index-link', function() {
	
	callMovieSearch();
});

// Event handler for movie search
$('form').submit( function(event) {
	event.preventDefault();				// prevent the submit, use ajax instead
	
	searchTitle = $('#search').val();	
	searchYear = $('#year').val();
	
	callMovieSearch();
});

// setup and call the omdb API for a movie search by title and year 
var callMovieSearch = function () {
	
	omdbOptions = {
		s: searchTitle,		// title to search by
		type: "movie",		// search only for movies
		y: searchYear,		// year to search by
		r: "json"			// return data in json format
	};

	$.getJSON(omdbAPI, omdbOptions, displayMovies); // call omdb API
};
 
// Create HTML for display the results of a movie search
var displayMovies = function (results) {
	 
	var moviesHTML = '';
	
	$('div.main-description').hide();	// don't show a movie description
	$('div.main-content').show();		// show the movie search results
	 
	// check for a response
	if (results.Response === "True") {
		 
		// cycle throuch each movie in the json
		$.each(results.Search, function (i, movie) {
			
			// creat a li for each movie in the json
			moviesHTML += '<li>';
			moviesHTML += '<div class="poster-wrap">';
			
			// if there is no movie poster display a placeholder, else display movie poster
			if (movie.Poster === 'N/A') {
				moviesHTML += '<i class="material-icons poster-placeholder">crop_original</i>'
			} else {
				moviesHTML += '<img class="movie-poster" src="' + movie.Poster + '">';
			}
			
			moviesHTML += '</div>';
			moviesHTML += '<span class="movie-title">' + movie.Title + '</span>';	// movie title
			moviesHTML += '<span class="movie-year">' + movie.Year + '</span>';		// movie year
			moviesHTML += '</li>';
		});
		
	// no results, display no movies found message.
	} else {
		moviesHTML += "<li class='no-movies'>";
		moviesHTML += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + searchTitle + ".";
		moviesHTML += "</li>"; 
	}
	
	// attach moviesHTML to document in the correct place
	$('#movies').html(moviesHTML);	 
}

// Event handler for poster clicks. When a poster is clicked get a movie description and display it.
$(document).on('click', 'div.poster-wrap', function() {
	
	thisSearchTitle = $(this).next('.movie-title').text();
	thisSearchYear  = $(this).next('.movie-title').next('.movie-year').text();
	
	callMovieDescription();
});

// setup and call the ombd API to get a movie plot and ombd rating for a particular movie and year
var callMovieDescription = function () {
	
	omdbOptions = {
		t: thisSearchTitle,		// title movie poster clicked
		type: "movie",			// get only movie info
		y: thisSearchYear,		// year of movie poster clicked
		plot: "full",			// get full plot
		r: "json"				// get results in json format
	};

	$.getJSON(omdbAPI, omdbOptions, displayDescription);	// call omdb API.
};

// Display plot and other info of particular movie selected by clicking on poster in movie search screen
var displayDescription = function (results) {
	
	var movieHTML = '';
	
	$('div.main-content').hide();		// hide movie search results
	$('div.main-description').show();	// display movie description results
	
	// Grey Bar HTML
	movieHTML += '<div id="grey-bar">';
	movieHTML +=   '<div class="inner2">';
    movieHTML +=     '<div id="index-link">';
	movieHTML +=       '<span id="link"><  </span><span id="search-results">Search results</span>';
	movieHTML +=     '</div>';
    movieHTML +=     '<div class="inner3">';
	movieHTML +=       '<h1 class="movie-title">' + results.Title + ' (' + results.Year + ')</h1>';  // title and year
	movieHTML +=       '<span class="IMDB-rating">IMDB Rating: ' + results.imdbRating + '</span>';	 // imdb rating
	movieHTML +=     '</div>';
	movieHTML +=   '</div>';
	movieHTML += '</div>';

	// Bottom Bar HTML
	movieHTML += '<div id="bottom-bar">';
	movieHTML +=   '<div class="inner4">';
	movieHTML +=     '<div class="poster-wrapper">';
	
	// if there is no movie poster display a placeholder, else display movie poster
	if (results.Poster === 'N/A') {
		movieHTML +=   '<i class="material-icons poster-placeholder">crop_original</i>'
	} else {
		movieHTML +=   '<img class="movie-poster" src="' + results.Poster + '">';
	}
	
	movieHTML +=     '</div>';
	movieHTML +=     '<div class="inner3">';
	movieHTML +=       '<h1 class="movie-synopsis">Plot Synopsis:</h1>';
	movieHTML +=       '<p>' + results.Plot + '</p>'	// display the full plot
	// link to imdb page for a particular title
	movieHTML +=       '<a href="http://www.imdb.com/title/' + results.imdbID + '"><button id="IMDB-button">View on IMDB</button></a>';	
	movieHTML +=     '</div>';
	movieHTML +=   '</div>';
	movieHTML += '</div>';

	
	// attach movieHTML to document in the correct place
	$('div.main-description').html(movieHTML);
}
