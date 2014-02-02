window.onerror = function (mesg, url, num) {return true;}

		var mannatData=0;
		var last=-1;
		
$(document).ready(function() {
  // Place JavaScript code here...	
		
		var content="";
		for(var i=0;i<20;i++){
			content+="<div class='trr'>";
			for(var j=0;j<20;j++){
				content+="<div class='tdd tddi"+i+"j"+j+"' data-wish='Make a wish here' ></div>";
			}
			content+="</div>";
		}
		$("#dataTable").html(content);
		
			
			for(var i=0;i<20;i++){
				for(var j=0;j<20;j++){
					$(".tddi"+i+"j"+j).dblclick(function(){
						
						if(mannatData!=0){
							if($(this).attr("data-wish")!="Make a wish here")return;
							$(this).toggleClass("selected");
							if(last!=-1)
								$(last).removeClass("selected");
							
							if($(this).hasClass("selected")){
								$(".wishPad").show();
								last=this;
							}else{
								$(".wishPad").hide();
								last=-1;
							}
								
						}
				});
					
				$(".tddi"+i+"j"+j).mouseenter(function(){
					$(".wishTip").html($(this).attr("data-wish"));
					$(".wishTip").css("top",($(this).position().top)+"px");
					$(".wishTip").css("left",($(this).position().left+60)+"px");
					$(".wishTip").show();
				});
				$(".tddi"+i+"j"+j).mouseout(function(){$(".wishTip").hide();});
			}
		}
		
		$.getJSON("/data.json",function(data){
			mannatData=data.data;
			for(var i=0;i<200;i++)
			 for(var j=0;j<200;j++){
				if(mannatData[i][j].s!=0){
					$(".tddi"+i+"j"+j).css("background","url('/img/"+mannatData[i][j].s+".jpg')");
					$(".tddi"+i+"j"+j).attr("data-wish",mannatData[i][j].m);
				}
			 }
		});
		
		$(".wishSubmitReal").click(function(){
			$(".purchaseBox").show();
		});
		$(".wishSubmitFake").click(function(){
			$(".notLoginBox").show();
		});
		
});
