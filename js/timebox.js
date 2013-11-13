function timebox (id,duration,playerSubstitutes,playgroundField) {
    this.id = id
    this.duration = duration
    this.playerSubstitutes = playerSubstitutes
    this.playgroundField = playgroundField

    this.foreachPlacesDo = function(action) {
        if(this.playgroundField) {
            for(var i=0;i<this.playgroundField.length;i++) {
                for(var j=0;j<this.playgroundField[i].length;j++) {
                    var currentPlace = this.playgroundField[i][j]
                    var result = action(currentPlace, this)
                    if(result != undefined) return result
                }
            }
        }
    }

    this.isAllPlaygroundFieldFill = function() {
        var result = true
        this.foreachPlacesDo(function(place) {
            if(!place.player || place.player == null) {
                result =  false
                return true
            }
        })
        return result
    }

}
