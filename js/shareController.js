App.controller('ShareCtrl', function($scope, teamService, $timeout) {

    var compo = teamService.getTeam().timeboxes
    compo.updateNextOut()
	$scope.timeBoxes = compo
    
});