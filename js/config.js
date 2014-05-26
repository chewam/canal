app.constant('gameConfig', {
    password: 'braquo',
    date: '06/22/2014 12:00'
});

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', {
        template: '<div class="login" login></div>'
    }).
    when('/game', {
        template: '<div class="grid" grid></div>',
        resolve: {
            isLogin: function($q, $timeout) {
                var rejection = $q.reject('NOT AUTHENTICATED!');
                // defer.reject('NOT AUTHENTICATED!');
                console.info('isLogin', arguments, rejection);
                // return false;
                // $location.path('/toto');
                return rejection;
            }
        }
    }).
    otherwise({
        redirectTo: '/'
    });

}]);
