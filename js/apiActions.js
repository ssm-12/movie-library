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

		console.log(result);

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
	let htmlBase = `<div id="#id" class="col-12 col-sm-12 col-md-12 col-lg-12 p-4 font-lob remMovieDetails">
				<div class="card text-white bg-info mb-3">
					
					<div class="card-header">
						<span class="float-left">
							<button id="btnBackToSearch" type="button" class="btn btn-outline-secondary btn-md bg-dark float-left text-white glow">
				  				<i class="far fa-hand-point-left"></i> Back to Search Result
				  			</button>
						</span>
					</div>

					<div class="card-header">
						<h2><i class="fas fa-video"></i> #MovieTitle</h2>
					</div>

					<div class="card-body">
						<div class="row">
							<div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
								<img class="img-fluid" src="images/dummyPoster.jpg" alt="Image Not Available">
								<h5 class="card-title">(#category)</h5>
								<h5><span><i class="far fa-thumbs-up"></i>&nbsp; #votes</span></h5>
							</div>
							<div id="movieBrief" class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
								<div class="row">
									<div class="col-12 text-left"> 
										<table class="table table-striped table-dark">
										  <tbody>
										    <tr>
										      <th scope="row"><i class="fas fa-film"></i> Director: </th>
										      <td>#director</td>
										    </tr>
										    <tr>
										      <th scope="row"><i class="fas fa-pen-fancy"></i> Writer: </th>
										      <td>#writer</td>
										    </tr>
										    <tr>
										      <th scope="row"><i class="fas fa-users"></i> Actors: </th>
										      <td>#actors</td>
										    </tr>
										    <tr>
										      <th scope="row"><i class="far fa-star"></i> IMDB Rating: </th>
										      <td>#imdbrating</td>
										    </tr>
										  </tbody>
										</table>
									</div>
									<div class="col-12">

										<!--Start - Detail tabs -->
										  <ul id="detailTabs" class="nav nav-tabs bg-secondary">
										    <li class="nav-item">
										      <a class="nav-link active" data-toggle="tab" href="#home">General Info</a>
										    </li>
										    <li class="nav-item">
										      <a class="nav-link" data-toggle="tab" href="#menu2">Storyline</a>
										    </li>
										    <li class="nav-item">
										      <a class="nav-link" data-toggle="tab" href="#menu3">Rating</a>
										    </li>
										  </ul>

										  <!-- Tab panes -->
										  <div class="tab-content">
										    <div id="home" class="container tab-pane active justify-content-center"><br>
										      <div class="row">
										      	<div class="col-12">
										      		<h3>General Info</h3>
										      	</div>
										      	<div class="col-12 col-sm-12 col-md-12 col-lg-12">
										      		<table class="table table-striped text-left">
													  <tbody>
													    <tr>
													      <th scope="row"><i class="fas fa-calendar-alt"></i> Released On: </th>
													      <td>#release</td>
													    </tr>
													    <tr>
													      <th scope="row"><i class="fas fa-atlas"></i> Genre: </th>
													      <td>#genre</td>
													    </tr>
													    <tr>
													      <th scope="row"><i class="fas fa-globe-americas"></i> Language: </th>
													      <td>#language</td>
													    </tr>
													    <tr>
													      <th scope="row"><i class="fas fa-link"></i> Website: </th>
													      <td>#website</td>
													    </tr>
													    <tr>
													      <th scope="row"><i class="fas fa-stopwatch"></i> Runtime: </th>
													      <td>#runtime</td>
													    </tr>
													    <tr>
													      <th scope="row"><i class="fas fa-trophy"></i> Awards: </th>
													      <td>#awards</td>
													    </tr>
													  </tbody>
													</table>
										      	</div>
										      </div>
										    </div>
										    <div id="menu2" class="container tab-pane fade"><br>
										      <h3>Plot</h3>
										      <p>#plot</p>
										    </div>
										    <div id="menu3" class="container tab-pane fade justify-content-center"><br>
										    	<div class="row pb-4">
										    		<div class="col-12">
										    			<h3>Ratings & Sources</h3>
										    		</div>
										    		<div class="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8 offset-md-1 offset-lg-2 offset-xl-2">
										    			<div class="row">
										    				<div class="col border border-bottom-0 border-top-0 border-left-0 border-dark">
										    					<div class="row">
										    						<div class="col-12 mb-2">
										    							(#rating1)
										    						</div>
										    						<div class="col-12">
										    							Internet Movie Database
										    						</div>
										    					</div>
										    				</div>
										    				<div class="col border border-bottom-0 border-top-0 border-left-0 border-dark">
										    					<div class="row">
										    						<div class="col-12 mb-2">
										    							(#rating2)
										    						</div>
										    						<div class="col-12">
										    							Rotten Tomatoes
										    						</div>
										    					</div>
										    				</div>
										    				<div class="col">
										    					<div class="row">
										    						<div class="col-12 mb-2">
										    							(#rating3)
										    						</div>
										    						<div class="col-12">
										    							Metacritic
										    						</div>
										    					</div>
										    				</div>
										    			</div>
										    		</div>
										    	</div>
										    </div>
										  </div>


									</div>
								</div>
								
							</div>
							</div>
						</div>
					</div>
				</div>`;
	return htmlBase;
}