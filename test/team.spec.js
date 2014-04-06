describe("Team", function () {
    var team
    var compo = [[{ no: 1 }], [{ no: 2 }, { no: 4 }, { no: 5 }, { no: 3 }], [{ no: 6 }, { no: 7 }], [{ no: 8 }, { no: 10 }, { no: 11 }], [{ no: 9 }]]
    var players = ['pierre', 'paul', 'jack']
    var maxtime = 90 
	
	
    beforeEach(function () {
        team = new Team()
		team.updateNextOut = function () {}
        team.init(players, compo, maxtime);
    });

    it("init ok", function () {
        expect(team.players.length).toEqual(players.length);
        expect(team.timeboxes.length).toEqual(1);
        expect(team.timeboxes[0].duration).toEqual(maxtime);
    });

    it("after init is NOT new", function () {
        expect(team.isNew()).toEqual(false);
    });

    it("after REinit is new", function () {
        team.reinit()
        expect(team.isNew()).toEqual(true);
    });
	
	it("use 3 timeboxes, duration divide by 3", function () {
		team.duplicTimeboxAndUpdate(team.timeboxes[0]);
		team.duplicTimeboxAndUpdate(team.timeboxes[1]);
		expect(team.timeboxes[0].duration).toEqual(30);
		expect(team.timeboxes[1].duration).toEqual(30);
		expect(team.timeboxes[2].duration).toEqual(30);
	});
})