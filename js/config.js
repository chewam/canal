app.constant('gameConfig', {
    password: 'braquo',
    date: '06/21/2014 18:00'
});

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', {
        template: '<div class="login" login></div>'
    }).
    when('/game', {
        template: '<div class="grid" grid></div>',
        resolve: {
            isLogin: function($q, $timeout, authManager) {
                var defer = $q.defer();
                $timeout(function() {
                    if (authManager.isLogin()) {
                        defer.resolve('AUTHENTICATED!');
                    } else {
                        defer.reject('NOT AUTHENTICATED!');
                    }
                }, 0);
                return defer.promise;
            }
        }
    }).
    otherwise({
        redirectTo: '/'
    });

}]);
