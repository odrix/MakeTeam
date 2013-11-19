App.controller('TeamCtrl', function($scope, teamService, $timeout) {
		
	$scope.timeBoxes = teamService.getTimeboxes()
	$scope.players = teamService.getPlayers()

	$scope.newTimeBox = function (timebox){
		teamService.duplicTimeboxAndUpdate(angular.copy(timebox))
	}
	
	$scope.deleteTimeBox = function(timebox) {
		teamService.removeTimeboxAndUpdate(timebox)
	}
	
	$scope.updatePlayersDuration = function(event, ui) {
		teamService.updatePlayersDuration()
	}

    $scope.checkAndAddDragClass = function(event, ui) {
        if(ui.helper.find('.playerName.ng-hide').length == 0)
            ui.helper.addClass("dragging")
    }

    $scope.removeDragClass = function(event, ui) {
        ui.helper.removeClass("dragging")
    }
});