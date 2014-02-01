window.onerror = function (mesg, url, num) {return true;}
$(document).ready(function() {

  // Place JavaScript code here...
	
		var content="";
		for(var i=0;i<10;i++){
			content+="<div class='trr'>";
			for(var j=0;j<10;j++){
				content+="<div class='tdd' data-wish='Cell "+(i+1)+","+(j+1)+"' ></div>";
			}
			content+="</div>";
		}
		$("#dataTable").html(content);
		var lastI=-1,lastJ=-1;
		$(window).mousemove(function(event){
			var t=-1,l=-1,r=-1,b=-1;
			var endIt=false;
			
			t=$('#dataTable').offset().top- $(window).scrollTop(),
			l=$('#dataTable').offset().left- $(window).scrollLeft();
			r=l+1000;
			b=t+1000;
			
			
			if(endIt==false){
				var curX=event.pageX,curY=event.pageY;
				if(t<=curY && l<=curX && b>curY && r>curX){
					var i,j;
					i=Math.floor((curY-t) /100);
					j=Math.floor((curX-l) /100);
					if(lastI==i && lastJ==j){
						endIt=true;
					}
					else lastI=i,lastJ=j;
					
					if(endIt==false){
						$(".wishTip").html("Buy This Cell("+(i+1)+","+(j+1)+")");
						$(".wishTip").css("top",curY-20);
						$(".wishTip").css("left",curX+2);
						
						$(".wishTip").show();
					}
				}
				else{
					$(".wishTip").hide();
				}
			}
		});
});
