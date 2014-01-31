App.factory('azureMobileClient', function () {
//angular.module('mkTeamApp').factory('AzureMobileClient', function () {
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

	client.getTeams = function (callback) {
	    client.getUser()
	    var teamTable = client.azureMSC.getTable("TeamMatch");
	    teamTable.where({
	        userId: client.azureMSC.currentUser.userId
	    }).orderByDescending('__updatedAt').read().done(function (items) {
	        callback(items);
	    })
	}

	client.getLastTeam = function (callback) {
	    client.getUser()
	    var teamTable = client.azureMSC.getTable("TeamMatch");
	    teamTable.orderByDescending('__updatedAt').take(1).read().done(function (items) {
            if(items.length == 1)
                callback(items[0])
            else
                callback(null)
	    }, function (err) {
	        console.log("get last: " + err)
	    })
	}

	client.addTeam = function(scope) {
		client.getUser()
		var teamTable = client.azureMSC.getTable("TeamMatch")
		teamTable.insert(scope.serialize()).done(function (result) {
            scope.id = result.id
		}, function (err) {
		    console.log("add team: " + err)
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