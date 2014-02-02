window.onerror = function (mesg, url, num) {return true;}
$(document).ready(function() {

  // Place JavaScript code here...
	
		var content="";
		for(var i=0;i<20;i++){
			content+="<div class='trr'>";
			for(var j=0;j<20;j++){
				content+="<div class='tdd' data-wish='Cell "+(i+1)+","+(j+1)+"' ></div>";
			}
			content+="</div>";
		}
		$("#dataTable").html(content);
		
		$(".tdd").qtip({
			overwrite: false,
			content: $(this).data("wish"),
			position: {
				my: 'right center',
				at: 'left center',
				target: $(this, this),
				viewport: $('#dataTable')
			},
			show: {
				event: event.type,
				ready: true
			},
			hide: {
				fixed: true
			}
		}, event);
	
});
