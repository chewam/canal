var app = angular.module('game', ['ui.bootstrap']);

app.constant('gameConfig', {
    date: '06/22/2014 12:00'
});

// app.service('dataManager', ['$http', function($http) {
    
//     return {
//         getItems: function() {
//             return $http({
//                 method: 'GET',
//                 responseType: 'json',
//                 url: './data/items.json',
//                 header: {
//                     'Content-Type': 'application/json; charset=utf-8'
//                 }
//             });
//         }
//     };

// }]);

app.service('timeManager', ['gameConfig', function(gameConfig) {

    return {
        getTime: function() {

            var d1 = new Date(),
                d2 = new Date(gameConfig.date),
                diff = ((d2.getTime() - d1.getTime())/1000),
                days = parseInt(diff/(24*3600)),
                hours = parseInt( (diff - (days*24*3600))/3600 ),
                minutes = parseInt( (diff - (days*24*3600) - (hours*3600)) /60 );
                seconds = parseInt( (diff - (days*24*3600) - (hours*3600) - (minutes*60)) );


            return {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        }
    };

}]);

app.service('anim', ['timeManager', '$rootScope', function(timeManager, $rootScope) {

    window.requestAnimFrame = (function() {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var anim = function() {
        var time;

        requestAnimFrame(anim);

        if (!$rootScope.$$phase) {

            $rootScope.$apply(function() {
                time = timeManager.getTime();
                $rootScope.timeItems[0].value = time.days;
                $rootScope.timeItems[1].value = time.hours;
                $rootScope.timeItems[2].value = time.minutes;
                $rootScope.timeItems[3].value = time.seconds;
            });

        }
    };

    return {start: anim};

}]);

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
