App.controller('TeamCtrl', function($scope, teamService, $timeout) {
		
	$scope.timeBoxes = teamService.getTimeboxes()
	$scope.players = teamService.getPlayers()

	$scope.newTimeBox = function (timebox){
		teamService.duplicTimebox(angular.copy(timebox))
		$scope.updatePlayersDuration()
	}
	
	$scope.deleteTimeBox = function(timebox) {
		if(teamService.removeTimebox(timebox))
			$scope.updatePlayersDuration()
	}
	
	$scope.updatePlayersDuration = function(event, ui) {
		for(var i=0;i<$scope.players.length;i++) {
			teamService.getPlayerDuration($scope.players[i])
		}	
	}
});