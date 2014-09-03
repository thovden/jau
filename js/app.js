
var app = angular.module("jauApp", ["firebase"]);

app.controller("JauCtrl", ["$scope", "$firebase",
  function($scope, $firebase) {
    var ref = new Firebase("https://jau.firebaseio.com");

	$scope.authClient = new FirebaseSimpleLogin(ref, function(error, user) {
		if (error) {
		// an error occurred while attempting login
			console.log(error);
			$scope.loggedIn = false;
		} else if (user) {
			
			// user authenticated with Firebase
			$scope.loggedIn = true;
			$scope.user = user;

			var ref = new Firebase("https://jau.firebaseio.com/users/" + $scope.user.uid  + "/messages");
			    // create an AngularFire reference to the data
		    var sync = $firebase(ref);
    		// download the data into a local object
    		var syncObject = sync.$asObject();

    		syncObject.$bindTo($scope, "messages");

		} else {
		// user is logged out
			$scope.loggedIn = false;
	 		$scope.user = {};
		}
	});

	var authRef = new Firebase("https://jau.firebaseio.com/.info/authenticated");
	authRef.on("value", function(snap) {
		if (snap.val() === true) {
		console.log("authenticated");
		} else {
		console.log("not authenticated");
		}
	});


}]);
