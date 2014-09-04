
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
	    		messageRef.on("child_added", function(snapshot) {
	    			$scope.playJau();
	    			setTimeout(function() {
	    				snapshot.ref().remove()
			 			}, 3000);
	    		});

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
		$scope.sendJauTo($scope.jauTo)
	 	$scope.jauTo = "";
	}

	$scope.sendJauTo = function(jauTo) {
		 var messageRef = new Firebase("https://jau.firebaseio.com/name/" + jauTo  + "/messages");
	 	messageRef.push($scope.name);

	 	$scope.sending = true;
	 	setTimeout(function() {
	 		$scope.sending=false;
	 	}, 3000);

	 	var friendsRef = new Firebase("https://jau.firebaseio.com/name/" + $scope.name  + "/friends");
	 	var jauto = jauTo;
	 	var emptyMap = {}
	 	emptyMap[jauto] = true
	 	friendsRef.update(emptyMap);

	}

	$scope.getJauStyle = function(index) {
		var styles = [
			"jau1 wow bounceInDown",
			"jau2 wow bounceInDown",
			"jau3 wow bounceInDown",
			"jau4 wow bounceInDown",
			"jau5 wow bounceInDown",
		];

		return styles[index % styles.length];
	}

	$scope.getFriendsStyle = function(index) {
		var styles = [
			"jau1 wow tada",
			"jau2 wow flash",
			"jau3 wow pulse",
			"jau4 wow rubberBand",
			"jau5 wow shake",
		];
		return styles[index % styles.length];
	}

	// This is not kosher but needed a quick hack
	$scope.playJau = function() {
		// var audio = angular.element( document.querySelector( '#player' ) );
 		var audio = document.getElementById('player');

		audio.play();
    }

    $scope.randomIcon = function() {
    	var icon = iconArray[Math.floor(iconArray.length * Math.random())];
    	console.log(icon);
    	return icon;
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

var iconArray = new Array(
 "fa fa-angellist " ,
"fa fa-area-chart " ,
"fa fa-at " ,
"fa fa-bell-slash " ,
"fa fa-bell-slash-o " ,
"fa fa-bicycle " ,
"fa fa-binoculars " ,
"fa fa-birthday-cake " ,
"fa fa-bus " ,
"fa fa-calculator " ,
"fa fa-cc " ,
"fa fa-cc-amex " ,
"fa fa-cc-discover " ,
"fa fa-cc-mastercard " ,
"fa fa-cc-paypal " ,
"fa fa-cc-stripe " ,
"fa fa-cc-visa " ,
"fa fa-copyright " ,
"fa fa-eyedropper " ,
"fa fa-futbol-o " ,
"fa fa-google-wallet " ,
"fa fa-ils " ,
"fa fa-ioxhost " ,
"fa fa-lastfm " ,
"fa fa-lastfm-square " ,
"fa fa-line-chart " ,
"fa fa-meanpath " ,
"fa fa-newspaper-o " ,
"fa fa-paint-brush " ,
"fa fa-paypal " ,
"fa fa-pie-chart " ,
"fa fa-plug " ,
"fa fa-shekel " ,
"fa fa-sheqel " ,
"fa fa-slideshare " ,
"fa fa-soccer-ball-o " ,
"fa fa-toggle-off " ,
"fa fa-toggle-on " ,
"fa fa-trash " ,
"fa fa-tty " ,
"fa fa-twitch " ,
"fa fa-wifi " ,
"fa fa-yelp " ,
"fa fa-adjust " ,
"fa fa-anchor " ,
"fa fa-archive " ,
"fa fa-area-chart " ,
"fa fa-arrows " ,
"fa fa-arrows-h " ,
"fa fa-arrows-v " ,
"fa fa-asterisk " ,
"fa fa-at " ,
"fa fa-automobile " ,
"fa fa-ban " ,
"fa fa-bank " ,
"fa fa-bar-chart " ,
"fa fa-bar-chart-o " ,
"fa fa-barcode " ,
"fa fa-bars " ,
"fa fa-beer " ,
"fa fa-bell " ,
"fa fa-bell-o " ,
"fa fa-bell-slash " ,
"fa fa-bell-slash-o " ,
"fa fa-bicycle " ,
"fa fa-binoculars " ,
"fa fa-birthday-cake " ,
"fa fa-bolt " ,
"fa fa-bomb " ,
"fa fa-book " ,
"fa fa-bookmark " ,
"fa fa-bookmark-o " ,
"fa fa-briefcase " ,
"fa fa-bug " ,
"fa fa-building " ,
"fa fa-building-o " ,
"fa fa-bullhorn " ,
"fa fa-bullseye " ,
"fa fa-bus " ,
"fa fa-cab " ,
"fa fa-calculator " ,
"fa fa-calendar " ,
"fa fa-calendar-o " ,
"fa fa-camera " ,
"fa fa-camera-retro " ,
"fa fa-car " ,
"fa fa-caret-square-o-down " ,
"fa fa-caret-square-o-left " ,
"fa fa-caret-square-o-right " ,
"fa fa-caret-square-o-up " ,
"fa fa-cc " ,
"fa fa-certificate " ,
"fa fa-check " ,
"fa fa-check-circle " ,
"fa fa-check-circle-o " ,
"fa fa-check-square " ,
"fa fa-check-square-o " ,
"fa fa-child " ,
"fa fa-circle " ,
"fa fa-circle-o " ,
"fa fa-circle-o-notch " ,
"fa fa-circle-thin " ,
"fa fa-clock-o " ,
"fa fa-close " ,
"fa fa-cloud " ,
"fa fa-cloud-download " ,
"fa fa-cloud-upload " ,
"fa fa-code " ,
"fa fa-code-fork " ,
"fa fa-coffee " ,
"fa fa-cog " ,
"fa fa-cogs " ,
"fa fa-comment " ,
"fa fa-comment-o " ,
"fa fa-comments " ,
"fa fa-comments-o " ,
"fa fa-compass " ,
"fa fa-copyright " ,
"fa fa-credit-card " ,
"fa fa-crop " ,
"fa fa-crosshairs " ,
"fa fa-cube " ,
"fa fa-cubes " ,
"fa fa-cutlery " ,
"fa fa-dashboard " ,
"fa fa-database " ,
"fa fa-desktop " ,
"fa fa-dot-circle-o " ,
"fa fa-download " ,
"fa fa-edit " ,
"fa fa-ellipsis-h " ,
"fa fa-ellipsis-v " ,
"fa fa-envelope " ,
"fa fa-envelope-o " ,
"fa fa-envelope-square " ,
"fa fa-eraser " ,
"fa fa-exchange " ,
"fa fa-exclamation " ,
"fa fa-exclamation-circle " ,
"fa fa-exclamation-triangle " ,
"fa fa-external-link " ,
"fa fa-external-link-square " ,
"fa fa-eye " ,
"fa fa-eye-slash " ,
"fa fa-eyedropper " ,
"fa fa-fax " ,
"fa fa-female " ,
"fa fa-fighter-jet " ,
"fa fa-file-archive-o " ,
"fa fa-file-audio-o " ,
"fa fa-file-code-o " ,
"fa fa-file-excel-o " ,
"fa fa-file-image-o " ,
"fa fa-file-movie-o " ,
"fa fa-file-pdf-o " ,
"fa fa-file-photo-o " ,
"fa fa-file-picture-o " ,
"fa fa-file-powerpoint-o " ,
"fa fa-file-sound-o " ,
"fa fa-file-video-o " ,
"fa fa-file-word-o " ,
"fa fa-file-zip-o " ,
"fa fa-film " ,
"fa fa-filter " ,
"fa fa-fire " ,
"fa fa-fire-extinguisher " ,
"fa fa-flag " ,
"fa fa-flag-checkered " ,
"fa fa-flag-o " ,
"fa fa-flash " ,
"fa fa-flask " ,
"fa fa-folder " ,
"fa fa-folder-o " ,
"fa fa-folder-open " ,
"fa fa-folder-open-o " ,
"fa fa-frown-o " ,
"fa fa-futbol-o " ,
"fa fa-gamepad " ,
"fa fa-gavel " ,
"fa fa-gear " ,
"fa fa-gears " ,
"fa fa-gift " ,
"fa fa-glass " ,
"fa fa-globe " ,
"fa fa-graduation-cap " ,
"fa fa-group " ,
"fa fa-hdd-o " ,
"fa fa-headphones " ,
"fa fa-heart " ,
"fa fa-heart-o " ,
"fa fa-history " ,
"fa fa-home " ,
"fa fa-image " ,
"fa fa-inbox " ,
"fa fa-info " ,
"fa fa-info-circle " ,
"fa fa-institution " ,
"fa fa-key " ,
"fa fa-keyboard-o " ,
"fa fa-language " ,
"fa fa-laptop " ,
"fa fa-leaf " ,
"fa fa-legal " ,
"fa fa-lemon-o " ,
"fa fa-level-down " ,
"fa fa-level-up " ,
"fa fa-life-bouy " ,
"fa fa-life-buoy " ,
"fa fa-life-ring " ,
"fa fa-life-saver " ,
"fa fa-lightbulb-o " ,
"fa fa-line-chart " ,
"fa fa-location-arrow " ,
"fa fa-lock " ,
"fa fa-magic " ,
"fa fa-magnet " ,
"fa fa-mail-forward " ,
"fa fa-mail-reply " ,
"fa fa-mail-reply-all " ,
"fa fa-male " ,
"fa fa-map-marker " ,
"fa fa-meh-o " ,
"fa fa-microphone " ,
"fa fa-microphone-slash " ,
"fa fa-minus " ,
"fa fa-minus-circle " ,
"fa fa-minus-square " ,
"fa fa-minus-square-o " ,
"fa fa-mobile " ,
"fa fa-mobile-phone " ,
"fa fa-money " ,
"fa fa-moon-o " ,
"fa fa-mortar-board " ,
"fa fa-music " ,
"fa fa-navicon " ,
"fa fa-newspaper-o " ,
"fa fa-paint-brush " ,
"fa fa-paper-plane " ,
"fa fa-paper-plane-o " ,
"fa fa-paw " ,
"fa fa-pencil " ,
"fa fa-pencil-square " ,
"fa fa-pencil-square-o " ,
"fa fa-phone " ,
"fa fa-phone-square " ,
"fa fa-photo " ,
"fa fa-picture-o " ,
"fa fa-pie-chart " ,
"fa fa-plane " ,
"fa fa-plug " ,
"fa fa-plus " ,
"fa fa-plus-circle " ,
"fa fa-plus-square " ,
"fa fa-plus-square-o " ,
"fa fa-power-off " ,
"fa fa-print " ,
"fa fa-puzzle-piece " ,
"fa fa-qrcode " ,
"fa fa-question " ,
"fa fa-question-circle " ,
"fa fa-quote-left " ,
"fa fa-quote-right " ,
"fa fa-random " ,
"fa fa-recycle " ,
"fa fa-refresh " ,
"fa fa-remove " ,
"fa fa-reorder " ,
"fa fa-reply " ,
"fa fa-reply-all " ,
"fa fa-retweet " ,
"fa fa-road " ,
"fa fa-rocket " ,
"fa fa-rss " ,
"fa fa-rss-square " ,
"fa fa-search " ,
"fa fa-search-minus " ,
"fa fa-search-plus " ,
"fa fa-send " ,
"fa fa-send-o " ,
"fa fa-share " ,
"fa fa-share-alt " ,
"fa fa-share-alt-square " ,
"fa fa-share-square " ,
"fa fa-share-square-o " ,
"fa fa-shield " ,
"fa fa-shopping-cart " ,
"fa fa-sign-in " ,
"fa fa-sign-out " ,
"fa fa-signal " ,
"fa fa-sitemap " ,
"fa fa-sliders " ,
"fa fa-smile-o " ,
"fa fa-soccer-ball-o " ,
"fa fa-sort " ,
"fa fa-sort-alpha-asc " ,
"fa fa-sort-alpha-desc " ,
"fa fa-sort-amount-asc " ,
"fa fa-sort-amount-desc " ,
"fa fa-sort-asc " ,
"fa fa-sort-desc " ,
"fa fa-sort-down " ,
"fa fa-sort-numeric-asc " ,
"fa fa-sort-numeric-desc " ,
"fa fa-sort-up " ,
"fa fa-space-shuttle " ,
"fa fa-spinner " ,
"fa fa-spoon " ,
"fa fa-square " ,
"fa fa-square-o " ,
"fa fa-star " ,
"fa fa-star-half " ,
"fa fa-star-half-empty " ,
"fa fa-star-half-full " ,
"fa fa-star-half-o " ,
"fa fa-star-o " ,
"fa fa-suitcase " ,
"fa fa-sun-o " ,
"fa fa-support " ,
"fa fa-tablet " ,
"fa fa-tachometer " ,
"fa fa-tag " ,
"fa fa-tags " ,
"fa fa-tasks " ,
"fa fa-taxi " ,
"fa fa-terminal " ,
"fa fa-thumb-tack " ,
"fa fa-thumbs-down " ,
"fa fa-thumbs-o-down " ,
"fa fa-thumbs-o-up " ,
"fa fa-thumbs-up " ,
"fa fa-ticket " ,
"fa fa-times " ,
"fa fa-times-circle " ,
"fa fa-times-circle-o " ,
"fa fa-tint " ,
"fa fa-toggle-down " ,
"fa fa-toggle-left " ,
"fa fa-toggle-off " ,
"fa fa-toggle-on " ,
"fa fa-toggle-right " ,
"fa fa-toggle-up " ,
"fa fa-trash " ,
"fa fa-trash-o " ,
"fa fa-tree " ,
"fa fa-trophy " ,
"fa fa-truck " ,
"fa fa-tty " ,
"fa fa-umbrella " ,
"fa fa-university " ,
"fa fa-unlock " ,
"fa fa-unlock-alt " ,
"fa fa-unsorted " ,
"fa fa-upload " ,
"fa fa-user " ,
"fa fa-users " ,
"fa fa-video-camera " ,
"fa fa-volume-down " ,
"fa fa-volume-off " ,
"fa fa-volume-up " ,
"fa fa-warning " ,
"fa fa-wheelchair " ,
"fa fa-wifi " ,
"fa fa-wrench " ,
"fa fa-file " ,
"fa fa-file-archive-o " ,
"fa fa-file-audio-o " ,
"fa fa-file-code-o " ,
"fa fa-file-excel-o " ,
"fa fa-file-image-o " ,
"fa fa-file-movie-o " ,
"fa fa-file-o " ,
"fa fa-file-pdf-o " ,
"fa fa-file-photo-o " ,
"fa fa-file-picture-o " ,
"fa fa-file-powerpoint-o " ,
"fa fa-file-sound-o " ,
"fa fa-file-text " ,
"fa fa-file-text-o " ,
"fa fa-file-video-o " ,
"fa fa-file-word-o " ,
"fa fa-file-zip-o " ,
"fa fa-circle-o-notch " ,
"fa fa-cog " ,
"fa fa-gear " ,
"fa fa-refresh " ,
"fa fa-spinner " ,
"fa fa-check-square " ,
"fa fa-check-square-o " ,
"fa fa-circle " ,
"fa fa-circle-o " ,
"fa fa-dot-circle-o " ,
"fa fa-minus-square " ,
"fa fa-minus-square-o " ,
"fa fa-plus-square " ,
"fa fa-plus-square-o " ,
"fa fa-square " ,
"fa fa-square-o " ,
"fa fa-cc-amex " ,
"fa fa-cc-discover " ,
"fa fa-cc-mastercard " ,
"fa fa-cc-paypal " ,
"fa fa-cc-stripe " ,
"fa fa-cc-visa " ,
"fa fa-credit-card " ,
"fa fa-google-wallet " ,
"fa fa-paypal " ,
"fa fa-area-chart " ,
"fa fa-bar-chart " ,
"fa fa-bar-chart-o " ,
"fa fa-line-chart " ,
"fa fa-pie-chart " ,
"fa fa-bitcoin " ,
"fa fa-btc " ,
"fa fa-cny " ,
"fa fa-dollar " ,
"fa fa-eur " ,
"fa fa-euro " ,
"fa fa-gbp " ,
"fa fa-ils " ,
"fa fa-inr " ,
"fa fa-jpy " ,
"fa fa-krw " ,
"fa fa-money " ,
"fa fa-rmb " ,
"fa fa-rouble " ,
"fa fa-rub " ,
"fa fa-ruble " ,
"fa fa-rupee " ,
"fa fa-shekel " ,
"fa fa-sheqel " ,
"fa fa-try " ,
"fa fa-turkish-lira " ,
"fa fa-usd " ,
"fa fa-won " ,
"fa fa-yen " ,
"fa fa-align-center " ,
"fa fa-align-justify " ,
"fa fa-align-left " ,
"fa fa-align-right " ,
"fa fa-bold " ,
"fa fa-chain " ,
"fa fa-chain-broken " ,
"fa fa-clipboard " ,
"fa fa-columns " ,
"fa fa-copy " ,
"fa fa-cut " ,
"fa fa-dedent " ,
"fa fa-eraser " ,
"fa fa-file " ,
"fa fa-file-o " ,
"fa fa-file-text " ,
"fa fa-file-text-o " ,
"fa fa-files-o " ,
"fa fa-floppy-o " ,
"fa fa-font " ,
"fa fa-header " ,
"fa fa-indent " ,
"fa fa-italic " ,
"fa fa-link " ,
"fa fa-list " ,
"fa fa-list-alt " ,
"fa fa-list-ol " ,
"fa fa-list-ul " ,
"fa fa-outdent " ,
"fa fa-paperclip " ,
"fa fa-paragraph " ,
"fa fa-paste " ,
"fa fa-repeat " ,
"fa fa-rotate-left " ,
"fa fa-rotate-right " ,
"fa fa-save " ,
"fa fa-scissors " ,
"fa fa-strikethrough " ,
"fa fa-subscript " ,
"fa fa-superscript " ,
"fa fa-table " ,
"fa fa-text-height " ,
"fa fa-text-width " ,
"fa fa-th " ,
"fa fa-th-large " ,
"fa fa-th-list " ,
"fa fa-underline " ,
"fa fa-undo " ,
"fa fa-unlink " ,
"fa fa-angle-double-down " ,
"fa fa-angle-double-left " ,
"fa fa-angle-double-right " ,
"fa fa-angle-double-up " ,
"fa fa-angle-down " ,
"fa fa-angle-left " ,
"fa fa-angle-right " ,
"fa fa-angle-up " ,
"fa fa-arrow-circle-down " ,
"fa fa-arrow-circle-left " ,
"fa fa-arrow-circle-o-down " ,
"fa fa-arrow-circle-o-left " ,
"fa fa-arrow-circle-o-right " ,
"fa fa-arrow-circle-o-up " ,
"fa fa-arrow-circle-right " ,
"fa fa-arrow-circle-up " ,
"fa fa-arrow-down " ,
"fa fa-arrow-left " ,
"fa fa-arrow-right " ,
"fa fa-arrow-up " ,
"fa fa-arrows " ,
"fa fa-arrows-alt " ,
"fa fa-arrows-h " ,
"fa fa-arrows-v " ,
"fa fa-caret-down " ,
"fa fa-caret-left " ,
"fa fa-caret-right " ,
"fa fa-caret-square-o-down " ,
"fa fa-caret-square-o-left " ,
"fa fa-caret-square-o-right " ,
"fa fa-caret-square-o-up " ,
"fa fa-caret-up " ,
"fa fa-chevron-circle-down " ,
"fa fa-chevron-circle-left " ,
"fa fa-chevron-circle-right " ,
"fa fa-chevron-circle-up " ,
"fa fa-chevron-down " ,
"fa fa-chevron-left " ,
"fa fa-chevron-right " ,
"fa fa-chevron-up " ,
"fa fa-hand-o-down " ,
"fa fa-hand-o-left " ,
"fa fa-hand-o-right " ,
"fa fa-hand-o-up " ,
"fa fa-long-arrow-down " ,
"fa fa-long-arrow-left " ,
"fa fa-long-arrow-right " ,
"fa fa-long-arrow-up " ,
"fa fa-toggle-down " ,
"fa fa-toggle-left " ,
"fa fa-toggle-right " ,
"fa fa-toggle-up " ,
"fa fa-arrows-alt " ,
"fa fa-backward " ,
"fa fa-compress " ,
"fa fa-eject " ,
"fa fa-expand " ,
"fa fa-fast-backward " ,
"fa fa-fast-forward " ,
"fa fa-forward " ,
"fa fa-pause " ,
"fa fa-play " ,
"fa fa-play-circle " ,
"fa fa-play-circle-o " ,
"fa fa-step-backward " ,
"fa fa-step-forward " ,
"fa fa-stop " ,
"fa fa-youtube-play " ,
"fa Warning! " ,
"fa fa-adn " ,
"fa fa-android " ,
"fa fa-angellist " ,
"fa fa-apple " ,
"fa fa-behance " ,
"fa fa-behance-square " ,
"fa fa-bitbucket " ,
"fa fa-bitbucket-square " ,
"fa fa-bitcoin " ,
"fa fa-btc " ,
"fa fa-cc-amex " ,
"fa fa-cc-discover " ,
"fa fa-cc-mastercard " ,
"fa fa-cc-paypal " ,
"fa fa-cc-stripe " ,
"fa fa-cc-visa " ,
"fa fa-codepen " ,
"fa fa-css3 " ,
"fa fa-delicious " ,
"fa fa-deviantart " ,
"fa fa-digg " ,
"fa fa-dribbble " ,
"fa fa-dropbox " ,
"fa fa-drupal " ,
"fa fa-empire " ,
"fa fa-facebook " ,
"fa fa-facebook-square " ,
"fa fa-flickr " ,
"fa fa-foursquare " ,
"fa fa-ge " ,
"fa fa-git " ,
"fa fa-git-square " ,
"fa fa-github " ,
"fa fa-github-alt " ,
"fa fa-github-square " ,
"fa fa-gittip " ,
"fa fa-google " ,
"fa fa-google-plus " ,
"fa fa-google-plus-square " ,
"fa fa-google-wallet " ,
"fa fa-hacker-news " ,
"fa fa-html5 " ,
"fa fa-instagram " ,
"fa fa-ioxhost " ,
"fa fa-joomla " ,
"fa fa-jsfiddle " ,
"fa fa-lastfm " ,
"fa fa-lastfm-square " ,
"fa fa-linkedin " ,
"fa fa-linkedin-square " ,
"fa fa-linux " ,
"fa fa-maxcdn " ,
"fa fa-meanpath " ,
"fa fa-openid " ,
"fa fa-pagelines " ,
"fa fa-paypal " ,
"fa fa-pied-piper " ,
"fa fa-pied-piper-alt " ,
"fa fa-pinterest " ,
"fa fa-pinterest-square " ,
"fa fa-qq " ,
"fa fa-ra " ,
"fa fa-rebel " ,
"fa fa-reddit " ,
"fa fa-reddit-square " ,
"fa fa-renren " ,
"fa fa-share-alt " ,
"fa fa-share-alt-square " ,
"fa fa-skype " ,
"fa fa-slack " ,
"fa fa-slideshare " ,
"fa fa-soundcloud " ,
"fa fa-spotify " ,
"fa fa-stack-exchange " ,
"fa fa-stack-overflow " ,
"fa fa-steam " ,
"fa fa-steam-square " ,
"fa fa-stumbleupon " ,
"fa fa-stumbleupon-circle " ,
"fa fa-tencent-weibo " ,
"fa fa-trello " ,
"fa fa-tumblr " ,
"fa fa-tumblr-square " ,
"fa fa-twitch " ,
"fa fa-twitter " ,
"fa fa-twitter-square " ,
"fa fa-vimeo-square " ,
"fa fa-vine " ,
"fa fa-vk " ,
"fa fa-wechat " ,
"fa fa-weibo " ,
"fa fa-weixin " ,
"fa fa-windows " ,
"fa fa-wordpress " ,
"fa fa-xing " ,
"fa fa-xing-square " ,
"fa fa-yahoo " ,
"fa fa-yelp " ,
"fa fa-youtube " ,
"fa fa-youtube-play " ,
"fa fa-youtube-square " ,
"fa fa-ambulance " ,
"fa fa-h-square " ,
"fa fa-hospital-o " ,
"fa fa-medkit " ,
"fa fa-plus-square " ,
"fa fa-stethoscope " ,
"fa fa-user-md " ,
"fa fa-wheelchair " 
    );

