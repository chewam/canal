var app = angular.module('game', ['ngRoute']);

app.run(function ($rootScope, authManager, $route, $location, $interval) {

    $rootScope.$on('$routeChangeError', function() {
        $location.path('/');
    });
    var t = new Date();
    $interval(function() {
        var t1 = new Date();
        if (t.getHours() !== 0 && t1.getHours() === 0) {
            t = t1;
            location.reload();
        }
    }, 4000);
});
