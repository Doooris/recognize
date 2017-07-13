/**
 * Created by Doris on 2017/5/13.
 */
'use strict';



function toTop() {
	var container = document.getElementById('container');
	Slip(container,"y").jump(1);
}
// 整屏滑动
$(function(){
	var container = document.getElementById('container');
	var pages = document.querySelectorAll('.page');
	var slip = Slip(container, 'y').webapp(pages);
  Slip(document.getElementById('container'), 'y').webapp();
	Slip(document.getElementById('container'), 'y').webapp().end(function() {
		if (this.page === 3) location.reload();
	});
	// 轮播渐隐渐出
	var size = $(".slideBox ul li").size();
	var i = 0;
	$(".slideBox ul li").eq(0).show().siblings().hide();
	function slide() {
		i++;
		if(i == size){i = 0;}
		$(".slideBox ul li").eq(i).fadeIn().siblings().fadeOut();
	}
	setInterval(slide,4000);

});




