app.directive('time', ['anim', function(anim) {

    var link = function(scope) {
        scope.timeItems = [{
            value: 0,
            name: 'jours'
        }, {
            value: 0,
            name: 'heures'
        }, {
            value: 0,
            name: 'minutes'
        }, {
            value: 0,
            name: 'secondes'
        }];

        anim.start();
    };

    return {
        restrict: 'A',
        link: link,
        template: [
            '<div class="item" ng:repeat="item in timeItems">',
                '<div class="value">{{item.value}}</div>',
                '<div class="name">{{item.name}}</div>',
            '</div>'
        ].join('')
    };

}]);
