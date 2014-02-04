App.service('teamService', function (){
	
    var _team = new Team()
	
	_team.updateNextOut = function() {
	    for (var i = 0; i < this.timeboxes.length; i++) {
            var iNext = i+1;
            this.timeboxes[i].foreachPlacesDo(function (place) {
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
            this.timeboxes[i].foreachSubstitutesDo(function (sub) {
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

    return  _team
})