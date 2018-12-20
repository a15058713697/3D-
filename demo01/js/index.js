//立体布局
$(function () {
	var liNum=5*5*5;//暂且认为个数是125个
	var tX=500,tY=500,tZ=800;
	var firstX=-2*tX,firstY=-2*tY;
	var firstZ=-2*tZ;
	for(var i=0;i<liNum;i++){
		var $li=$('<li><img src="img/10.jpg"></li>');
		var x=(Math.random()-0.5)*5000;//[随机产生0-1的数，含0不含1]*2000
		var y=(Math.random()-0.5)*5000;
		var z=(Math.random()-0.5)*5000;
		$li.css({transform:'translate3d('+x+'px,'+y+'px,'+z+'px)'})
		$("#main").append($li);
		// setTimeout(function () {
		// 	grid()},300);
	}

$('#styleBtn li').click(function () {
	var index=$(this).index();
	console.log(index);
	switch(parseInt(index)) {
		case 0:
			break;
		case 1:
			break;
		case 2:
			helix();
			break;//注意js中switch语句中没有break会自动执行下一个case
		case 3:
			grid();
			break;
	}
})
	//聚集
function helix() {
	$('#main li').each(function () {
		$(this).css({'transform':'translateZ(400px)',
						'transition':'3s ease-in-out'
		})
    })
}

//立体布局初始化
function grid(){
	$('#main li').each(function (i) {
		var iX=(i%25)%5;
		var iZ=parseInt(i/25);
		var iY=parseInt((i%25)/5);
		$(this).css({'transform':'translate3d('+(firstX+iX*tX)+'px,'+(firstY+iY*tY)+'px,'+(firstZ+iZ*tZ)+'px)',
					'transition':'3s ease-in-out'
		});
    })
}

});



//拖拽，滚轮功能
$(function () {
	var nowX,lastX,lastY,minusX,minusY,nowY;
	var voY=0,voX=0,tz=-3000;
	var timer,timer1;
	$(document).mousedown(function (ev) {
		ev=ev||window.event;
		clearInterval(timer);
		lastX=ev.clientX;
		lastY=ev.clientY;
		$(this).on('mousemove',function (ev) {
			ev=ev||window.event;//ev 事件对象 存放事件的相关信息
			nowX=ev.clientX;// ev.clientX clientX属性存放着X坐标
			nowY=ev.clientY;
			minusX=nowX-lastX;
			minusY=nowY-lastY;
			voY+=minusY*0.2;
			voX-=minusY*0.2;
			$('#main').css({'transform':'translateZ('+tz+'px)'+'rotateX(0deg)'+'rotateY('+voY+'deg)'})
			lastX=nowX;
        })
    }).mouseup(function () {
		$(this).off('mousemove');
		   timer=setInterval(function () {
			minusX*=0.95;
			minusY*=0.95;
			if(Math.abs(minusX)<0.5&&Math.abs(minusY)<0.5){
		clearInterval(timer);
	}
			voY+=minusY*0.2;
			voX-=minusY*0.2;
			$('#main').css({'transform':'translateZ('+tz+'px)'+'rotateX(0deg)'+'rotateY('+voY+'deg)'})
        },13)

    }).mousewheel(function (e,d) {//滚轮事件
		//var d=arguments[1]//arguments不定参 事件实参的集合，这里第二个参数是滚轮的快慢
		tz+=d*80;
		tz=Math.min(0,tz)//Math.min()取参数里面最小的
		tz=Math.max(-8000,tz)//
		$('#main').css({'transform':'translateZ('+tz+'px)'+'rotateX(0deg)'+'rotateY('+voY+'deg)'})
    })
})