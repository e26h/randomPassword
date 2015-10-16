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
}).controller('pattenCtl', function ($scope) {
	$scope.charlen = 9;

	var result = [0, 1, 2, 5, 4, 3, 6, 7, 8];

	$scope.arc = ['0', '0', '90deg', '90deg', '180deg', '180deg', '0', '0', '0'];

	$scope.noHasDirect = [false, false, false, false, false, false, false, false, false];

	$scope.isEnd = [false, false, false, false, false, false, false, false, false];
	// 0 1 2
	// 3 4 5
	// 6 7 8
	var dict = [
	//   0 1 2 3 4 5 6 7 8
	[0, 1, 0, 1, 1, 1, 0, 1, 0], [1, 0, 1, 1, 1, 1, 1, 0, 1], [0, 1, 0, 1, 1, 1, 0, 1, 0], [1, 1, 1, 0, 1, 0, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 0, 1, 1, 1], [0, 1, 0, 1, 1, 1, 0, 1, 0], [1, 0, 1, 1, 1, 1, 1, 0, 1], [0, 1, 0, 1, 1, 1, 0, 1, 0]];

	// direct error
	var direct = [[0.0, 0, 0, 90, 45, 26.6, 90, 63.4, 45], [0, 0.0, 0, -45, 90, 45, -63.4, 90, 63.4], [0, 0, 0.0, -26.6, -45, 90, -45, -63.4, 90], [90, -45, -26.6, 0.0, 0, 0, 90, 45, 26.6], [45, -90, -45, 0, 0.0, 0, -45, 90, 45], [26.6, 45, -90, 0, 0, 0.0, -26.6, -45, 90], [90, -63.4, -45, -90, -45, -26.6, 0.0, 0, 0], [63.4, -90, -63.4, 45, -90, -45, 0, 0.0, 0], [45, 63.4, -90, 26.6, 45, -90, 0, 0, 0.0]];

	function reOrderArr(arr) {
		var temp;
		for (var k = 0, len = arr.length; k < len; k++) {
			var rnd = parseInt(Math.random() * len);

			temp = arr[rnd];
			arr[rnd] = arr[len - 1];
			arr[len - 1] = temp;
		}
		return arr;
	}

	function passCheck(arr) {
		for (var i = 0, len = $scope.charlen - 1; i < len; i++) {
			// console.log("行", arr[i], "列", arr[i+1], "值", dict[arr[i]][arr[i+1]])
			if (dict[arr[i]][arr[i + 1]] === 0) {
				// console.log('----------------------');
				return false;
			}
		}
		return true;
	}

	function passWord2patten(arr) {
		var dir,
		    from,
		    to,
		    arc = new Array($scope.charlen),
		    noHasDirect = [true, true, true, true, true, true, true, true, true];

		for (var i = 0; i < arr.length; i++) {
			noHasDirect[arr[i]] = false;
		};

		$scope.noHasDirect = noHasDirect;

		for (var i = 0, len = arr.length - 1; i < len; i++) {
			from = arr[i];
			to = arr[i + 1];
			dir = direct[from][to];
			if (dir !== 0) {
				arc[from] = dir + 'deg';
			}
		}

		$scope.isEnd = [false, false, false, false, false, false, false, false, false];
		$scope.isEnd[arr[arr.length - 1]] = true;
		$scope.arc = arc;
	}

	function getPassWord() {
		var orgin = [0, 1, 2, 3, 4, 5, 6, 7, 8],
		    found = false,
		    newArr = [];

		var count = 0;

		while (!found) {
			newArr = reOrderArr(orgin);
			if (passCheck(newArr)) {
				found = true;
			}
			count += 1;
		}

		result = newArr.slice(0, $scope.charlen);

		console.log('搜索\t', count, '次, 结果为\t', result);

		passWord2patten(result);
	}

	$scope.getPassWord = getPassWord;
}).controller('strongCtl', function ($scope) {}).filter('col2', function () {
	return function (data, str) {
		// if (index%2 === 1) {return null};
		console.log(data);
		console.log(str);
		// console.log(`data = ${data}`, `str = ${str}`);
	};
}).filter('addDeg', function () {
	return function (input) {
		return input == 0 ? 0 : input + 'deg';
	};
});