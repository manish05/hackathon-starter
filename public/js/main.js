window.onerror = function (mesg, url, num) {return true;}
$(document).ready(function() {

  // Place JavaScript code here...
		
		var content="";
		for(var i=0;i<20;i++){
			content+="<div class='trr'>";
			for(var j=0;j<20;j++){
				content+="<div class='tdd tdd"+i+"+","+"+j+"' data-wish='Cell "+(i+1)+","+(j+1)+"' ></div>";
			}
			content+="</div>";
		}
		$("#dataTable").html(content);
		
		$.getJSON("/mannatData",function(data)){
			for(var i=0;i<200;i++)
			 for(var j=0;j<200;j++){
				if(data[i][j].s!='x'){
					$(".tdd"+i+"+","+"+j).css("background","url('/img/"+data[i][j].s+"')");
				}
			 }
		});
		
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
