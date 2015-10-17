'use strict';

angular.module('main', ['ionic'])

.run($ionicPlatform => {
	$ionicPlatform.ready(() => {
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
			templateUrl: 'text.html'
		})
		.state('patten', {
			url: '/patten',
			templateUrl: 'patten.html'
		})
		.state('strong', {
			url: '/strong',
			templateUrl: 'strong.html'
		})

	$urlRouterProvider.otherwise('/text');
})

.controller('base', ($scope) => {
	$scope.qs = (select) => document.querySelector(select)
	$scope.qsa = (select, con) => (document || con).querySelectorAll(select)
	$scope.rndChar = s => s[Math.floor(Math.random() * s.length)] || ''
})

.controller('textCtl', ($scope, $http) => {
	$scope.charlen = 8
	$scope.result = 88888888

	$http.get('../modules/dict.json', {
		cache: true
	}).success((data) => {
		$scope.types = data
	})

	$scope.getPassWord = () => {
		var rc = "";
		for (var i = 0; i < $scope.charlen; i++) {
			// 重置候选组,避免重复
			var charSet = "";
			// 保证各种字符的频度一致
			for (var j = 0, len2 = $scope.types.length; j < len2; j++) {
				if (($scope.types[j]).checked === true) {
					charSet += $scope.rndChar(($scope.types[j]).dict)
				}
			}

			rc += $scope.rndChar(charSet);
		}
		$scope.result = rc
	}

})

.controller('pattenCtl', ($scope) => {
	$scope.charlen = 9

	var result = [0, 1, 2, 5, 4, 3, 6, 7, 8]

	$scope.arc = ['0', '0', '90deg', '90deg', '180deg', '180deg', '0', '0', '0']

	$scope.noHasDirect = [false, false, false, false, false, false, false, false, false]

	$scope.isEnd = [false, false, false, false, false, false, false, false, true]
		// 0 1 2
		// 3 4 5
		// 6 7 8
	const dict = [
		//   0 1 2 3 4 5 6 7 8
		[0, 1, 0, 1, 1, 1, 0, 1, 0],
		[1, 0, 1, 1, 1, 1, 1, 0, 1],
		[0, 1, 0, 1, 1, 1, 0, 1, 0],
		[1, 1, 1, 0, 1, 0, 1, 1, 1],
		[1, 1, 1, 1, 0, 1, 1, 1, 1],
		[1, 1, 1, 0, 1, 0, 1, 1, 1],
		[0, 1, 0, 1, 1, 1, 0, 1, 0],
		[1, 0, 1, 1, 1, 1, 1, 0, 1],
		[0, 1, 0, 1, 1, 1, 0, 1, 0]
	]

	// direct error
	const direct = [
		[ null, 0, 0, 90, 45, 26.6, 90, 63.4, 45 ],
		[ 180, null, 0, 135, 90, 45, 116.6, 90, 63.4 ],
		[ 180, 180, null, 153.4, 135, 90, 135, 116.6, 90 ],
		[ -90,-45, -26.6, null, 0, 0, 90, 45, 26.6 ],
		[ -135, -90, -45, 180, null, 0, 135, 90, 45 ],
		[ -153.4, -135, -90, 180, 180, null, 153.4, 135, 90 ],
		[ -90,-63.4,-45,-90,-45,-26.6,null,0,0 ],
		[ -116.6, -90, -63.4, -135, -90, -45, 180, null, 0 ],
		[ -135, -116.6, -90, -153.4, -135, -90, 180, 180, null ]
	]

	function reOrderArr(arr) {
		var temp
		for (var k = 0, len = arr.length; k < len; k++) {
			var rnd = parseInt(Math.random() * len);

			temp = arr[rnd]
			arr[rnd] = arr[len - 1]
			arr[len - 1] = temp
		}
		return arr
	}

	function passCheck(arr) {
		for (var i = 0, len = $scope.charlen - 1; i < len; i++) {
			// console.log("行", arr[i], "列", arr[i+1], "值", dict[arr[i]][arr[i+1]])
			if (dict[arr[i]][arr[i + 1]] === 0) {
				// console.log('----------------------');
				return false
			}
		}
		return true
	}

	function passWord2patten(arr) {
		var dir, from, to,
			arc = new Array($scope.charlen),
			noHasDirect = [true, true, true, true, true, true, true, true, true]

		for (var i = 0; i < arr.length; i++) {
			noHasDirect[arr[i]] = false
		};

		$scope.noHasDirect = noHasDirect

		for (var i = 0, len = arr.length - 1; i < len; i++) {
			from = arr[i]
			to = arr[i + 1]
			dir = direct[from][to]
			if (dir !== 0) {
				arc[from] = dir + 'deg'
			}
		}

		$scope.isEnd = [false, false, false, false, false, false, false, false, false]
		$scope.isEnd[arr[arr.length - 1]] = true
		$scope.arc = arc
	}

	function getPassWord() {
		var orgin = [0, 1, 2, 3, 4, 5, 6, 7, 8],
			found = false,
			newArr = []

		var count = 0

		while (!found) {
			newArr = reOrderArr(orgin)
			if (passCheck(newArr)) {
				found = true
			}
			count += 1
		}

		result = newArr.slice(0, $scope.charlen)

		console.log('搜索\t', count, '次, 结果为\t', result)

		passWord2patten(result)
	}

	$scope.getPassWord = getPassWord
})

.controller('strongCtl', ($scope) => {

})

.filter('col2', () => {
	return (data, str) => {
		// if (index%2 === 1) {return null};
		console.log(data);
		console.log(str);
		// console.log(`data = ${data}`, `str = ${str}`);
	}
})

.filter('addDeg', () => (input) => input == 0 ? 0 : input + 'deg')