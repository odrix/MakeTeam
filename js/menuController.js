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
		// localStorageService.set('players', teamService.players)
		// localStorageService.set('compo', teamService.timeboxes)
		AzureMobileClient.addTeam(teamService)
    }

    $scope.getLast = function(){
        teamService.setPlayers(localStorageService.get('players'))
        teamService.setTimeboxes(localStorageService.get('compo'))
		teamService.timeboxes.updateNextOut()
        $location.path("/composer", false)
    }

    $scope.isNew = teamService.isNew
    $scope.isAllPlaceOk = teamService.isAllPlaceOk
        
	$scope.canBeEdited = function() {
		if (teamService.isAllPlaceOk() && !teamService.isNew())
			return true;
		else
			return false;
	}

	$scope.isConnected = function () {
	    return AzureMobileClient.isLoggedIn
	}
	
	$scope.login = function (socialService) {
        AzureMobileClient.login(function(isLoggedIn) {
            if (isLoggedIn) {
                $window.location.href = "/#/debut"
            }
        }, "facebook")
    };

    $scope.logout = function() {       
        AzureMobileClient.logout()
    }

});