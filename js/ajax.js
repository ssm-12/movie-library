let setAjaxCall = () => {

	$("#btnSearch").click(function(event) {
		event.preventDefault();

		//Get User Input
		let userInput = fnGetUserInput();
		if (userInput == false) {
			ShowErrorPopup("Please enter movie name or IMDB Id");
		}		
		else {
			makeAjaxCall(userInput);
		}

	});

}

let makeAjaxCall = (userInput) => {

	let apiURL = getApiURL(userInput);
	let objAjax = {
		type: 'GET',
		dataType: 'json',
		url: apiURL,
		beforeSend: beforeSendAction,
		success: successAction,
		error: errorAction,
		complete: completeAction
	};
	let ajax = $.ajax(objAjax);

}

let getApiURL = (userInput) => {

	let apiUrlBase = "http://www.omdbapi.com/?apikey=";
	let apiKey = "1b0e2b37&";
	let apiURL = apiUrlBase + apiKey;

	if (userInput.searchBy == "title") {
		//a => Approximate Match
		if (userInput.searchType == "a") {
			apiURL += "s=" + userInput.searchText + "&";
		}
		//e => Exact Match
		else if (userInput.searchType == "e") {
			apiURL += "t=" + userInput.searchText + "&";	
		}
	}
	else {
		apiURL += "i=" + userInput.searchText + "&";
	}

	apiURL += "y=" + userInput.yearOfRelease + "&";
	apiURL += "type=" + userInput.category + "&";
	apiURL += "plot=" + userInput.plotLength + "&";
	
	return apiURL;

}

//Get user input into an object
let fnGetUserInput = () => {

	let objInput = {};
	let movieTitle = $("#txtTitle").val();
	let imdbId = $("#txtImdbId").val();
	let category = $('#selCategory').find(":selected").val();
	let plotLength = $('#selLength').find(":selected").val();
	let releaseYear = $("#txtYear").val();
	let searchType = $('#selSearchType').find(":selected").val();

	if (movieTitle != "") {
		objInput.searchBy = "title";
		objInput.searchText = movieTitle;
	}
	else if (imdbId != "") {
		objInput.searchBy = "id";
		objInput.searchText = imdbId;
	}
	else {
		return false;
	}

	objInput.category = category;
	objInput.plotLength = plotLength;
	objInput.yearOfRelease = releaseYear;
	objInput.searchType = searchType;
	
	return objInput;

}

//Function to validate user input
let fnValidateInput = () => {
	//Validation 1 - Either name or id is needed
	return false;
}

let fetchMovieDetails = () => {
	let movieID = getMovieID();
	alert(movieID);
}