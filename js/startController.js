App.controller('StartCtrl', function($scope, teamService, $location,$timeout) {
	$scope.playerList = "Vador,c6po;R2D2 Luke,Han,Cheewie;ewok Palpatine,Doku,Yoda,Maul,Boba obi-wan";
	
	$scope.placesPossible = [
		{nom:"4-1-2-3", compo:[[{no:1}], [{no:2},{no:4},{no:5},{no:3}], [{no:6}], [{no:7},{no:8}], [{no:10},{no:9},{no:11}]]},
        {nom:"4-2-3-1",	compo:[[{no:1}], [{no:2},{no:4},{no:5},{no:3}], [{no:6},{no:7}], [{no:8},{no:10},{no:11}], [{no:9}]]},
        {nom:"4-2-2-2", compo:[[{no:1}], [{no:2},{no:4},{no:5},{no:3}], [{no:6},{no:7}], [{no:8},{no:11}], [{no:9},{no:10}]]},
        {nom:"4-3-3", 	compo:[[{no:1}], [{no:2},{no:4},{no:5},{no:3}], [{no:7},{no:6},{no:10}], [{no:8},{no:9},{no:11}]]},
		{nom:"4-4-2", 	compo:[[{no:1}], [{no:2},{no:4},{no:5},{no:3}], [{no:8},{no:6},{no:7},{no:11}], [{no:9},{no:10}]]}
	];

    $scope.places = $scope.placesPossible[1];

    $scope.validationPlayers = function() {
		var reg=new RegExp("[ ,;\n]+", "g");
		var players = $scope.playerList.split(reg)
        //var _places = [[{no:1}], [{no:2},{no:4},{no:5},{no:3}], [{no:6},{no:7}], [{no:8},{no:10},{no:11}], [{no:9}]] // 4-2-3-1

        if(teamService.getTimeboxes.length == 0)
            initComposition(players, $scope.places.compo)
        else
            completePlayersList(players)
        $location.path("/composer", false)
	}

    function completePlayersList(players) {

    }

    function initComposition(players, _places) {
        for (var i = 0; i < players.length; i++) {
            teamService.addPlayer(players[i].trim())
        }
        teamService.createTimebox(90, _places)
    }

});