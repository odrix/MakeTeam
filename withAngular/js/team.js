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
		
		// _players[0].__proto__.goto = function(placeNo) {
										
									// }	
		
		$scope.timeBoxes = [{substitutes:_players,
							playground: {
								nbMaxPlayers: 11,
								places: new Array(11),
								addPlayer: function(player, no) {
									if(no) {
										player.no = no
										this.places[no] = player
										return 
									}
									if(player.no)
										this.places[player.no] = player
								},
								removePlayer: function(player, no) {
									if(no) {
										this.places[no] = undefined
										player.no = undefined
										return
									}
									
									if(player.no) {
										this.places[player.no] = undefined
										player.no = undefined
										return
									}
								},
								isAlreadyPlayer: function(player) {
									if(player.no) {
										return this.places[player.no] != undefined
									}
									
									var result = false
									var i=0
									for(i=0;i<this.places.length;i++){
										if(this.places[i] && this.places[i].no == player.no)
											result = true
									}
									return result
								}}
						}];
		$scope.placesNo = [1,2,3,4,5,6,7,8,9,10,11];

		
		// $scope.$watch('timeBoxes.substitutes', function(newValue) {
			// alert("newValue:" + angular.toJson(newValue))
		// }, true);
		 
		 
		$scope.placement = function(player, timeBox) {
			if(player.no && player.no != '')
			{
				var indexPlayer = timeBox.substitutes.indexOf(player)
				if(indexPlayer>-1)
					timeBox.substitutes.splice(indexPlayer, 1)
					
				//timeBox.playground.removePlayer(player)
				
				if(timeBox.playground.isAlreadyPlayer(player))
					alert("y a déjà un joueur")
				
				timeBox.playground.addPlayer(player)
			}
		};
		
		$scope.changement = function(player, timeBox) {
			if(player.no && player.no != '')
			{					
				var curPlace = player.no
				var indexLastPlace = timeBox.playground.places.indexOf(player)
				timeBox.substitutes.push(timeBox.playground.places[curPlace])
				timeBox.playground.removePlayer(player, indexLastPlace)
								
				if(timeBox.playground.isAlreadyPlayer(player))
					alert("y a déjà un joueur")
				
				timeBox.playground.addPlayer(player, curPlace)
			}
		};
		
    }