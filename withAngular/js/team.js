    function TeamCtrl($scope) {
		var _players = [{nom: "Tom", no:''},
						{nom: "Harry", no:''},
						{nom: "Larry", no:''},
						{nom: "Luke", no:''},
						{nom: "Paul", no:function(o) {
							return ''
						}},
						{nom: "Jean", no:''},
						{nom: 'gille', no:''}
					];
		
			
		$scope.timeBoxes = [{substitutes:_players, players: []}];
		$scope.places = [{no:1},{no:2},{no:3},{no:4},{no:5},{no:6},{no:7},{no:8},{no:9},{no:10},{no:11}];
		
		// $scope.$watchCollection('timeBoxes.substitutes', function(newValue) {
			// alert("newValue:" + angular.toJson(newValue))
		// })
		
		$scope.$watch('timeBoxes.substitutes', function(newValue) {
			alert("newValue:" + angular.toJson(newValue))
		}, true);
		
		$scope.playing = function() {
			alert(item);
		};
		 
		 
		$scope.archive = function() {
			var oldTodos = $scope.todos;
			$scope.todos = [];
			angular.forEach(oldTodos, function(todo) {
			if (!todo.done) $scope.todos.push(todo);
			});
		};
    }