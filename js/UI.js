let InitializeUIComponenets = () => {

	$("#advanceSearchPanel").hide();
	$("#btnAdvSrch").click(function() {
		$("#advanceSearchPanel").toggle(300);
	});

	//Search is allowed either by title or IMDB ID
	$("#txtTitle").focus(function() {
		$("#txtImdbId").val('');
	});
	$("#txtImdbId").focus(function() {
		$("#txtTitle").val('');
	});

	$("#error-alert").hide();

	//Invoking Search action on Enter Key 
	$('#txtTitle').keypress(function (e) {
		var key = e.which;
		if(key == 13)
		{
			$("#btnSearch").click();
			return false;  
		}
	});

}

let ShowErrorPopup = (msg) => {

	$("#error-alert").removeClass("d-none");
	$("#errorMsg").text(msg);
	$("#error-alert").fadeTo(3000, 500).slideUp(1000, function(){
		$("#error-alert").slideUp(500);
	});

}

let ShowLoader = () => {
	$('#loader').addClass("d-block");
}

let HideLoader = () => {
	$('#loader').removeClass('d-block');
	$('#loader').addClass('d-none');
}

let HideSearchResult = () => {
	$('#Result-Container').hide();
	$('#MovieDetails').removeClass('d-none');
}

let ShowSearchResult = () => {
	$('#Result-Container').show();
	$('#MovieDetails').addClass('d-none');
}

let InitializeBackToResult = () => {
	$("#btnBackToSearch").click(function() {
		ShowSearchResult();
	});
}

let ScrollToMovieDetail = () => {

	let MovieView = $("#MovieDetails");
	MovieView.removeClass("d-none");
	MovieView.show();

	$('html, body').animate({
        scrollTop: MovieView.offset().top
    }, 1000);

}

let scrollToResult = () => {

	ShowSearchResult();
	let ResultView = $("#Result-Container");
	ResultView.removeClass("d-none");
	ResultView.show();

	$('html, body').animate({
        scrollTop: ResultView.offset().top
    }, 1000);

}