app.constant('gameConfig', {
    date: '06/22/2014 12:00'
});

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', {
        template: '<div class="login" login></div>'
    }).
    when('/game', {
        template: [
            '<div class="grid" grid></div>'
        ].join('')
    }).
    otherwise({
        redirectTo: '/'
    });

}]);
