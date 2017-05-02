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
		var address = $("#address").val().trim();
		var regName = /^[\u4e00-\u9fa5]{2,5}$/;
		if(!name){
			alert('请输入姓名！','title');
			return false;
		}
		if(!regName.test(name)){
			alert('请输入真实姓名！');
			return false;
		}
		if(!tel){
			alert('请输入电话号码');
			return false;
		}
		if(!address){
			alert('请输入店面地址！');
			return false;
		}
		if(!(/^1[34578]\d{9}$/.test(tel))){
			alert('请输入正确的手机号码！');
			return false;
		}
		$.post("", {'name':name, 'tel':tel, 'address':address}, function (data) {
			var jsonData = JSON.stringify(data);
			if (jsonData.status === 0 ){

			}

		})
		$.ajax({
			url: '',
			type: 'post',
			data: postData,
			success: function () {
				$(".overLayer").fadeIn();
			},
			error: function () {
				alert('添加失败！');
			}
		})
	})
	$(".overLayer .close").on('click',function () {
		$(".overLayer").fadeOut();
		$(".submitBtn").css({"background":"transparent","border":"2px solid #FF8C00","color":"#FF8C00"}).text("提交成功");
	})
	$(".protocolBtn").on('click',function () {
		$(".protocolDetailWrapper").fadeIn();
	})
	$(".backBtn").on('click',function () {
		$(".protocolDetailWrapper").fadeOut();
	})
});

