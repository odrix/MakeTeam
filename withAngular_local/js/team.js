var App = angular.module('makeTeamApp', ['ngDragDrop']);

App.controller('makeTeamCtrl', function($scope) {
	$scope.players = [{"nom": "Tom"},
		{"nom": "Harry"},
		{"nom": "Larry"},
		{"nom": "Luke"},
		{"nom": "Paul"},
		{"nom": "Jean"}
	]
	
	$scope.payground = []
});