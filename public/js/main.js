window.onerror = function (mesg, url, num) {return true;}
$(document).ready(function() {

  // Place JavaScript code here...
	
		var content="";
		for(var i=0;i<100;i++){
			content+="<div class='trr'>";
			for(var j=0;j<100;j++){
				content+="<div class='tdd' data-wish='Cell "+(i+1)+","+(j+1)+"' ></div>";
			}
			content+="</div>";
		}
		$("#dataTable").html(content);
		
		$(window).mousemove(function(event){
			var t=-1,l=-1,r=-1,b=-1;
			try
			{
			t=$('#dataTable').offset().top- $(window).scrollTop(),
			l=$('#dataTable').offset().left- $(window).scrollLeft();
			r=l+1000;
			b=t+1000;
			}
			catch(e)
			{
			return;
			}
			var curX=event.pageX,curY=event.pageY;
			if(t<=curY && l<=curX && b>=curY && r>=curX){
				var i,j;
				
				$(".wishTip").html("Buy This");
				$(".wishTip").css("top",curY+$(window).scrollTop());
				$(".wishTip").css("left",curX+$(window).scrollLeft());
				
				$(".wishTip").show();
			}
			else{
				$(".wishTip").hide();
			}
		});
});
