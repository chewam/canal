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
