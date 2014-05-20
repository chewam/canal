var app = angular.module('game', []);

app.constant('gameConfig', {
    date: '05/30/2014'
});

app.service('dataManager', ['$http', function($http) {
    
    return {
        getItems: function() {
            return $http({
                method: 'GET',
                responseType: 'json',
                url: './data/items.json',
                header: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }
    };

}]);

app.service('timeManager', ['gameConfig', function(gameConfig) {
    
    var getHours = function(d1, d2, days) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        var d = days * 24 * 3600 * 1000;

        console.log('days', d, t1, t2, t2 - t1);

        var h = t2 - t1 - d;

        return parseInt(h / (3600 * 1000));
    };

    var getDays = function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000));
    };

    var inWeeks = function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    };

    var inMonths = function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    };

    var inYears = function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    };

    return {
        getTime: function() {

            var d1 = new Date(),
                d2 = new Date(gameConfig.date),
                t1 = d1.getTime(),
                t2 = d2.getTime(),
                days = parseInt((t2-t1)/(24*3600*1000)),
                hours = parseInt( (t2-t1-(days*24*3600*1000)) / (60*1000) ),
                minutes = parseInt( (t2-t1-(days*24*3600*1000)-(hours*60*1000)) / 1000);



            // var d1 = new Date(),
            //     d2 = new Date('05/30/2014'),
            //     days = getDays(d1, d2),
            //     hours = getHours(d1, d2, days);

            return {
                days: days,
                hours: hours,
                minutes: minutes
            };
        }
    };

}]);

app.directive('time', ['timeManager', function(timeManager) {

    var controller = function($scope) {
        var time = timeManager.getTime();

        $scope.days = time.days;
        $scope.hours = time.hours;
    };

    return {
        restrict: 'A',
        controller: controller,
        template: [
            '<div>',
                '<span>days: {{days}}</span>',
                '<span>hours: {{hours}}</span>',
                '<span>minutes: {{minutes}}</span>',
            '</div>'
        ].join('')
    };

}]);
