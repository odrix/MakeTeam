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
								},
								echanger: function(player, no) {
									if(no){
										var index = this.getPlaceIndex(player)			
										this.goOut(index)
										
										// si un joueur est déjà, ils échangent de place
										var playerInPlace = this.getPlayer(no)
										if(playerInPlace) {
											//this.reposer(playerInPlace)
											this.goOut(no)
											this.goIn(index, playerInPlace)
										}
										
										// le joueur prend sa place
										this.goIn(no, player)
									}
								}
							},
							jouer: function(player, no) {
								if(no && no != '') {
									// le joueur sort du banc
									var indexPlayer = this.substitutes.indexOf(player)
									if(indexPlayer>-1)
										this.substitutes.splice(indexPlayer, 1)
										
									// si un joueur est déjà il est remplacé (va sur le banc)
									var playerInPlace = this.playground.getPlayer(no)
									if(playerInPlace)
										this.reposer(playerInPlace)
									
									// pour aller sur le terrain
									this.playground.goIn(no, player)
								}
							},
							reposer: function(player) {
								// le joueur sort du terrain
								var index = this.playground.getPlaceIndex(player)
								if(index > -1)
									this.playground.goOut(index)
								
								// et il devient remplaçant
								if(this.substitutes.indexOf(player) == -1)
									this.substitutes.push(player)
							}
						}];
		$scope.placesNo = [1,2,3,4,5,6,7,8,9,10,11];

		
		// $scope.$watch('timeBoxes.substitutes', function(newValue) {
			// alert("newValue:" + angular.toJson(newValue))
		// }, true);
		 
			
		
		$scope.newTimeBox = function (timebox){
			$scope.timeBoxes.push(angular.copy(timebox))
		}
		
		$scope.deleteTimeBox = function(timebox) {
			var indexTimebox = $scope.timeBoxes.indexOf(timebox)
			if(indexTimebox>-1)
				$scope.timeBoxes.splice(indexTimebox, 1)
		}
		
    }