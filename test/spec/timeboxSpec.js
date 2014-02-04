describe("Timebox", function () {
    var timeBox

    beforeEach(function () {
        timeBox = new Timebox(1, 45, ['moi', 'lui'],
            [
                [
                    { player: { id: 1, nom: 'raul' } },
                    { player: { id: 2, nom: 'paul' } }
                ],
                [
                    { player: { id: 1, nom: 'pierre' } },
                    { player: { id: 1, nom: 'jack' } }
                ]
            ]);
    });

    it("count  4 players in playground", function () {
        var nbPlayers = timeBox.getNbPlacedPlayers()
        expect(nbPlayers).toEqual(4);
    });

    it("the playground is full", function () {
        var playgroundFull = timeBox.isAllPlaygroundFieldFill()
        expect(playgroundFull).toEqual(true);
    });

    it("add empty place the playground is NOT full", function () {
        timeBox.playgroundField[1].push({id:5})
        var playgroundFull = timeBox.isAllPlaygroundFieldFill()
        expect(playgroundFull).toEqual(false);
    });
})