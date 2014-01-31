App.controller('TeamCtrl', function($scope, teamService, $timeout) {
		
	$scope.timeBoxes = teamService.timeboxes
	$scope.players = teamService.players

	$scope.newTimeBox = function (timebox){
		teamService.duplicTimeboxAndUpdate(angular.copy(timebox))
		teamService.updateNextOut()
	}
	
	$scope.deleteTimeBox = function(timebox) {
		teamService.removeTimeboxAndUpdate(timebox)
		teamService.updateNextOut()
	}
	
	$scope.updatePlayersDuration = function(event, ui) {
		teamService.updatePlayersDuration()
		teamService.updateNextOut()
	}

    $scope.checkAndAddDragClass = function(event, ui) {
        if(ui.helper.find('.playerComponent.ng-show').length == 0)
            ui.helper.addClass("dragging")
		teamService.updateNextOut()
    }

    $scope.removeDragClass = function(event, ui) {
        ui.helper.removeClass("dragging")
		teamService.updateNextOut()
    }
});