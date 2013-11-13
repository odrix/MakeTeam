App.controller('menuCtrl', function($scope, localStorageService, teamService, $location, $timeout) {
    $scope.new = function() {
        teamService.reinit()
        $location.path("/debut", false)
    }

    $scope.share = function() {
        $location.path("/partager", false)
    }

    $scope.save = function(){
        localStorageService.add('players', teamService.getPlayers())
        localStorageService.add('compo', teamService.getTimeboxes())
    }

    $scope.isNotNew = function() {
        return teamService.getTimeboxes().length > 0
    }

    $scope.isAllPlaceOk = function() {
        return teamService.isAllPlaceOk()
    }
});
