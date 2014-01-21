﻿App.controller('menuCtrl', function($scope, localStorageService, teamService, $location, $timeout) {

    $scope.IntroOptions = {
        steps : [{
            element: document.querySelector('#txtplayers'),
            intro: "Tapez les nom des joueurs de votre équipe participant au macth<br/>séparé par des virgule(,), point-virgule(;), espace( ) ou retour à la ligne. ",
            position: 'right'
        },
            {
                element: document.querySelector('.btnValidationJoueurs'),
                intro: "Valider",
                position: 'right'
            }]
    }

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
		localStorageService.set('players', teamService.getTeam().players)
		localStorageService.set('compo', teamService.getTeam().timeboxes)
    }

    $scope.getLast = function(){
        teamService.setPlayers(localStorageService.get('players'))
        teamService.setTimeboxes(localStorageService.get('compo'))
		teamService.getTeam().timeboxes.updateNextOut()
        $location.path("/composer", false)
    }


    $scope.isNew = function() {
        return teamService.getTeam().timeboxes.length == 0
    }

    $scope.isAllPlaceOk = function() {
        return teamService.isAllPlaceOk()
    }
	
	$scope.canBeEdited = function() {
		if (this.isAllPlaceOk() && !this.isNew())
			return true;
		else
			return false;
	}

	//$scope.login = function () {
	    
	//}

	//$scope.logout = function () {
	   
	//}

	//$scope.isConnected = function () {
	//    return false;
	//}

    $scope.$on('$viewContentLoaded', function() {
        $scope.IntroOptions = {
            steps : [{
                element: document.querySelector('#txtplayers'),
                intro: "Tapez les nom des joueurs de votre équipe participant au macth<br/>séparé par des virgule(,), point-virgule(;), espace( ) ou retour à la ligne. ",
                position: 'right'
            },
                {
                    element: document.querySelector('.btnValidationJoueurs'),
                    intro: "Valider",
                    position: 'right'
                }]
        }
    })
});