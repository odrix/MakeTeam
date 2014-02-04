﻿describe("Team", function () {
    var team
    var compo = [[{ no: 1 }], [{ no: 2 }, { no: 4 }, { no: 5 }, { no: 3 }], [{ no: 6 }, { no: 7 }], [{ no: 8 }, { no: 10 }, { no: 11 }], [{ no: 9 }]]
    var players = ['pierre', 'paul', 'jack']

    beforeEach(function () {
        team = new Team()
        team.init(players, compo, 90);
    });

    it("init ok", function () {
        expect(team.players.length).toEqual(3);
        expect(team.timeboxes.length).toEqual(1);
        expect(team.maxtime, 90);
    });

    it("after init is NOT new", function () {
        expect(team.isNew()).toEqual(false);
    });

    it("after REinit is new", function () {
        team.reinit()
        expect(team.isNew()).toEqual(true);
    });
})