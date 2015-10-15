'use strict';

angular.module('main', ['ionic'])

.run( $ionicPlatform => {
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
	$scope.qsa = (select,con) => (document || con).querySelectorAll(select)
	$scope.rndChar = s => s[Math.floor(Math.random()*s.length)] || ''
})

.controller('textCtl', ($scope, $http) => {
	$scope.charlen = 8
	$scope.result = 88888888

	$http.get('../modules/dict.json', {
		cache : true
	}).success((data) => {
		$scope.types = data
	})

	$scope.getPassWord = () => {
		var rc = "";
		for (var i = 0; i < $scope.charlen; i++){
			// 重置候选组,避免重复
			var charSet = "";
			// 保证各种字符的频度一致
			for (var j = 0,len2 = $scope.types.length; j < len2; j++) {
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
	// 1 2 3
	// 4 5 6
	// 7 8 9
	const dict = [
	//   1 2 3 4 5 6 7 8 9
		[0,1,0,1,1,1,0,1,0],
		[1,0,1,1,1,1,1,0,1],
		[0,1,0,1,1,1,0,1,0],
		[1,1,1,0,1,0,1,1,1],
		[1,1,1,1,0,1,1,1,1],
		[1,1,1,0,1,0,1,1,1],
		[0,1,0,1,1,1,0,1,0],
		[1,0,1,1,1,1,1,0,1],
		[0,1,0,1,1,1,0,1,0]
	]

	$scope.charlen = 9

	$scope.result = [1,2,3,4,5,6,7,8,9]

	function reOrderArr(arr){
		for(var k = 0, len = arr.length; k < len; k++){
			var rnd = parseInt(Math.random()*(len - 1));
			[arr[len - 1], arr[rnd]] = [arr[rnd], arr[len - 1]]
		}
		return arr
	}

	function passCheck(arr){
		var len = arr.length,
			pass = true

		for (var i = 0; i < len - 1; i++) {
			if (dict[arr[i]][arr[i+1]] === 0){
				pass = false
			}
		}
		return pass
	}

	function getPassWord(){
		var orgin = [1,2,3,4,5,6,7,8,9],
			found = false,
			newArr = []

		var count = 0

		while(!found){
			newArr = reOrderArr(orgin)
			if (passCheck(newArr)) {
				found = true
			}
			count += 1
		}

		$scope.result = newArr.slice(0, $scope.charlen)

		console.log('搜索: ',count,'次')
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