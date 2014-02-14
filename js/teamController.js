App.controller('TeamCtrl', function($scope, teamService, $timeout) {
		
	$scope.timeBoxes = teamService.getTimeboxes()
	$scope.players = teamService.getPlayers()
	$scope.newPlayer = ''
	$scope.newPlayerForm = 'views/new_player_form.html'

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
        if(ui.helper.find('.playerComponent.ng-show').length == 0)
            ui.helper.addClass("dragging")
		$scope.timeBoxes.updateNextOut()
    }

    $scope.removeDragClass = function(event, ui) {
        ui.helper.removeClass("dragging")
		$scope.timeBoxes.updateNextOut()
    }

    $scope.displayNewPlayerForm = function () {
        return teamService.displayNewPlayerForm()
    }

    $scope.addPlayer = function () {
        teamService.addPlayer($scope.newPlayer)
        $scope.newPlayer = ''
        teamService.toggleDisplayNewPlayerForm()
    }
});