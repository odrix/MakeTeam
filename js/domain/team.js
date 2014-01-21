team = function () {
    this.players = []
    this.timeboxes = []
    this.maxtime = 0
	
    this.addPlayer = function (name) {
        if (name && name != '') {
            var p = new player(this.players.length + 1, name)
            this.players.push(p)
        }
    }

    this.createTimebox = function (maxTime, fields) {
        this.maxtime = maxTime
        this.timeboxes.push(new timebox([1, maxTime, angular.copy(this.players), fields]))
    }

    this.init = function (players, fields) {
        for (var i = 0; i < players.length; i++) {
            this.addPlayer(players[i].trim())
        }
        this.createTimebox(90, fields)
    }
	
	this.reinit = function() {
            this.timeboxes.length = 0
            this.players.length = 0
    }

    this.isAllPlaceOk = function () {
        if (this.timeboxes.length == 0) return false

        var result = true
        for (var i = 0; i < this.timeboxes.length; i++) {
            result &= this.timeboxes[i].isAllPlaygroundFieldFill()
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
		this.timeboxes.updateNextOut()
	}
	
	this.removeTimeboxAndUpdate = function(timebox) {
		this.timeboxes.remove(timebox)
		this.updateTimeBoxesDuration()
		this.updatePlayersDuration()
		this.timeboxes.updateNextOut()
	}
}