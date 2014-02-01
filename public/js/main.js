$(document).ready(function() {

  // Place JavaScript code here...
	
		var content="";
		for(var i=0;i<100;i++){
			content+="<div class='trr'>";
			for(var j=0;j<100;j++){
				content+="<div class='tdd' data-wish='Cell "+(i+1)+","+(j+1)+"'></div>";
			}
			content+="</div>";
		}
		$("#dataTable").html(content);
	
});
