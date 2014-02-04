function timebox (t) { //id,duration,playerSubstitutes,playgroundField) {

    this.id = t.id || t[0] || arguments[0]
    this.duration = t.duration || t[1] || arguments[1]
    this.playerSubstitutes = t.playerSubstitutes || t[2] || arguments[2]
    this.playgroundField = t.playgroundField || t[3] || arguments[3]
    this.collapse = false;

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
	
	this.foreachSubstitutesDo = function(action) {
        if(this.playerSubstitutes) {
            for(var i=0;i<this.playerSubstitutes.length;i++) {
				var currentSubstitute = this.playerSubstitutes[i]
				var result = action(currentSubstitute, this)
				if(result != undefined) return result
            }
        }
    }

    this.isAllPlaygroundFieldFill = function() {
        var result = true
        this.foreachPlacesDo(function(place) {
            if(!place.player || place.player == null || !place.player.id) {
                result =  false
            }
        })
        return result
    }

    this.getNbPlacedPlayers = function () {
        var nbPlaced = 0;
        this.foreachPlacesDo(function (place) {
            if (place.player) {
                nbPlaced++;
            }
        })
        return nbPlaced;
    }
     
}

// duplicate a timebox in an array of timeboxes
Array.prototype.duplicate = function(item) {
    var indexItem = this.getIndexById(item)
    item.id = this.length + 1
    if(indexItem == this.length - 1)
        this.push(item)
    else
        this.splice(indexItem, 0, item)
}

// remove a timebox in an array of timeboxes
Array.prototype.remove = function(item) {
    var indexItem = this.getIndexById(item)
    if(indexItem>-1) {
        this.splice(indexItem, 1)
        return
    }
}

// get the index of a timebox in an array of timeboxes
Array.prototype.getIndexById = function(item){
    for(var i=0;i<this.length;i++) {
        if(this[i].id == item.id)
            return i
    }
    return -1
}