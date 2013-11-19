App.service('teamService', function (){
    
	var _players = [];
    var _timeboxes = [];
	var _maxtime = 0;
	
	_timeboxes.updateNextOut = function() {
        for(var i=0;i<this.length;i++) {
            var iNext = i+1;
            this[i].foreachPlacesDo(function(place) {
                    if(iNext < _timeboxes.length) {
                        for(var l=0;l<this[iNext].playerSubstitutes.length;l++)
                        {
                            if(place && place.player && this[iNext].playerSubstitutes[l] && place.player.id == this[iNext].playerSubstitutes[l].id) {
                                place.nextSubstitute = true
                            }
                        }
                    }
                }
            )
        }
	}

<<<<<<< HEAD
    _timeboxes.foreachPlaces = function(action) {
        for(var i=0;i<_timeboxes.length;i++) {
            if(_timeboxes[i].places) {
                for(var j=0;j<_timeboxes[i].places.length;j++) {
                    for(var k=0;k<_timeboxes[i].places[j].length;k++) {
                        var tmpp = _timeboxes[i].places[j][k]
                        var result = action(tmpp, i, _timeboxes[i])
                        if(result != undefined) return result
                    }
                }
            }
        }
    }
	
	_timeboxes.updateNextOut = function() {
        _timeboxes.foreachPlaces(function(place, i) {
            var iNext = i+1;
            if(iNext < _timeboxes.length) {
                for(var l=0;l<_timeboxes[iNext].substitutes.length;l++)
                {
                    if(place && place.player && _timeboxes[iNext].substitutes[l] && place.player.id == _timeboxes[iNext].substitutes[l].id) {
                        place.nextSubstitute = true
                    }
                }
            }
        })
	}

=======
>>>>>>> origin/master
    return {
		addPlayer:function (name){
			if(name && name != '')
			{
				var p = { id: _players.length + 1, name: name}
				_players.push(p)
			}
		},
		getPlayers:function (){
		  return _players;
		},
        getTimeboxes: function() {
            return _timeboxes;
        },
        setPlayers:function (players){
            for(var i=0;i<players.length;i++) {
                _players.push(players[i]);
            }
        },
        setTimeboxes: function(timeboxes) {
            for(var i=0;i<timeboxes.length;i++) {
                _timeboxes.push(new timebox(timeboxes[i]));
            }
        },
		getPlayerDuration: function(p) {
			p.duration = 0
<<<<<<< HEAD
			_timeboxes.foreachPlaces(function(place, i, timebox) {
                if(place && place.player && place.player.id == p.id) {
                    p.duration += timebox.duration
                    return false
                }
            })
=======
            for(var i=0;i<_timeboxes.length;i++) {
                _timeboxes[i].foreachPlacesDo(function(place, timebox) {
                    if(place && place.player && place.player.id == p.id) {
                        p.duration += timebox.duration
                    }
                })
            }
>>>>>>> origin/master
		},
		createTimebox: function(maxTime, _places) {
			_maxtime = maxTime
			_timeboxes.push(new timebox([1,maxTime,angular.copy(_players),_places]))
		},
		updateTimeBoxesDuration: function() {
			for(var i=0;i<_timeboxes.length;i++) {
				_timeboxes[i].duration = _maxtime / _timeboxes.length
			}
		},
<<<<<<< HEAD
		duplicTimebox: function(newTimebox) {
			var indexItem = _timeboxes.getIndexById(newTimebox)
			newTimebox.id = _timeboxes.length + 1
			if(indexItem == _timeboxes.length - 1)
				_timeboxes.push(newTimebox)
			else
				_timeboxes.splice(indexItem, 0, newTimebox)
=======
        updatePlayersDuration: function() {
            for(var i=0;i<_players.length;i++) {
                this.getPlayerDuration(_players[i])
            }
        },
		duplicTimeboxAndUpdate: function(newTimebox) {
			_timeboxes.duplicate(newTimebox)
>>>>>>> origin/master
			this.updateTimeBoxesDuration()
            this.updatePlayersDuration()
		},
		removeTimeboxAndUpdate: function(timebox) {
			_timeboxes.remove(timebox)
			this.updateTimeBoxesDuration()
            this.updatePlayersDuration()
		},
		isAllPlaceOk: function() {
            if(_timeboxes.length == 0) return false

            var result = true
<<<<<<< HEAD
            _timeboxes.foreachPlaces(function(place) {
                if(!place.player || place.player == null) {
                    result =  false
                    return true
                }
            })
=======
            for(var i=0;i<_timeboxes.length;i++) {
                result &= _timeboxes[i].isAllPlaygroundFieldFill()
            }
>>>>>>> origin/master
			return result;
		},
        reinit: function() {
            _timeboxes.length = 0
            _players.length = 0
        }
	};
});