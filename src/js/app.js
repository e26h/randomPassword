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
		templateUrl: 'text.html'
	}).state('patten', {
		url: '/patten',
		templateUrl: 'patten.html'
	}).state('strong', {
		url: '/strong',
		templateUrl: 'strong.html'
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
	$scope.charlen = 8;
	$scope.result = 88888888;

	$http.get('../modules/dict.json', {
		cache: true
	}).success(function (data) {
		$scope.types = data;
	});

	$scope.getPassWord = function () {
		var rc = "";
		for (var i = 0; i < $scope.charlen; i++) {
			// 重置候选组,避免重复
			var charSet = "";
			// 保证各种字符的频度一致
			for (var j = 0, len2 = $scope.types.length; j < len2; j++) {
				if ($scope.types[j].checked === true) {
					charSet += $scope.rndChar($scope.types[j].dict);
				}
			}

			rc += $scope.rndChar(charSet);
		}
		$scope.result = rc;
	};
}).controller('pattenCtl', function ($scope) {}).controller('strongCtl', function ($scope) {}).filter('col2', function () {
	return function (data, str) {
		// if (index%2 === 1) {return null};
		console.log(data);
		console.log(str);
		// console.log(`data = ${data}`, `str = ${str}`);
	};
});