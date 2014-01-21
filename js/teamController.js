App.controller('TeamCtrl', function($scope, teamService, $timeout) {
		
	$scope.timeBoxes = teamService.getTeam().timeboxes
	$scope.players = teamService.getTeam().players

	$scope.newTimeBox = function (timebox){
		teamService.getTeam().duplicTimeboxAndUpdate(angular.copy(timebox))
		$scope.timeBoxes.updateNextOut()
	}
	
	$scope.deleteTimeBox = function(timebox) {
		teamService.getTeam().removeTimeboxAndUpdate(timebox)
		$scope.timeBoxes.updateNextOut()
	}
	
	$scope.updatePlayersDuration = function(event, ui) {
		teamService.getTeam().updatePlayersDuration()
		$scope.timeBoxes.updateNextOut()
	}

    $scope.checkAndAddDragClass = function(event, ui) {
        if(ui.helper.find('.playerComponent.ng-show').length == 0)
            ui.helper.addClass("dragging")
		$scope.timeBoxes.updateNextOut()
    }

    $scope.removeDragClass = function(event, ui) {
        ui.helper.removeClass("dragging")
		$scope.timeBoxes.updateNextOut()
    }
});