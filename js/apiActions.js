let completeAction = () => {
	scrollToResult();
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
			//Multiple Movie Info
			showSearchResult(result);
		}

		console.log(result);

	}
	//Movie Not Found
	else {
		ShowErrorPopup("No movie found for this search criteria !!!");
	}
}

let errorAction = (error) => {
	ShowErrorPopup("Error : " + error);
}

let showSingleMovieInfo = (result) => {

}

let showSearchResult = (result) => {
	$("div.smallCard").remove();
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

}

let scrollToResult = () => {
	let ResultView = $("#Result-Container");
	ResultView.removeClass("d-none");
	$('html, body').animate({
        scrollTop: ResultView.offset().top
    }, 1000);
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