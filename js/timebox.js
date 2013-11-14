function timebox (t) { //id,duration,playerSubstitutes,playgroundField) {
    this.id = t.id || t[0]
    this.duration = t.duration || t[1]
    this.playerSubstitutes = t.playerSubstitutes || t[2]
    this.playgroundField = t.playgroundField || t[3]

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


Array.prototype.duplicate = function(item) {
    var indexItem = this.getIndexById(item)
    item.id = this.length + 1
    if(indexItem == this.length - 1)
        this.push(item)
    else
        this.splice(indexItem, 0, item)
}

Array.prototype.remove = function(item) {
    var indexItem = this.getIndexById(item)
    if(indexItem>-1) {
        this.splice(indexItem, 1)
        return
    }
}

Array.prototype.getIndexById = function(item){
    for(var i=0;i<this.length;i++) {
        if(this[i].id == item.id)
            return i
    }
    return -1
}