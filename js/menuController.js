App.controller('menuCtrl', function($scope, storageService, teamService, azureMobileClient, $location, $timeout) {

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
		storageService.o.save(teamService)
    }

    $scope.getLast = function () {
		storageService.o.getLast(teamService, function(team) {
            team.updateNextOut()
            $location.path("/composer", false)
			$scope.$apply()
        })
    }

    $scope.isNew = function () { return teamService.isNew() }
    $scope.isAllPlaceOk = function () { return teamService.isAllPlaceOk() }
    $scope.isConnected = function () { return azureMobileClient.isLoggedIn() }
	$scope.canBeEdited = function() { return (teamService.isAllPlaceOk() && !teamService.isNew())}

	
	$scope.login = function (socialService) {
	    azureMobileClient.login(socialService, function () {
			storageService.useAzure()
	        $scope.$apply() // pour mettre a jour le boutton connecter/deconnecter
	    })
    };

    $scope.logout = function() {       
        azureMobileClient.logout()
		storageService.useLocal()
    }

});