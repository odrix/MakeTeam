App.controller('ShareCtrl', function($scope, teamService, $timeout) {

    var compo = teamService.timeboxes
    compo.updateNextOut()
	$scope.timeBoxes = compo
    
});