var app = angular.module('game', ['ngRoute']);

app.run(function ($rootScope, authManager, $route, $location) {

    $rootScope.$on('$routeChangeError', function() {
        $location.path('/');
    });

});
