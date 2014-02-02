window.onerror = function (mesg, url, num) {return true;}

		var mannatData=0;
		var rectSi,rectEi,rectSj,rectEj;
		function rectClick(i,j)
		{
			if(mannatData!=0){
				if(mannatData[i][j].s!='x')return;
				$(".tddi"+i+"j"+j).toggleClass("selected");
				for(var x=0;x<200;x++)
				  for(var y=0;y<200;y++)
				    if(x!=i && y!=j)
						$(".tddi"+x+"j"+y).removeClass("selected");
				if($(".tddi"+i+"j"+j).hasClass("selected"))
					$(".wishPad").show();
				else
					$(".wishPad").hide();
					
			}
		}
		
$(document).ready(function() {
  // Place JavaScript code here...	
		
		var content="";
		for(var i=0;i<20;i++){
			content+="<div class='trr'>";
			for(var j=0;j<20;j++){
				content+="<div class='tdd tddi"+i+"j"+j+"' data-wish='Cell "+(i+1)+","+(j+1)+"' ></div>";
				
				$(".tddi"+i+"j"+j).dblclick(function(){rectClick(i,j);});
				
				$(".tddi"+i+"j"+j).mouseenter(function(){
					$(".wishTip").html($(this).attr("data-wish"));
					$(".wishTip").css("top",$(this).offset().top+"px");
					$(".wishTip").css("left",$(this).offset().left+"px");
					$(".wishTip").show();
				});
				
				$(".tddi"+i+"j"+j).mouseout(function(){$(".wishTip").hide();});
				
			}
			content+="</div>";
		}
		$("#dataTable").html(content);
		
		
		for(var i=0;i<20;i++){
			for(var j=0;j<20;j++){
				$(".tddi"+i+"j"+j).dblclick(function(){rectClick(i,j);});
				$(".tddi"+i+"j"+j).mouseenter(function(){
					$(".wishTip").html($(this).attr("data-wish"));
					$(".wishTip").css("top",($(this).offset().top)+"px");
					$(".wishTip").css("left",($(this).offset().left+60)+"px");
					$(".wishTip").show();
				});
				$(".tddi"+i+"j"+j).mouseout(function(){$(".wishTip").hide();});
			}
		}
		
		$.get("/data.json",function(data){
			data.replace(/(['"])?([a-zA-Z0-9]+)(['"])?:/g, '"$2":'); //add quotes to keys
			data=JSON.parse(data);
			mannatData=data.data;
			for(var i=0;i<200;i++)
			 for(var j=0;j<200;j++){
				if(mannatData[i][j].s!='x'){
					$(".tddi"+i+"j"+j).css("background","url('/img/"+mannatData[i][j].s+".jpg')");
					$(".tddi"+i+"j"+j).attr("data-wish",mannatData[i][j].m);
				}
			 }
		});
		
});
