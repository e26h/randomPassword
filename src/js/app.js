'use strict';

angular.module('main', ['ionic']).run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleLightContent();
		}
	});
}).config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('text', {
		url: '/text',
		templateUrl: 'text.html',
		controller: 'textCtl'
	}).state('patten', {
		url: '/patten',
		templateUrl: 'patten.html',
		controller: 'pattenCtl'
	}).state('strong', {
		url: '/strong',
		templateUrl: 'strong.html',
		controller: 'strongCtl'
	});

	$urlRouterProvider.otherwise('/text');
}).controller('base', function ($scope) {
	$scope.qs = function (select) {
		return document.querySelector(select);
	};
	$scope.qsa = function (select, con) {
		return (document || con).querySelectorAll(select);
	};
	$scope.rndChar = function (s) {
		return s[Math.floor(Math.random() * s.length)] || '';
	};
}).controller('textCtl', function ($scope, $http) {

	var Len = $scope.qs('#len');

	$http.get('../modules/dict.json', {
		cache: true
	}).success(function (data) {
		$scope.dict = data;
	});

	$scope.passWordLength = 8;

	$scope.$watch($scope.passWordLength, $scope.getPassWord);

	$scope.types = [{
		name: "数字",
		checked: true
	}, {
		name: "特殊符号",
		checked: true
	}, {
		name: "小写字母",
		checked: true
	}, {
		name: "大写字母",
		checked: true
	}, {
		name: "简体汉字",
		checked: false
	}, {
		name: "繁体汉字",
		checked: false
	}, {
		name: "日文字符",
		checked: false
	}, {
		name: "韩文字符",
		checked: false
	}, {
		name: "希腊字母",
		checked: false
	}];

	$scope.getPassWord = function () {
		var rc = "";
		for (var i = 0; i < $scope.passWordLength; i++) {
			// 重置候选组,避免重复
			var charSet = "";
			// 保证各种字符的频度一致
			for (var j = 0, len2 = $scope.types.length; j < len2; j++) {
				if ($scope.types[j].checked === true) {
					charSet += $scope.rndChar($scope.dict[j]);
				};
			};

			rc += $scope.rndChar(charSet);
		}
		$scope.result = rc;
		console.log($scope.result);
		console.log($scope.charLen);
	};
}).controller('pattenCtl', function ($scope) {}).controller('strongCtl', function ($scope) {});

// .filter('col2', () => {
// 	index => {
// 		if (index%2 === 1) {return null};
// 	}
// })