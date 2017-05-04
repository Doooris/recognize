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

	// 提交信息
	$(".submitBtn").on('click',function () {
		if($(this).text() === '提交成功'){return false}
		var name = $("#name").val().trim();
		var tel = $("#tel").val().trim();
		var regName = /^[\u4e00-\u9fa5]{2,5}$/;
		if(!name){
			layer.open({
				type: 0,
				content: '请输入姓名！',
				btn: '确定'
			})
			return false;
		}
		if(!regName.test(name)){
			$("#name").val(" ");
			layer.open({
				type: 0,
				content: '请请输入真实姓名！',
				btn: '确定'
			})
			return false;
		}
		if(!tel){
			layer.open({
				type: 0,
				content: '请请输入电话号码！',
				btn: '确定'
			})
			return false;
		}
		if(!(/^1[34578]\d{9}$/.test(tel))){
			$("#tel").val(" ");
			layer.open({
				type: 0,
				content: '请输入正确的手机号码！',
				btn: '确定'
			})
			return false;
		}
		$.post("", {'name':name, 'tel':tel }, function (status) {
			//  数据库中没有该用户则提交成功;如果用户已经注册则返回登录连接
			if (status === 0 ){
				$(".overLayer").fadeIn();
			} else if (status === 1) {
				$(".registered").fadeIn();
			} else {
				layer.open({
					type: 0,
					content: '提交失败，请重试！',
					btn: '确定'
				})
				name.val("");
				tel.val("");
				address.val("");
			}
		})
	})
	function resetCss() {
		$(".submitBtn").css({"background":"#FF8C00","color":"#fff"}).text("提交信息");
	}
	$(".overLayer .close").on('click',function () {
		$(".overLayer").fadeOut();
		$(".submitBtn").css({"background":"transparent","border":"2px solid #FF8C00","color":"#FF8C00"}).text("提交成功");
	})

	//  暂存点合作协议浮层
	$(".protocolBtn").on('click',function () {
		$(".protocolDetailWrapper").fadeIn();
	})
	$(".backBtn").on('click',function () {
		$(".protocolDetailWrapper").fadeOut();
	})
});

