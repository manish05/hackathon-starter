$(document).ready(function() {

  // Place JavaScript code here...
	if($("#dataTable").length){
		
		var content="";
		for(var i=0;i<100;i++){
			content+="<tr>";
			for(var j=0;j<100;j++){
				content+="<td>"+i+","+j+"</td>";
			}
			content+="</tr>";
		}
		$("#dataTable").(content);
	}
});
