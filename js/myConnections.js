var myConnections = {

	init: function() {
	
		alert('init');
		
	},
	
	loadConnections: function() {

		$.mobile.showPageLoadingMsg()
		
		IN.API.Connections("me")
		.result(function(result) {
		  profHTML = "";
		  for (var index in result.values) {
		      profile = result.values[index]
		
		      if (!profile.pictureUrl) {
		          profile.pictureUrl = "css/images/no-photo.png"; 
		      }  
		      
		      profHTML += "<li><a href=\"#\" class=\"profileLink\" data-user-id=\"" + profile.id + "\">";
		      profHTML += "<img class=\"prof_img\" align=\"left\" src=\"" + profile.pictureUrl + "\">";
		      profHTML += "<h3>" + profile.firstName + " " + profile.lastName + "</h3>";
		      profHTML += "<p>" + profile.headline + "</p></a></li>";
					
		        
		  }
		  
		  //DEBUG:
		  //console.log(profHTML);
		  
			//Refresh the listview:  
		  $("#connections").append(profHTML);
			$("#connections").listview("refresh");
			$("#list").css("visibility", "visible");
			
			myConnections.refreshListViews();
			
			$.mobile.hidePageLoadingMsg();
			
		});

	},
	
	getProfileData: function() {
	
		IN.API.Profile(sessionStorage["user_id"])
			.result(function(result) { 
				//$("#divProfile").html(JSON.stringify(result)) 
				$("#divProfile").html('<script type="IN/FullMemberProfile" data-id="' +  result.values[0].id + '"><script>');
				IN.parse(document.getElementById("divProfile"));
			})
	},
	
	refreshListViews: function() {

		$('.profileLink').live("tap", function(e) {
			   
			   sessionStorage.setItem("user_id", $(this).jqmData("user-id"));
			   $.mobile.changePage( "#detail", { transition: "slide"} );
			   myConnections.getProfileData();
	
		});
		
	}	

	

}	


//Function to return a blank if a value is null.
function valueOrDefault(val, def) {
    if (def == undefined) def = "N/A";
    return val == undefined ? def : val;
}