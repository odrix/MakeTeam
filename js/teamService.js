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
            for(var i=0;i<_timeboxes.length;i++) {
                _timeboxes[i].foreachPlacesDo(function(place, timebox) {
                    if(place && place.player && place.player.id == p.id) {
                        p.duration += timebox.duration
                    }
                })
            }
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
        updatePlayersDuration: function() {
            for(var i=0;i<_players.length;i++) {
                this.getPlayerDuration(_players[i])
            }
        },
		duplicTimeboxAndUpdate: function(newTimebox) {
			_timeboxes.duplicate(newTimebox)
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
            for(var i=0;i<_timeboxes.length;i++) {
                result &= _timeboxes[i].isAllPlaygroundFieldFill()
            }
			return result;
		},
        reinit: function() {
            _timeboxes.length = 0
            _players.length = 0
        }
	};
});