//
// Hello Modules we require
//
define([
	'../../bower_components/hello/src/hello',
	'../../bower_components/hello/src/modules/facebook',
	'../../bower_components/hello/src/modules/windows',
	'../../bower_components/hello/src/modules/google'
], function(hello){

	// Register your domain with Facebook at  and add here
	var FACEBOOK_CLIENT_ID = {
		'adodson.com' : '160981280706879',
		'local.knarly.com' : '285836944766385'
	}[window.location.hostname];

	// Register your domain with Windows Live at http://manage.dev.live.com and add here
	var WINDOWS_CLIENT_ID = {
		'adodson.com' : '00000000400D8578',
		'local.knarly.com' : '000000004405FD31'
	}[window.location.hostname];

	//
	var GOOGLE_CLIENT_ID = '656984324806-sr0q9vq78tlna4hvhlmcgp2bs2ut8uj8.apps.googleusercontent.com';

	// To make it a little easier
	var CLIENT_IDS = {
		windows : WINDOWS_CLIENT_ID,
		google : GOOGLE_CLIENT_ID,
		facebook : FACEBOOK_CLIENT_ID
	};

	// initiate hello
	hello.init( CLIENT_IDS, {
		redirect_uri : '/hello.js/redirect.html'
	});

	// return the handler
	return hello;
});