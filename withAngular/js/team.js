var App = angular.module('mkTeamApp', ['ngDragDrop']);

App.controller('TeamCtrl', function($scope, $timeout) {
	var _players = [{id:1, nom: 'Tom'},
					{id:2, nom: 'Harry'},
					{id:3, nom: 'Larry'},
					{id:4, nom: 'Luke'},
					{id:5, nom: 'Roger'},
					{id:6, nom: 'Paul'},
					{id:7, nom: "Jean"},
					{id:8, nom: 'Gille'},
					{id:9, nom: 'Claude'}
				];
	
	
	
	// _players[0].__proto__.updateDuration = function() {
	 function updateDuration(p) {
		p.duration = 0
		if($scope.timeBoxes) {			
			for(var i=0;i<$scope.timeBoxes.length;i++) {
				if($scope.timeBoxes[i].places) {
					for(var j=0;j<$scope.timeBoxes[i].places.length;j++) {
						for(var k=0;k<$scope.timeBoxes[i].places[j].length;k++) {
							var tmpp = $scope.timeBoxes[i].places[j][k]
							if(tmpp && tmpp.player && tmpp.player.id == p.id) {
								p.duration += $scope.timeBoxes[i].duration
								break
							}
						}
					}
				}
			}
		}
	}
	
	var _places = [[{no:1}], [{no:2},{no:4},{no:5},{no:3}], [{no:6}], [{no:7},{no:8}], [{no:10}, {no:9},{no:11}]]
							
	var nbMaxPlayers = 11;	
	var maxTime = 90;
	$scope.placesNo = [1,2,3,4,5,6,7,8,9,10,11];
	
	$scope.timeBoxes = [{duration: maxTime,						
						substitutes: angular.copy(_players),
						places: _places
					}];
	$scope.players = _players;
		 

	function updateTimeBoxesDuration() {
		for(var i=0;i<$scope.timeBoxes.length;i++) {
			$scope.timeBoxes[i].duration = maxTime / $scope.timeBoxes.length
		}			
	}
	
	$scope.newTimeBox = function (timebox){
		$scope.timeBoxes.push(angular.copy(timebox))
		updateTimeBoxesDuration()
		$scope.updatePlayersDuration()
	}
	
	$scope.deleteTimeBox = function(timebox) {
		var indexTimebox = $scope.timeBoxes.indexOf(timebox)
		if(indexTimebox>-1) {
			$scope.timeBoxes.splice(indexTimebox, 1)
			updateTimeBoxesDuration()
			$scope.updatePlayersDuration()
		}
	}
	
	$scope.updatePlayersDuration = function(event, ui) {
		for(var i=0;i<$scope.players.length;i++) {
			updateDuration($scope.players[i])
		}	
	}
	
})