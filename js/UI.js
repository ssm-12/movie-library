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
	// $("#loader").hide();

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