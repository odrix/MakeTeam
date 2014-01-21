team = function () {
    this.players = []
    this.timeboxes = []
    this.maxtime = 0
    this.addPlayer = function (name) {
        if (name && name != '') {
            var p = { id: this.players.length + 1, name: name }
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

    this.isAllPlaceOk = function () {
        if (this.timeboxes.length == 0) return false

        var result = true
        for (var i = 0; i < this.timeboxes.length; i++) {
            result &= this.timeboxes[i].isAllPlaygroundFieldFill()
        }

        return result;
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
}