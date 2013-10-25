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
				if($scope.timeBoxes[i].playground.places) {
					for(var j=0;j<$scope.timeBoxes[i].playground.places.length;j++) {
						for(var k=0;k<$scope.timeBoxes[i].playground.places[j].length;k++) {
							var p = $scope.timeBoxes[i].playground.places[j][k]
							if(p && p.player && p.id == p.player.id) {
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
						playground: {
							places: _places,
							getPlace: function(no) {
								for(var i=0;i<this.places.length;i++){
									for(var j=0;j<this.places[i].length;j++) {
										if(this.places[i][j].no == no) return this.places[i][j]
									}
								}
							},
							goIn: function(no, player) {
								if(no) {
									this.getPlace(no).player = player
									//this.places[no] = player
								}
							},
							goOut: function(no) {
								if(no) {
									this.getPlace(no).player = null
								}
							},
							getPlaceIndex: function(player) {
								for(var i=0;i<this.places.length;i++){
									for(var j=0;j<this.places[i].length;j++) {
										if(this.places[i][j].player && this.places[i][j].player == player) return this.places[i][j].no
									}
								}
							},
							getPlayer: function(no) {
								if(no) {
									return this.getPlace(no).player
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
							var no = this.playground.getPlaceIndex(player)
							if(no && no > -1)
								this.playground.goOut(no)
							
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
	 

	function updateTimeBoxesDuration() {
		for(var i=0;i<$scope.timeBoxes.length;i++) {
			$scope.timeBoxes[i].duration = maxTime / $scope.timeBoxes.length
		}			
	}

	function updatePlayerDuration(player) {
		for(var i=0;i<$scope.players.length;i++) {
			if(player) {
				if($scope.players[i].id == player.id) {
					updateDuration($scope.players[i])
					break;
				}
			} else {
				updateDuration($scope.players[i])
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
	
	$scope.dropped = function(event, ui) {
		alert('dropped');
	}
	
})