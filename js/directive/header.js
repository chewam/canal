app.directive('header', ['store', function(store) {

    return {
        restrict: 'A',
        link: function(scope) {
            scope.title = store.getTitle();
        },
        template: '<h1>{{title}} - Challenge connexion</h1>'
    };

}]);
