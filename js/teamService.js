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

	_timeboxes.updateNextOut = function() {
        for(var i=0;i<_timeboxes.length;i++) {
            var iNext = i+1;
            _timeboxes[i].foreachPlacesDo(function(place) {
                    if(iNext < _timeboxes.length) {
                        for(var l=0;l<_timeboxes[iNext].playerSubstitutes.length;l++)
                        {
                            if(place && place.player && _timeboxes[iNext].playerSubstitutes[l] && place.player.id == _timeboxes[iNext].playerSubstitutes[l].id) {
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
			_timeboxes.push(new timebox(1,maxTime,angular.copy(_players),_places))
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