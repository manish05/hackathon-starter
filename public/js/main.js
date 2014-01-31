$(document).ready(function() {

  // Place JavaScript code here...
	
		var content="";
		for(var i=0;i<100;i++){
			content+="<tr>";
			for(var j=0;j<100;j++){
				content+="<td data-wish='Cell("+(i+1)+","+(j+1)+")'></td>";
			}
			content+="</tr>";
		}
		$("#dataTable").html(content);
	
});
