Team = function () {
    var _players = []
    var _timeboxes = []
    var _maxtime = 0
	var _displayNewPlayerForm = false

	this.id=""
    this.players = _players
    this.timeboxes = _timeboxes
    this.maxtime = _maxtime
	
     this.addPlayer = function(name) {
        if (name && name != '') {
            var p = new player(_players.length + 1, name)
            _players.push(p)
			if (_timeboxes && _timeboxes.length > 0) {
				for (var i = 0; i < _timeboxes.length; i++) {
					_timeboxes[i].playerSubstitutes.push(p)
				}
			}
        }
    }

    function createTimebox (maxTime, fields) {
        _maxtime = maxTime
        _timeboxes.push(new Timebox(1, maxTime, Object.clone(_players), fields))
    }

    this.init = function (players, fields, matchDuration) {
        for (var i = 0; i < players.length; i++) {
            this.addPlayer(players[i].trim())
        }
        createTimebox(matchDuration, fields)
    }
	
	this.reinit = function() {
        this.timeboxes.length = 0
        this.players.length = 0
		_displayNewPlayerForm = false
    }
	
	this.displayNewPlayerForm = function () {
        return _displayNewPlayerForm
    }
    
    this.toggleDisplayNewPlayerForm = function () {
        _displayNewPlayerForm = !_displayNewPlayerForm
    }
	
	this.setPlayers = function (players){
		for(var i=0;i<players.length;i++) {
			this.players.push(players[i])
		}
	}
	
	this.setTimeboxes = function(timeboxes) {
		for(var i=0;i<timeboxes.length;i++) {
			this.timeboxes.push(new Timebox(timeboxes[i]))
		}
	}

	this.isNew = function() {
        return this.timeboxes && this.timeboxes.length == 0
    }
	
    this.isAllPlaceOk = function () {
        var result = false
		if (!this.isNew())
		{
			result = true
			if(this.timeboxes)
			{
				for (var i = 0; i < this.timeboxes.length; i++) {
					result &= this.timeboxes[i].isAllPlaygroundFieldFill()
				}
			}
		}
        return result;
    }
	
	this.getPlayerDuration = function(p) {
			p.duration = 0
            for(var i=0;i<this.timeboxes.length;i++) {
                this.timeboxes[i].foreachPlacesDo(function (place, timebox) {
                    if(place && place.player && place.player.id == p.id) {
                        p.duration += timebox.duration
                    }
                })
            }
		}

    this.updateTimeBoxesDuration = function () {
        for (var i = 0; i < this.timeboxes.length; i++) {
            this.timeboxes[i].duration = this.maxtime / this.timeboxes.length
        }
    }

    this.updatePlayersDuration = function () {
        for (var i = 0; i < this.players.length; i++) {
            this.getPlayerDuration(this.players[i])
        }
    }
	
	this.duplicTimeboxAndUpdate = function(newTimebox) {
		this.timeboxes.duplicate(newTimebox)
		this.updateTimeBoxesDuration()
		this.updatePlayersDuration()
		this.updateNextOut()
	}
	
	this.removeTimeboxAndUpdate = function(timebox) {
		this.timeboxes.remove(timebox)
		this.updateTimeBoxesDuration()
		this.updatePlayersDuration()
		this.updateNextOut()
	}

	this.serialize = function () {
	    return {
            id: this.id,
	        userId: this.userId,
	        duartion: this.maxtime,
	        players: JSON.stringify(this.players),
	        timeboxes: JSON.stringify(this.timeboxes)
	    }
	}

	this.deserialize = function (obj) {
	    this.id = obj.id
	    this.userId = obj.userId
	    this.maxtime = obj.duartion
	    this.setPlayers(JSON.parse(obj.players))
	    this.setTimeboxes(JSON.parse(obj.timeboxes))
	}
}