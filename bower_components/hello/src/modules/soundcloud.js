//
// SoundCloud
//
define(['../hello'],function(hello){


function formatUser(o){
	if(o.id){
		o.picture = o.avatar_url;
		o.thumbnail = o.avatar_url;
		o.name = o.username || o.full_name;
	}
}

// Paging
// http://developers.soundcloud.com/docs/api/reference#activities
function paging(res){
	if("next_href" in res){
		res['paging'] = {
			next : res["next_href"]
		};
	}
}

hello.init({
	soundcloud : {
		name : 'SoundCloud',

		oauth : {
			version : 2,
			auth : 'https://soundcloud.com/connect'
		},

		// AutoRefresh
		// Signin once token expires?
		autorefresh : false,

		// Alter the querystring
		querystring : function(qs){
			var token = qs.access_token;
			delete qs.access_token;
			qs.oauth_token = token;
			qs['_status_code_map[302]'] = 200;
		},
		// Request path translated
		base : 'https://api.soundcloud.com/',
		get : {
			'me' : 'me.json',

			// http://developers.soundcloud.com/docs/api/reference#me
			'me/friends' : 'me/followings.json',
			'me/followers' : 'me/followers.json',
			'me/following' : 'me/followings.json',

			// http://developers.soundcloud.com/docs/api/reference#activities

			'default' : function(p, callback){
				// include ".json at the end of each request"
				callback(p.path + '.json');
			}
		},
		// Response handlers
		wrap : {
			me : function(o){
				formatUser(o);
				return o;
			},
			"default" : function(o){
				if(o instanceof Array){
					o = {
						data : o
					};
					for(var i=0;i<o.data.length;i++){
						formatUser(o.data[i]);
					}
				}
				paging(o);
				return o;
			}
		}
	}
});

});