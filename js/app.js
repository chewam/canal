var app = angular.module('game', []);

app.constant('gameConfig', {
    date: '06/22/2014 12:00'
});

app.service('anim', ['timeManager', '$rootScope', function(timeManager, $rootScope) {
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    var an =  function(){
        requestAnimFrame(an);
        if (!$rootScope.$$phase){
            $rootScope.$apply(function(){
                var time = timeManager.getTime();

                $rootScope.days = time.days;
                $rootScope.hours = time.hours;
                $rootScope.minutes = time.minutes;
                $rootScope.secondes = time.secondes;
            });
        }
    }

    return { start: function() {
       an();
    }}
 }]);



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

app.directive('time', ['anim', function( anim) {

    var link = function($scope, $rootScope) {

        anim.start();
        //requestAnimFrame(controller);
    };

    return {
        restrict: 'A',
        link: link,
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
