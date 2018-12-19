$(function () {
	var liNum=5*5*5;//暂且认为个数是125个
	var tX=500,tY=500,tZ=800;
	var firstX=-2*tX,firstY=-2*tY;
	var firstZ=-2*tZ;


	for(var i=0;i<liNum;i++){
		var $li=$('<li><img src="img/10.jpg"></li>');

		var iX=(i%25)%5;
		var iZ=parseInt(i/25);
		var iY=parseInt((i%25)/5);
		$li.css({'transform':'translate3d('+(firstX+iX*tX)+'px,'+(firstY+iY*tY)+'px,'+(firstZ+iZ*tZ)+'px)'});
		$("#main").append($li);

	}

})
$(function () {
	var nowX,lastX,minusX;
	var voY=0;
	$(document).mousedown(function (ev) {
		ev=ev||window.event;
		lastX=ev.clientX;
		$(this).on('mousemove',function (ev) {
			ev=ev||window.event;//ev 事件对象 存放事件的相关信息
			nowX=ev.clientX;// ev.clientX clientX属性存放着X坐标
			minusX=nowX-lastX;
			voY+=minusX;
			$('#main').css({'transform':'translateZ(-2000px)'+'rotateX(0deg)'+'rotateY('+voY+'deg)'})
			lastX=nowX;
        })
    }).mouseup(function () {
		$(this).off('mousemove');
    })
})