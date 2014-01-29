App.controller('ShareCtrl', function($scope, teamService, $timeout) {
 
    teamService.updateNextOut()
    $scope.timeBoxes = teamService.timeboxes
    
});