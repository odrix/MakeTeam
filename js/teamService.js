App.service('teamService', function (){
    
	var _players = [];
    var _timeboxes = [];
	var _maxtime = 0;
	
	_timeboxes.getIndexById = function(timebox){
		for(var i=0;i<this.length;i++) {
			if(this[i].id == timebox.id)
				return i
		}
		return -1
	}

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
		getPlayerDuration: function(p) {
			p.duration = 0
			_timeboxes.foreachPlaces(function(place, i, timebox) {
                if(place && place.player && place.player.id == p.id) {
                    p.duration += timebox.duration
                }
            })
		},
		createTimebox: function(maxTime, _places) {
			_maxtime = maxTime
			_timeboxes.push({id:1,
						duration: maxTime,						
						substitutes: angular.copy(_players),
						places: _places
					})
		},
		getTimeboxes: function() {
			return _timeboxes;
		},
		updateTimeBoxesDuration: function() {
			for(var i=0;i<_timeboxes.length;i++) {
				_timeboxes[i].duration = _maxtime / _timeboxes.length
			}
		},
		duplicTimebox: function(newTimebox) {
			var indexItem = _timeboxes.getIndexById(newTimebox)
			newTimebox.id = _timeboxes.length + 1
			if(indexItem == _timeboxes.length - 1)
				_timeboxes.push(newTimebox)
			else
				_timeboxes.splice(indexItem, 0, newTimebox)
			this.updateTimeBoxesDuration()
		},
		removeTimebox: function(timebox) {
			var indexTimebox = _timeboxes.getIndexById(timebox)
			if(indexTimebox>-1) {
				_timeboxes.splice(indexTimebox, 1)
				this.updateTimeBoxesDuration()
				return true
			}
			return false
		},
		isAllPlaceOk: function() {
            if(_timeboxes.length == 0) return false

            var result = true
            _timeboxes.foreachPlaces(function(place) {
                if(!place.player || place.player == null) {
                    result =  false
                    return true
                }
            })
			return result;
		},
        reinit: function() {
            _timeboxes.length = 0
            _players.length = 0
        }
	};
});