angular.module('mkTeamApp').factory('AzureMobileClient',  function () {
	//['$cookieStore', function ($cookieStore) {

	var client = {}
	
	client.azureMSC = new WindowsAzure.MobileServiceClient("https://maketeam.azure-mobile.net/", "IrDVghdkCYNHXpCbkwuuTXPsXVfcbf94")
	client.azureError = ""
	client.isLoggedIn = function () {
	    return client.azureMSC.currentUser != null
	}
        
	client.login = function(socialMediaService, callback) {
		client.azureMSC.login(socialMediaService).then(function(user) {
		    //$cookieStore.put("azureUser", user)
		    callback(user);
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
		scope.userId = client.azureMSC.currentUser.userId

		teamTable.insert(scope.serialize()).done(function (result) {
            scope.id = result.id
		}, function (err) {
		    console.log("ERROR: " + err)
		    alert("une erreur est survenue durant l'enregistrement")
		})
	}

	client.updateTeam = function (scope) {
	    client.getUser()

	    var teamTable = client.azureMSC.getTable("TeamMatch")
	    teamTable.update(scope.serialize())
	}

	client.getUser = function() {
		// if (client.azureMSC.currentUser === null) {
		  // client.azureMSC.currentUser = $cookieStore.get("azureUser");
		// }
	}

	return client;
});