var App = angular.module('mkTeamApp', ['ngDragDrop']);

App.service('teamService', function (){
   var _players = [];
    return{
		addPlayer:function (name){
			if(name && name != '')
			{
				var p = { id: _players.length + 1, name: name}
				_players.push(p)
			}
		},
		getPlayers:function (){
		  return _players;
		}
	};
});

App.config(['$routeProvider', function($rp) {
    $rp.
      when('/debut', {
        templateUrl: 'views/player_list.html',
        controller: 'StartCtrl'
      }).
      when('/composer', {
        templateUrl: 'views/composition.html',
        controller: 'TeamCtrl'
      }).
      otherwise({
        redirectTo: '/debut'
      });
}]);


App.controller('StartCtrl', function($scope, teamService, $location,$timeout) {
	$scope.playerList = "Damien,Vincent    ;Jack Yoan,  Guillaume;Mathieu,David;Goubi";
	
	$scope.validationPlayers = function() {
		var reg=new RegExp("[ ,;]+", "g");
		var players = $scope.playerList.split(reg)
		for(var i=0;i<players.length;i++) {
			teamService.addPlayer(players[i].trim())
		}
	
		$location.path("/composer", false)
		// $scope.$apply()
	}
});


App.controller('TeamCtrl', function($scope, teamService, $timeout) {
	
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
						substitutes: angular.copy(teamService.getPlayers()),
						places: _places
					}];
	$scope.players = teamService.getPlayers();
	
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