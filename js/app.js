
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

		 	
		 	var nameRef = new Firebase("https://jau.firebaseio.com/users/" + $scope.user.uid  + "/name");

	 		nameRef.on("value", function(name) {
				if (! name.val()) {
					nameRef.set($scope.name);
				} else {
					$scope.name = name.val();
				}
				console.log(name.val());

				// Listen to messages
			 	var messageRef = new Firebase("https://jau.firebaseio.com/name/" + $scope.name  + "/messages");
				    // create an AngularFire reference to the data
			    var sync = $firebase(messageRef);
	    		// download the data into a local object
	    		var syncObject = sync.$asObject();

	    		syncObject.$bindTo($scope, "messages");

	   			$scope.$apply();
			});

		} else {
		// user is logged out
			$scope.loggedIn = false;
	 		$scope.user = {};
		}
	});

	$scope.sendJau = function() {

	 	var messageRef = new Firebase("https://jau.firebaseio.com/name/" + $scope.jauTo  + "/messages");
	 	messageRef.push($scope.name);
	}

	$scope.logout = function() {
		$scope.user = undefined;
		$scope.name = undefined;
		$scope.authClient.logout();
	}

	var authRef = new Firebase("https://jau.firebaseio.com/.info/authenticated");
	authRef.on("value", function(snap) {
		if (snap.val() === true) {
		console.log("authenticated");
		} else {
		console.log("not authenticated");
		}
	});


}]);
