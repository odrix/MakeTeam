    function TeamCtrl($scope) {
		var _players = [{nom: "Tom"},
						{nom: "Harry"},
						{nom: "Larry"},
						{nom: "Luke"},
						{nom: "Paul"},
						{nom: "Jean"},
						{nom: 'Gille'},
						{nom: 'Claude'}
					];
		
			
		$scope.timeBoxes = [{substitutes:_players, players: []}];
		$scope.places = [1,2,3,4,5,6,7,8,9,10,11];

		
		// $scope.$watch('timeBoxes.substitutes', function(newValue) {
			// alert("newValue:" + angular.toJson(newValue))
		// }, true);
		 
		 
		$scope.placement = function(player, timeBox) {
			
			var indexPlayer = timeBox.substitutes.indexOf(player)
			if(indexPlayer>-1)
				timeBox.substitutes.splice(indexPlayer, 1)
				
			var indexPlayer = timeBox.players.indexOf(player)
			if(indexPlayer>-1)
				timeBox.players.splice(indexPlayer, 1)
			
			if(isAlreadyPlayer(player, timeBox))
				alert("y a déjà un joueur")
			
			timeBox.players.push(player)
		};
		
		function isAlreadyPlayer(player, timeBox) {
			var result = false
			var i=0
			for(i=0;i<timeBox.players.length;i++){
				if(timeBox.players[i].no == player.no)
					result = true
			}
			return result
		}
    }