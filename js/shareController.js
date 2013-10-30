App.controller('ShareCtrl', function($scope, teamService, $timeout) {
	
	$scope.timeBoxes = teamService.getTimeboxes()
});