angular.module('mkTeamApp').factory('AzureMobileClient',  function () {
	//['$cookieStore', function ($cookieStore) {

	var client = {}
	client.isLoggedIn = false
	client.azureError = ""
	client.azureMSC = new WindowsAzure.MobileServiceClient( "https://maketeam.azure-mobile.net/", "IrDVghdkCYNHXpCbkwuuTXPsXVfcbf94" )
        
	client.login = function(callback, socialMediaService) {
		client.azureMSC.login(socialMediaService).then(function(user) {
			client.isLoggedIn = user != null
			//$cookieStore.put("azureUser", user)
			callback(client.isLoggedIn)
		}, 
		function(error){
			alert(error)
			client.azureError = error
		})
	}

	client.logout = function() {
		client.getUser()
		client.azureMSC.logout()
		//$cookieStore.remove("azureUser")
	}

	client.getTeam = function(callback) {
			client.getUser()
			var stuffTable = client.azureMSC.getTable("TeamMatch");
			stuffTable.read().then(function(items) {
				callback(items);
			})
	}

	client.addTeam = function(scope) {
		client.getUser()
		
		var teamTable = client.azureMSC.getTable("TeamMatch")
        var playerTable = client.azureMSC.getTable("Player")
        var timeboxTable = client.azureMSC.getTable("Timebox")
        var timeboxPlayerTable = client.azureMSC.getTable("TimeboxPlayer")
		
		for(var i=0;i<scope.timeboxes.length;i++) {
			timeboxTable.insert({duration:scope.timeboxes[i].duration,teammatchid:scope.id})
		}
	}

	client.getUser = function() {
		// if (client.azureMSC.currentUser === null) {
		  // client.azureMSC.currentUser = $cookieStore.get("azureUser");
		// }
	}

	return client;
});