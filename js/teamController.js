App.controller('TeamCtrl', function($scope, teamService, $timeout) {
		
	$scope.timeBoxes = teamService.getTimeboxes()
	$scope.players = teamService.getPlayers()

	$scope.newTimeBox = function (timebox){
		teamService.duplicTimeboxAndUpdate(angular.copy(timebox))
		$scope.timeBoxes.updateNextOut()
	}
	
	$scope.deleteTimeBox = function(timebox) {
		teamService.removeTimeboxAndUpdate(timebox)
		$scope.timeBoxes.updateNextOut()
	}
	
	$scope.updatePlayersDuration = function(event, ui) {
		teamService.updatePlayersDuration()
		$scope.timeBoxes.updateNextOut()
	}

    $scope.checkAndAddDragClass = function(event, ui) {
        if(ui.helper.find('.playerName.ng-hide').length == 0)
            ui.helper.addClass("dragging")
		$scope.timeBoxes.updateNextOut()
    }

    $scope.removeDragClass = function(event, ui) {
        ui.helper.removeClass("dragging")
		$scope.timeBoxes.updateNextOut()
    }
});