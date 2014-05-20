var app = angular.module('game', []);

app.constant('gameConfig', {
    date: '05/30/2014'
});

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

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

    return {
        getTime: function() {

            var d1 = new Date(),
                d2 = new Date(gameConfig.date),
                diff = ((d2.getTime() - d1.getTime())/1000),
                days = parseInt(diff/(24*3600)),
                hours = parseInt( (diff - (days*24*3600))/3600 ),
                minutes = parseInt( (diff - (days*24*3600) - (hours*3600)) /60 );
                secondes = parseInt( (diff - (days*24*3600) - (hours*3600) - (minutes*60)) );


            return {
                days: days,
                hours: hours,
                minutes: minutes,
                secondes: secondes
            };
        }
    };

}]);

app.directive('time', ['timeManager', function(timeManager) {

    var controller = function($scope) {
        var time = timeManager.getTime();

        $scope.days = time.days;
        $scope.hours = time.hours;
        $scope.minutes = time.minutes;
        $scope.secondes = time.secondes;
       
        requestAnimFrame(controller);
    };

    return {
        restrict: 'A',
        controller: controller,
        template: [
            '<div>',
                '<span>days: {{days}}, </span>',
                '<span>hours: {{hours}}, </span>',
                '<span>minutes: {{minutes}}, </span>',
                '<span>secondes: {{secondes}}</span>',
            '</div>'
        ].join('')
    };

}]);
