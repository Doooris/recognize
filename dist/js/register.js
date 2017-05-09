/**
 * Created by Doris on 2017/4/26.
 */
'use strict';

$(function(){
	// 轮播实现
	var i = 0;
	var $ul = $(".slogonPicWrapper ul");
	$ul.append($(".slogonPicWrapper li:first").clone());
	var size = $(".slogonPicWrapper li").size();
	$ul.css("width",size*100+"%");
	$(".slogonPicWrapper li").css("width",100/size+"%");
	function moveR(){
		i++;
		if(i ==size){
			$ul.css("left",0);
			i=1;
		}
		$ul.stop().animate({left:-i*100+"%"},1000);
	}
	var  t= setInterval(function(){moveR();},3000);
	$(".slogonPicWrapper").hover(function(){
		clearInterval(t);
	},function(){
		t= setInterval(function(){moveR();},3000);
	})

	// //  暂存点合作协议浮层
	// $(".protocolBtn").on('click',function () {
	// 	$(".protocolDetailWrapper").fadeIn();
	// })
	// $(".backBtn").on('click',function () {
	// 	$(".protocolDetailWrapper").fadeOut();
	// })
});

