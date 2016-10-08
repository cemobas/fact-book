angular.module('factBook', ['ui.router'])

.config([
	'$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('facts');
		$stateProvider
			.state('facts', {
				url: '/facts',
				templateUrl: '/facts.html',
				controller: 'MainCtrl'
			})
			.state('posts', {
 				url: '/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'PostsCtrl'
		});
	}])

.factory('facts', [function() {
	var o = {
		facts: [
			{id: 1, title: 'whypoland', imp: 3,
		  		comments: [
				    {author: 'kasia', body: 'Cool post!', tags: ['poland', 'expats', 'culture']},
				    {author: 'Bob', body: 'Great idea but I hate it!', upvotes: 0}
		  		]},
			{id: 2, title: 'turcja', imp: 2,
		  		comments: [
				    {author: 'Aga', body: 'Been there!', tags: ['stambul', 'turcja', 'culture']},
				    {author: 'Tolga', body: 'Biktim lan', tags: ['holiday', 'business']}
		  		]},
			{id: 3, title: 'programming', imp: 5,
		  		comments: [
				    {author: 'Basia', body: 'Nie umiem!', tags: ['tech', 'business', 'hobbies']},
				    {author: 'Witek', body: 'you never know what goes around', tags: ['hobbies', 'job']}
		  		]}
		]
	};
	return o;
}])

.controller('MainCtrl', [
	'$scope', '$filter', 'facts',
	function($scope, $filter, facts){
		$scope.facts = facts.facts;
		$scope.nextFactId = $filter('orderBy')($scope.facts, 'id', true)[0].id + 1;
		$scope.addFact = function(){
				if(!$scope.title || $scope.title === '') {
					return;
				}
				$scope.facts.push({id: $scope.nextFactId, title: $scope.title, imp: $scope.imp});
			};
		$scope.increment = function(fact) {
				fact.imp += 1;
			};
		$scope.decrement = function(fact) {
				fact.imp -= 1;
			};
		$scope.sort = "title";
		$scope.orderByTitle = function() {
				$scope.sort = "-title";
			};
		$scope.orderByImp = function() {
				$scope.sort = "-imp";
			};
	}
])

.controller('PostsCtrl', [
	'$scope', '$stateParams', '$filter', 'facts',
	function($scope, $stateParams, $filter, facts){
		$scope.fact = $filter('filter')(facts.facts,{id : $stateParams.id})[0];
		$scope.postComment = function(){
				var tags = [];
				if(!$scope.body || $scope.body === '') {
					return;
				}
				if(!$scope.tags || $scope.tags === '') {
					// do nothing
				} else {
					var tags = $scope.tags.split(',');
				}
				if($scope.fact.comments === "undefined") {
					$scope.fact.comments = [];
				}
				$scope.fact.comments.push({author: 'Myself', body: $scope.body, tags: tags});
			};
	}
]);