var app = angular.module('learningPlatform', ['ngAnimate', 'ngRoute', 'ui.router', 'ui.bootstrap', 'monospaced.elastic']);
app.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', function ($urlRouterProvider, $locationProvider, $stateProvider) {
	$locationProvider.html5Mode(true);
	$stateProvider.
	state('index', {
		url: '/',
		templateUrl: '/template/index.html',
		controller: 'index'
	}).
	state('course', {
		url: '/course',
		template: '<div ui-view></div>'
	}).
	state('course.search', {
		url: '/search/:ownerId/:name',
		templateUrl: '/template/course/search.html',
		controller: 'course.search'
	}).
	state('course.show', {
		url: '/show/:cid',
		templateUrl: '/template/course/show.html',
		controller: 'course.show'
	}).
	state('point', {
		url: '/point',
		template: '<div ui-view></div>'
	}).
	state('point.show', {
		url: '/show/:pid',
		templateUrl: '/template/point/show.html',
		controller: 'point.show'
	}).
	state('admin', {
		url: '/admin',
		template: '<div ui-view></div>',
		onEnter: ['$rootScope', '$http', '$state', function ($rootScope, $http, $state) {
			$rootScope.$broadcast('sessionData:willRefresh');
			$http.post('/api/site/sessionData').success(function (response) {
				if(response.code === '0000') {
					if(!response.response.signin || response.response.user.roleId != 1) {
						$state.go('error.404');
					}
				}
			});
		}]
	}).
	state('admin.user', {
		url: '/user',
		templateUrl: '/template/admin/user.html',
		controller: 'admin.user'
	}).
	state('user', {
		url: '/user',
		template: '<div ui-view></div>'
	}).
	state('user.show', {
		url: '/show/:uid',
		templateUrl: '/template/user/show.html',
		controller: 'user.show'
	}).
	state('signin', {
		url: '/signin',
		templateUrl: '/template/user/signin.html',
		controller: 'signin'
	}).
	state('signup', {
		url: '/signup',
		templateUrl: '/template/user/signup.html',
		controller: 'signup'
	}).
	state('error', {
		url: '/error',
		templateUrl: '/template/error/frame.html'
	}).
	state('error.404', {
		url: '/404',
		templateUrl: '/template/error/404.html'
	});
	$urlRouterProvider.otherwise('/error/404');
}]);
