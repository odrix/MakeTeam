App.controller('ShareCtrl', function($scope, teamService, $timeout) {

    var compo = teamService.getTimeboxes()
    compo.updateNextOut()
	$scope.timeBoxes = compo
    
});