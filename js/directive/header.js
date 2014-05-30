app.directive('header', ['store', function(store) {

    return {
        restrict: 'A',
        link: function(scope) {
            scope.title = store.getTitle();
        },//{{title}} - 
        template: 'challenge connexion'
    };

}]);
