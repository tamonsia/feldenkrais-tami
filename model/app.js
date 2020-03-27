app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){$routeProvider.when('/home',{templateUrl:'/home.html',controller:"homeCtrl"}).when('/feldenkrais-sessions',{templateUrl:'/feldenkrais-sessions.html',controller:'fel-sessionsCtrl'}).when('/about',{templateUrl:'/about.html',controller:'aboutControler'}).when('/feldenkrais-method',{templateUrl:'/feldenkrais-method.html',controller:'MainControler'}).otherwise({redirectTo:'/home'});$locationProvider.html5Mode(true).hashPrefix('!');}]);app.factory('isIos',[function(){return(navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?true:false);}]);app.factory('enlargeFeldenkraisMethodArea',['$rootScope','$timeout',function($rootScope,$timeout){$rootScope.enlargeFeldenkraisMethod=false;return function(){$timeout(function(){$rootScope.enlargeFeldenkraisMethod=true;},500);$timeout(function(){$rootScope.enlargeFeldenkraisMethod=false;},2000);};}]);app.factory('EnlargeArea',['$rootScope','$timeout',function($rootScope,$timeout){var goToByScroll=function(id){if($(window).width()<1170){return $('html,body').animate({scrollTop:$("#"+id).offset().top-20},'slow').promise();}return null;};var checkArray={};return function(variable,id,dest){$rootScope[variable]=false;$timeout(function(){var res=goToByScroll(id);if(res!=null){res.then(function(){$timeout(function(){$rootScope.$apply($rootScope[variable]=true);},100);});}else{$rootScope[variable]=true;}},dest==window.location.hash?100:1000);if(checkArray[variable]!=0){$rootScope.$on('$routeChangeSuccess',function(event,toState,toParams,fromState,fromParams){if(dest!=window.location.hash){$rootScope[variable]=false;};});checkArray[variable]=0;}};}]);app.factory('addResizeEvent',['$rootScope',function($rootScope){return function(func){var oldResize=window.onresize;window.onresize=function(){if(typeof oldResize==='function'){oldResize();};if(typeof func==='function'){var promise=new Promise(function(resolve,reject){try{func();resolve();}catch(e){reject(e);}});promise.then(function(result){},function(err){console.error(err);});};}};}]);app.factory('isLargeWindow',[function(){return function(func){return $(window).width()>=992;}}]);