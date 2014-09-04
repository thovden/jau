
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

	    				// Listen to friends
			 	var friendsRef = new Firebase("https://jau.firebaseio.com/name/" + $scope.name  + "/friends");
				    // create an AngularFire reference to the data
			    var friendsSync = $firebase(friendsRef);
	    		// download the data into a local object
	    		$scope.friends = friendsSync.$asArray();

	   			$scope.$apply();
			});

		} else {
		// user is logged out
			$scope.loggedIn = false;
	 		$scope.user = {};
	 		$scope.$apply();
		}
	});

	$scope.sendJau = function() {

	 	var messageRef = new Firebase("https://jau.firebaseio.com/name/" + $scope.jauTo  + "/messages");
	 	messageRef.push($scope.name);

	 	$scope.sending = true;
	 	setTimeout(function() {
	 		$scope.sending=false;
	 		$scope.$apply();
	 	}, 3000);

	 	var friendsRef = new Firebase("https://jau.firebaseio.com/name/" + $scope.name  + "/friends");
	 	var jauto = $scope.jauTo;
	 	var emptyMap = {}
	 	emptyMap[jauto] = true
	 	friendsRef.set(emptyMap);
	 	$scope.jauTo = "";
	}

	$scope.getJauStyle = function(index) {
		var styles = [
			"jau1 wow fadeInDown",
			"jau2 wow wobble",
			"jau3 wow pulse",
			"jau4 wow bounceInDown",
			"jau5 wow swing",
			"jau3 wow flipInX",
			"jau2 wow tada",
			"jau1 wow lightSpeedIn"
		];
		var style = styles[index % styles.length];
		// console.log("Style for index " + index + ": " + style);
		return style;

	}

	$scope.getFriendsStyle = function(index) {
		var styles = [
			"jau1",
			"jau2",
			"jau3",
			"jau4",
			"jau5",
		];
		var style = styles[index % styles.length];
		// console.log("Style for index " + index + ": " + style);
		return style;

	}

	// This is not kosher but needed a quick hack
	$scope.playJau = function() {
		// var audio = angular.element( document.querySelector( '#player' ) );
 		var audio = document.getElementById('player');
		
		audio.play();
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
