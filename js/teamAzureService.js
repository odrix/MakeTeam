App.service('teamService', function (){
    var s = function () {
        var client = new WindowsAzure.MobileServiceClient( "https://maketeam.azure-mobile.net/", "IrDVghdkCYNHXpCbkwuuTXPsXVfcbf94" )
        
        this.login = function () {
            client.login("facebook")
        }

        this.logout = function () {
            client.logout()
        }

        this.saveTeam = function () {
            var team = { sporttype: "foot", playground }

            client.getTable("TeamMatch").insert(item)
            client.getTable("Player").insert(item)
            client.getTable("Timebox").insert(item)
            client.getTable("TimeboxPlayer").insert(item)
        }

        this.getLastTeam = function () {

        }
    }

    return s
})