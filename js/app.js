var app = angular.module('game', ['ngRoute']);

app.run(function ($rootScope, authManager, $route, $location) {

    var onLocationChange = function(e, next, current) {
        var route = next.split('#')[1] || '/';

        console.log('$route', $route, $location);
        if (route !== '/' && !isLogin) {
            // e.preventDefault();
            // $route.current = 
            // $location.path('/toto');
            // document.location.hash = '/xxxx';
        }
    };

    $rootScope.$on("$locationChangeStart", onLocationChange);

    $rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
        console.error("$routeChangeStart", arguments, rejection);
    });

});
