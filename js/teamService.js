App.service('teamService', function (){
    
	var _players = [];
    var _timeboxes = [];
	var _maxtime = 0;
	
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
			_timeboxes.push({duration: maxTime,						
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
		addTimebox: function(newTimebox) {
			_timeboxes.push(newTimebox)
			this.updateTimeBoxesDuration()
		},
		removeTimebox: function(timebox) {
			var indexTimebox = _timeboxes.indexOf(timebox)
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