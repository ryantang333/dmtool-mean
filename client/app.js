'use strict';

angular.module('dmtool', [
	"ngAnimate",
	"angular-jwt",
  "angular-storage",
	"ui.bootstrap",
	"ui.router",
	"ui.router.tabs",
	"ui.router.stateHelper"
])

.config(
	[
							"$stateProvider", "$urlRouterProvider", "jwtInterceptorProvider", "$httpProvider", "stateHelperProvider",
		function ( $stateProvider,   $urlRouterProvider,   jwtInterceptorProvider, 	 $httpProvider, 	stateHelperProvider) {
			$urlRouterProvider.otherwise("/");

			stateHelperProvider
				.state({
					name: "root",
					url: "/",
					data: {
						requiresLogin: false
					},
					views: {
						"header" : {
							templateUrl: 'navbar/navbar.html',
							controller: 'NavbarCtrl'
						},
						"content" : {
							templateUrl: 'login_and_reg/login.html',
							controller: 'LoginCtrl'
						}
					},
					children: [
						{
							name: "register",
					  	url: "/register",
					  	views: {
								"content@" : {
							    templateUrl: 'login_and_reg/register.html',
									controller: 'RegisterCtrl'
								}
							}
					  },
					  {
					  	name: "forgot_info",
					  	url: "/forgot_info",
					  	views: {
								"content@" : {
							    templateUrl: 'login_and_reg/forgot_info.html'
								}
							}
					  }
					]
				})
			  .state({
			  	name: "home",
			  	url: "/home",
			  	data: {
			  		requiresLogin: true
			  	},
			  	views: {
						"header@" : {
							templateUrl: 'navbar/navbar_internal.html',
							controller: 'NavbarCtrl'
						},
						"content@" : {
					    templateUrl: 'adventure_select/adventure_select.html'
						}
					},
					children: [
					  {
					  	name: "create_char",
					  	url: "/create_char",
					  	views: {
					  		"content@" : {
					  			templateUrl: 'new_adventure/character_create.html'
					  		}	
					  	}
					  },
					  {
					  	name: "roll_new_char",
					  	url: "/roll_new_char",
					  	views: {
					  		"content@" : {
					  			templateUrl: 'new_adventure/roll_new_char.html'
					  		}	
					  	}
					  },
						{
					  	name: "adventure_view",
					  	url: "/adventure_view",
					  	views: {
								"content@" : {
							    templateUrl: 'adventure_view/adventure_view.html',
							    controller: 'AdventureViewCtrl'
								}
							},
							params: {
					      autoActivateChild: 'home.adventure_view.dm.adventure'
					    },
					    data: {
					    	hide_navbar: true
					    },
					    children: [
					    	{
							  	name: "dm",
							  	url: "/dm",
							  	abstract: true,
							  	data: {
							  		requiresDM: true
							  	},
							  	children:[
							  		{
									  	name: "adventure",
									  	url: "/adventure",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/dm/adventure.html',
											    controller: "DMPageCtrl"
									  		}
									  	}
									  },
							  		{
									  	name: "bestiary",
									  	url: "/bestiary",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/dm/bestiary.html',
											    controller: "DMPageCtrl"
									  		}
									  	}
									  },
									  {
									  	name: "monster_info",
									  	url: "/monster_info",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/dm/monster_info.html',
											    controller: "DMPageCtrl"
									  		}
									  	}
									  },
							  		{
									  	name: "notes",
									  	url: "/notes",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/dm/notes.html',
											    controller: "DMPageCtrl"
									  		}
									  	}
									  },
									  {
									  	name: "note",
									  	url: "/note",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/dm/note.html',
											    controller: "DMPageCtrl"
									  		}
									  	}
									  },
									  {
									  	name: "treasury",
									  	url: "/treasury",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/dm/treasury.html',
											    controller: "DMPageCtrl"
									  		}
									  	}
									  }
							  	]
							  },
							  {
							  	name: "player",
							  	url: "/player",
							  	abstract: true,
							  	data: {
							  		requiresDM: false
							  	},
							  	children:[
										{
									  	name: "character_stats",
									  	url: "/character_stats",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/player/character_stats.html',
											    controller: "PlayerPageCtrl"
									  		}
									  	}
									  },
										{
							  	  	name: "cooldown_counter",
									  	url: "/cooldown_counter",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/player/cooldown_counter.html',
											    controller: 'PlayerPageCtrl'
									  		}
									  	}
									  },
									  {
							  	  	name: "spell_book",
									  	url: "/spell_book",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/player/spell_book.html',
											    controller: 'PlayerPageCtrl'
									  		}
									  	}
									  },
									  {
							  	  	name: "spell_info",
									  	url: "/spell_info",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/player/spell_info.html',
											    controller: 'PlayerPageCtrl'
									  		}
									  	}
									  },
									  {
							  	  	name: "notes",
									  	url: "/notes",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/player/notes.html',
											    controller: 'PlayerPageCtrl'
									  		}
									  	}
									  },
									  {
							  	  	name: "note",
									  	url: "/note",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/player/note.html',
											    controller: 'PlayerPageCtrl'
									  		}
									  	}
									  },
									  {
							  	  	name: "roleplay",
									  	url: "/roleplay",
									  	views: {
									  		"page@home.adventure_view" : {
											    templateUrl: 'adventure_view/pages/player/roleplay.html',
											    controller: 'PlayerPageCtrl'
									  		}
									  	}
									  }
							  	]
							  }
					    ]
					  }
					]
			  })
			  ;
		}
	]
)
.run(
	[
						 "$rootScope", "$state", "store", "jwtHelper", 
		function ($rootScope,   $state,		store, 	 jwtHelper) {

		  $rootScope.$on('$stateChangeStart', function(e, to) {
		    if (to.data && to.data.requiresLogin) {
		      if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
		        e.preventDefault();
		        $state.go('root');
		      }
		      if (to.params && to.params.autoActivateChild) {
		        e.preventDefault();
		        $state.go(to.params.autoActivateChild);
		      }
		    }
		    if (to.data && !to.data.requiresLogin) {
		    	if (store.get('jwt') && !jwtHelper.isTokenExpired(store.get('jwt'))) {
		        e.preventDefault();
		        $state.go('home');
		      }
		    }
		  });
		}
  ]
)

;