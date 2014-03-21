App.service('storageService', ['localStorageService', 'azureMobileClient',
	function(localStorageService, azureMobileClient) {
		localStorageService.save = function(team) {
			localStorageService.set('players', team.players)
			localStorageService.set('compo', team.timeboxes)
		}
		
		azureMobileClient.save = function(team) {
			if (teamService.id === '')
				azureMobileClient.addTeam(team)
			else
				azureMobileClient.updateTeam(team)
		}
		
		localStorageService.getLast = function(team, success) {
			team.setPlayers(localStorageService.get('players'))
			team.setTimeboxes(localStorageService.get('compo'))
			success(team)
		}
		
		azureMobileClient.getLast= function(team, success) {
			azureMobileClient.getLastTeam(function (item) {
				team.deserialize(item)
				success(team)
			})
		}

		var storage = {}
		storage.o = localStorageService
		
		storage.useAzure = function () {
			this.o = azureMobileClient
		}
		
		storage.useLocal = function () {
			this.o = localStorageService
		}
		
		return storage
	}
])