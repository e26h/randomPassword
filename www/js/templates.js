"use strict";angular.module("templates").run(["$templateCache",function(e){e.put("patten.html",'<ion-view title="图案密码" class="bg-dark">\r\n\r\n</ion-view>'),e.put("strong.html",'<ion-view title="密码强度检测" class="bg-dark">\r\n\r\n</ion-view>'),e.put("text.html",'<ion-view title="文本密码" class="bg-dark">\r\n	<h3>一、选择密码的长度6~32</h3>\r\n\r\n	<div class="range range-dark">\r\n		<input type="range" value="8" min="6" max="32"\r\n		 ng-model="passWordLength"\r\n		 ng-change="">\r\n		<label>{{passWordLength}}</label>\r\n	</div>\r\n\r\n	<h3>二、选择随机密码的类型</h3>\r\n\r\n	<ul class="item list">\r\n		<ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">数字</ion-toggle>\r\n		<ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">小写字母</ion-toggle>\r\n		<ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">大写字母</ion-toggle>\r\n		<ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">特殊符号</ion-toggle>\r\n		<ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">希腊字母</ion-toggle>\r\n		<ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">简体汉字</ion-toggle>\r\n		<ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">繁体汉字</ion-toggle>\r\n		<ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">日文字符</ion-toggle>\r\n		<ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">韩文字符</ion-toggle>\r\n	</ul>\r\n\r\n	<h3>三、生成密码</h3>\r\n\r\n	<div class="item">\r\n		<input type="text" ng-model="result" id="result" size="36">\r\n		<button id="get" ng-click="create()">生成密码</button>\r\n		<button id="copy" ng-click="copy()">复制密码</button>\r\n	</div>\r\n</ion-view>')}]);
//# sourceMappingURL=templates.js.map
