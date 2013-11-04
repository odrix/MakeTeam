App.controller('menuCtrl', function($scope, teamService, $location, $timeout) {
    $scope.new = function() {
        teamService.reinit()
        $location.path("/debut", false)
    }

    $scope.share = function() {
        $location.path("/partager", false)
    }

    $scope.save = function(){

    }

    $scope.isNotNew = function() {
        return teamService.getTimeboxes().length > 0
    }

    $scope.isAllPlaceOk = function() {
        return teamService.isAllPlaceOk()
    }
});
