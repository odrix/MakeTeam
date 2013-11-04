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
			if(iNext < _timeboxes.length && _timeboxes[i].places) {
				for(var j=0;j<_timeboxes[i].places.length;j++) {
					for(var k=0;k<_timeboxes[i].places[j].length;k++) {
                        var tmpp = _timeboxes[i].places[j][k];
						for(var l=0;l<_timeboxes[iNext].substitutes.length;l++)
						{
							if(tmpp && tmpp.player && _timeboxes[iNext].substitutes[l] && tmpp.player.id == _timeboxes[iNext].substitutes[l].id) {
								tmpp.nextSubstitute = true
							}
						}
					}
				}
			}
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
				if(_timeboxes[i].places) {
					for(var j=0;j<_timeboxes[i].places.length;j++) {
						for(var k=0;k<_timeboxes[i].places[j].length;k++) {
							var tmpp = _timeboxes[i].places[j][k]
							if(tmpp && tmpp.player && tmpp.player.id == p.id) {
								p.duration += _timeboxes[i].duration
								break
							}
						}
					}
				}
			}
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
			newTimebox.id == _timeboxes.length
			if(indexItem == -1)
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
			for(var i=0;i<_timeboxes.length;i++) {
				if(_timeboxes[i].places) {
					for(var j=0;j<_timeboxes[i].places.length;j++) {
						for(var k=0;k<_timeboxes[i].places[j].length;k++) {
							var tmpp = _timeboxes[i].places[j][k]
							if(!tmpp.player || tmpp.player == null)
								return false;
						}
					}
				}
			}
			return true;
		}
	};
});