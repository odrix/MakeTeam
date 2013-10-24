    function TeamCtrl($scope) {
		var _players = [{nom: 'Tom'},
						{nom: 'Harry'},
						{nom: 'Larry'},
						{nom: 'Luke'},
						{nom: 'Roger'},
						{nom: 'Paul'},
						{nom: "Jean"},
						{nom: 'Gille'},
						{nom: 'Claude'}
					];
		
		// _players[0].__proto__.goto = function(placeNo) {
										
									// }	
		
		$scope.timeBoxes = [{substitutes:_players,
							playground: {
								nbMaxPlayers: 11,
								places: new Array(11),
								goIn: function(no, player) {
									if(no) {
										this.places[no] = player
									}
								},
								goOut: function(no) {
									if(no) {
										this.places[no] = undefined
									}
								},
								getPlaceIndex: function(player) {
									return this.places.indexOf(player)
								},
								getPlayer: function(no) {
									if(no) {
										return this.places[no]
									}
									return undefined
								}}
						}];
		$scope.placesNo = [1,2,3,4,5,6,7,8,9,10,11];

		
		// $scope.$watch('timeBoxes.substitutes', function(newValue) {
			// alert("newValue:" + angular.toJson(newValue))
		// }, true);
		 
		 
		$scope.jouer = function(timebox, player, no) {
			if(no && no != '')
			{
				// le joueur sort du banc
				var indexPlayer = timebox.substitutes.indexOf(player)
				if(indexPlayer>-1)
					timebox.substitutes.splice(indexPlayer, 1)
					
				// si un joueur est déjà il est remplacé (va sur le banc)
				var playerInPlace = timebox.playground.getPlayer(no)
				if(playerInPlace)
					$scope.reposer(timebox, playerInPlace)
				
				// pour aller sur le terrain
				timebox.playground.goIn(no, player)
			}
		};
		
		$scope.reposer = function(timebox, player) {
			// le joueur sort du terrain
			var index = timebox.playground.getPlaceIndex(player)
			if(index > -1)
				timebox.playground.goOut(index)
			
			// et il devient remplaçant
			if(timebox.substitutes.indexOf(player) == -1)
				timebox.substitutes.push(player)
		}
		
		$scope.echanger = function(timebox, player, no) {
			if(no)
			{		
				var index = timebox.playground.getPlaceIndex(player)			
				timebox.playground.goOut(index)
				
				// si un joueur est déjà, ils échangent de place
				var playerInPlace = timebox.playground.getPlayer(no)
				if(playerInPlace)
				{
					//reposer(timebox, playerInPlace)
					timebox.playground.goOut(no)
					timebox.playground.goIn(index, playerInPlace)
				}
				
				// le joueur prend sa place
				timebox.playground.goIn(no, player)
			}
		};
		
		
		
    }