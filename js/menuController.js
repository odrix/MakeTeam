App.controller('menuCtrl', function($scope, localStorageService, teamService, AzureMobileClient, $location, $timeout) {

    $scope.new = function() {
        teamService.reinit()
        $location.path("/debut", false)
    }
	
	$scope.edit = function() {
		teamService.reinit()
		this.getLast()
	}	

    $scope.share = function() {
		this.save()
		$location.path("/partager", false)
    }

    $scope.save = function(){
        if (AzureMobileClient.isLoggedIn()) {
            if (teamService.id == '')
                AzureMobileClient.addTeam(teamService)
            else
                AzureMobileClient.updateTeam(teamService)
        } else {
            localStorageService.set('players', teamService.getTeam().players)
            localStorageService.set('compo', teamService.getTeam().timeboxes)
        }
    }

    $scope.getLast = function(){
        teamService.setPlayers(localStorageService.get('players'))
        teamService.setTimeboxes(localStorageService.get('compo'))
		teamService.timeboxes.updateNextOut()
        $location.path("/composer", false)
    }

    $scope.isNew = function () { return teamService.isNew() }
    $scope.isAllPlaceOk = function () { return teamService.isAllPlaceOk() }
    $scope.isConnected = function () { return AzureMobileClient.isLoggedIn() }
	$scope.canBeEdited = function() { return (teamService.isAllPlaceOk() && !teamService.isNew())}

	
	$scope.login = function (socialService) {
	    AzureMobileClient.login("facebook", function() {
	        $scope.$apply() // pour mettre a jour le boutton connecter/deconnecter
	    })
    };

    $scope.logout = function() {       
        AzureMobileClient.logout()
    }

});