angular.module('main', ['ionic'])

.run( $ionicPlatform => {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleLightContent();
		}
	})
})

.config(($stateProvider, $urlRouterProvider) => {
	$stateProvider

	.state('text', {
		url: '/text',
		templateUrl: 'text.html',
		controller: 'textCtl'
	})

	.state('patten', {
		url: '/patten',
		templateUrl: 'patten.html',
		controller: 'pattenCtl'
	})

	.state('strong', {
		url: '/strong',
		templateUrl: 'strong.html',
		controller: 'strongCtl'
	})

	$urlRouterProvider.otherwise('/text');
})

.controller('base', function(){
	// function $ (select){return document.querySelector(select)}
	// function $$(select,con){return (document || con).querySelectorAll(select)}
})

.controller('textCtl', function($scope, $http){
/*
	function rndChar (s) {return s[Math.floor(Math.random()*s.length)] || ''}

	var len = $("#charlength"),
		type = $$("#type input"),
		// msg = $("#msg"),
		lab = $("#charlength+label");
	for (var i = 0; i < type.length; i++){
		type[i].onchange = getPrassWord;
	}
	$("#get").onclick = getPrassWord;
	function valueChange () {
		lab.textContent = this.value;
		getPrassWord();
	}

	len.addEventListener("input",valueChange)

	function getPrassWord(){
		var rc = "";
		for (var i = 0, len1 = +len.value; i < len1; i++){
			// 重置候选组,避免重复
			var charSet = "";
			// 保证各种字符的频度一致
			for (var j = 0,len2 = type.length; j < len2; j++) {
				if (type[j].checked) {
					charSet += rndChar(dict[j]);};};

			rc += rndChar(charSet);
		}
		$("#result").value = rc;
	}
	document.body.onload = function(){
		$("#get").onclick()
		if (document.execCommand) {
			// use clipboard.min.js
			
		} else if (window.clipboardData){
			// work for ie8
			$("#copy").onclick = function () {
				window.clipboardData.clearData();
				window.clipboardData.setData("Text", $("#result").value);
				msg.textContent = "已经复制到粘贴板";
				msg.style.display = 'inline';
				setTimeout("msg.style.display = 'none';", 1000);
			}
		} else {
			// Safari or Chrome 42-
			$("#copy").onclick = function () {
				$("#result").select();
				msg.textContent = "请Ctrl+C复制密码到剪贴板";
				msg.style.display = 'inline';
				setTimeout("msg.style.display = 'none';", 1000);
			}
		}
	}
*/
})

.controller('pattenCtl', function($scope){
	
})

.controller('strongCtl', function($scope){
	
})
