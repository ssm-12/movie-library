let completeAction = () => {
	HideLoader();    
}

let beforeSendAction = () => {
	ShowLoader()
}

let successAction = (result) => {
	if (result.Response == "True") {

		if (result.Search == undefined) {
			//Single Movie Info
			showSingleMovieInfo(result);
		}
		else {
			//Search Result
			showSearchResult(result);
			var numOfShownResult = $(".smallCard").length;
			if(parseInt(numOfShownResult) <= 10) {
				scrollToResult();
			}
		}

	}
	//Movie Not Found
	else {
		ShowErrorPopup("No movie found for this search criteria !!!");
	}
}

let fetchSingleMovieInfo = (result) => {

	if (result.Response == "True") {
		//Display Infomation about the movie
	}
	else {
		ShowErrorPopup("No movie found for this IMBD ID !!!");
	}
	
}

let errorAction = (error) => {
	ShowErrorPopup("Error : " + error);
}

let showSingleMovieInfo = (result) => {
	HideSearchResult();

	//Filling up details about the movie
	let content = getMovieDetailsHtmlBase();
	content = content.replace("#MovieTitle",result.Title);
	content = content.replace("#category",result.Type);
	content = content.replace("#director",result.Director);
	content = content.replace("#writer",result.Writer);
	content = content.replace("#actors",result.Actors);
	content = content.replace("#imdbrating",result.imdbRating);
	content = content.replace("#release",result.Released);
	content = content.replace("#genre",result.Genre);
	content = content.replace("#language",result.Language);
	content = content.replace("#website",result.Website);
	content = content.replace("#runtime",result.Runtime);
	content = content.replace("#awards",result.Awards);
	content = content.replace("#plot",result.Plot);
	content = content.replace("#votes",result.imdbVotes);
	if(result.Poster != 'N/A') {
		content = content.replace("images/dummyPoster.jpg",result.Poster);
	}

	$.each(result.Ratings, function(key, objRating) {
		if(objRating.Source == "Internet Movie Database") {
			content = content.replace("#rating1",objRating.Value);
		}
		else if(objRating.Source == "Rotten Tomatoes") {
			content = content.replace("#rating2",objRating.Value);
		}
		else if(objRating.Source == "Metacritic") {
			content = content.replace("#rating3",objRating.Value);
		}
	});

	content = content.replace("#rating1", 'N/A').replace("#rating2", 'N/A').replace("#rating3", 'N/A');

	$("div.remMovieDetails").remove();
	$("#movieDetailsContent").append(content);

	InitializeBackToResult();
	ScrollToMovieDetail();
}

let showSearchResult = (result) => {

	let htmlBase = getSmallCardHtmlBase();
	
	$.each(result.Search, function(key, movieObject) {
		
		htmlBase = htmlBase.replace("#movieTitle", movieObject.Title);
		htmlBase = htmlBase.replace("#year", movieObject.Year);
		htmlBase = htmlBase.replace("#category", movieObject.Type);
		htmlBase = htmlBase.replace("#id", movieObject.imdbID);
		
		if (movieObject.Poster != "N/A") {
			htmlBase = htmlBase.replace("#posterSource",movieObject.Poster);
		} else {
			htmlBase = htmlBase.replace("#posterSource","images/dummyPoster.jpg");
		}

		$("#divSearchResults").append(htmlBase);
		htmlBase = getSmallCardHtmlBase();

	});

	//Controlling load more button's visibility
	var numOfShownResult = $(".smallCard").length;
	if (parseInt(numOfShownResult) == parseInt(result.totalResults)) {
		$("#btnLoadMore").hide();
	}
	else {
		$("#btnLoadMore").show();	
	}

}

let getSmallCardHtmlBase = () => {
	let htmlBase = `<div id="#id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-4 smallCard">
						<div class="card">
						  <img class="card-img-top img-fluid" src="#posterSource" alt="Image Not Available">
						  <div class="card-body">
						    <h4 class="card-title">#movieTitle</h4>
						    <h6 class="card-text text-muted">#category</h6>
						    <ul class="list-group list-group-flush">
							    <li class="list-group-item"><b>Year: #year</b></li>
							</ul>
						  </div>
						</div>
					</div>`;
	return htmlBase;
}

let getMovieDetailsHtmlBase = () => {
	let htmlBase = "";
	$.ajax({url: "template.html", success: function(result){
         htmlBase = result;
    }, async: false });
	return htmlBase;
}