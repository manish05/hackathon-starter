window.onerror = function (mesg, url, num) {return true;}
$(document).ready(function() {

  // Place JavaScript code here...
	
		var content="";
		for(var i=0;i<100;i++){
			content+="<div class='trr'>";
			for(var j=0;j<100;j++){
				content+="<div class='tdd' onhover='showTip("+i+","+j+")'></div>";
			}
			content+="</div>";
		}
		$("#dataTable").html(content);
		
		$(window).mousemove(function(event){
			var t=$('#dataTable').offset().top- $(window).scrollTop(),
				l=$('#dataTable').offset().left- $(window).scrollLeft();
			var curX=event.pageX,curY=event.pageY;
			
		});
});

function showTip(i,j,msg)
{
	if(!msg)msg="Cell "+(i+1)+","+(j+1)+";
	var w=$(".wishTip");
	w.html(msg);
	w.show();
	
}