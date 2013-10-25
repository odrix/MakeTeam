    function TeamCtrl($scope) {
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
		
		
		
		_players[0].__proto__.updateDuration = function() {
		// function getDuration() {
			this.duration = 0
			if($scope.timeBoxes) {			
				for(var i=0;i<$scope.timeBoxes.length;i++) {
					if($scope.timeBoxes[i].playground.places) {
						for(var j=0;j<$scope.timeBoxes[i].playground.places.length;j++) {
							var p = $scope.timeBoxes[i].playground.places[j]
							if(p && this.id == p.id) {
								this.duration += $scope.timeBoxes[i].duration
								break
							}
						}
					}
				}
			}
		}
									
		
		var nbMaxPlayers = 11;	
		var maxTime = 90;
		$scope.placesNo = [1,2,3,4,5,6,7,8,9,10,11];
		
		$scope.timeBoxes = [{duration: maxTime,						
							substitutes: angular.copy(_players),
							playground: {
								places: new Array(nbMaxPlayers),
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
									updatePlayerDuration(player)
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
								
								updatePlayerDuration(player)
							}
						}];
		$scope.players = _players;
		
		// $scope.$watch('timeBoxes.substitutes', function(newValue) {
			// alert("newValue:" + angular.toJson(newValue))
		// }, true);
		 
		function nbTimebox() {
			return 
		}

		function updateTimeBoxesDuration() {
			for(var i=0;i<$scope.timeBoxes.length;i++) {
				$scope.timeBoxes[i].duration = maxTime / $scope.timeBoxes.length
			}			
		}

		function updatePlayerDuration(player) {
			for(var i=0;i<$scope.players.length;i++) {
				if(player) {
					if($scope.players[i].id == player.id) {
						$scope.players[i].updateDuration()
						break;
					}
				} else {
					$scope.players[i].updateDuration()
				}
			}			
		}		
		
		$scope.newTimeBox = function (timebox){
			$scope.timeBoxes.push(angular.copy(timebox))
			updateTimeBoxesDuration()
			updatePlayerDuration()
		}
		
		$scope.deleteTimeBox = function(timebox) {
			var indexTimebox = $scope.timeBoxes.indexOf(timebox)
			if(indexTimebox>-1) {
				$scope.timeBoxes.splice(indexTimebox, 1)
				updateTimeBoxesDuration()
				updatePlayerDuration()
			}
		}
		
    }