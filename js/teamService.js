App.service('teamService', function (){
	
    var _team = new team();
	
	_team.timeboxes.updateNextOut = function() {
        for(var i=0;i<this.length;i++) {
            var iNext = i+1;
            this[i].foreachPlacesDo(function(place) {
				if (place) {
					place.nextSubstitute = false;
					if(iNext < _team.timeboxes.length) {
					    for(var l=0;l<_team.timeboxes[iNext].playerSubstitutes.length;l++)
						{
							if(place.player && _team.timeboxes[iNext].playerSubstitutes[l] && place.player.id == _team.timeboxes[iNext].playerSubstitutes[l].id) {
								place.nextSubstitute = true
							}
						}
					}
				}
			})
			this[i].foreachSubstitutesDo(function(sub) {
				if(iNext < _team.timeboxes.length) {
					if (sub) {
						sub.nextStaySubstituted = false
						for(var l=0;l<_team.timeboxes[iNext].playerSubstitutes.length;l++)
						{
							if(_team.timeboxes[iNext].playerSubstitutes[l] && sub.id == _team.timeboxes[iNext].playerSubstitutes[l].id) {
								sub.nextStaySubstituted = true
							}
						}
					}
				}
			})
        }
	}

    return {
        getTeam: function () {
            return _team
        },
        setPlayers:function (players){
            for(var i=0;i<players.length;i++) {
                _team.players.push(players[i]);
            }
        },
        setTimeboxes: function(timeboxes) {
            for(var i=0;i<timeboxes.length;i++) {
                _team.timeboxes.push(new timebox(timeboxes[i]));
            }
        },
		getPlayerDuration: function(p) {
			p.duration = 0
            for(var i=0;i<_team.timeboxes.length;i++) {
                _team.timeboxes[i].foreachPlacesDo(function (place, timebox) {
                    if(place && place.player && place.player.id == p.id) {
                        p.duration += timebox.duration
                    }
                })
            }
		},
		duplicTimeboxAndUpdate: function(newTimebox) {
		    _team.timeboxes.duplicate(newTimebox)
			this.updateTimeBoxesDuration()
            this.updatePlayersDuration()
            _team.timeboxes.updateNextOut()
		},
		removeTimeboxAndUpdate: function(timebox) {
		    _team.timeboxes.remove(timebox)
			this.updateTimeBoxesDuration()
            this.updatePlayersDuration()
            _team.timeboxes.updateNextOut()
		},
        reinit: function() {
            _team.timeboxes.length = 0
            _team.players.length = 0
        }
	};
});