window.onerror = function (mesg, url, num) {return true;}

		var mannatData=0;
		var rectSi,rectEi,rectSj,rectEj;
		function rectClick(i,j)
		{
			if(mannatData!=0){
			
				if(mannatData[i][j].s!='x')return;
				
				$(".tddi"+i+"j"+j).toggleClass("selected");
			}
		}
		
$(document).ready(function() {
  // Place JavaScript code here...	
		
		var content="";
		for(var i=0;i<20;i++){
			content+="<div class='trr'>";
			for(var j=0;j<20;j++){
				content+="<div class='tdd tddi"+i+"j"+j+"' data-wish='Cell "+(i+1)+","+(j+1)+"' ></div>";
				
				$(".tddi"+i+"j"+j).dblclick(rectClick(i,j));
			}
			content+="</div>";
		}
		$("#dataTable").html(content);
		
		$.getJSON("/data.json",function(data){
			mannatData=data.data;
			for(var i=0;i<200;i++)
			 for(var j=0;j<200;j++){
				if(mannatData[i][j].s!='x'){
					$(".tddi"+i+"j"+j).css("background","url('/img/"+mannatData[i][j].s+".jpg')");
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
