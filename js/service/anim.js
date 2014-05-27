app.service('anim', ['timeManager', '$rootScope', function(timeManager, $rootScope) {

    window.requestAnimFrame = (function() {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var mysec;

    var anim = function() {
        var time = timeManager.getTime();

        requestAnimFrame(anim);
        if (!$rootScope.$$phase && (!(mysec instanceof Date) || new Date().getSeconds() != mysec.getSeconds())) {
            mysec = new Date();
            $rootScope.$apply(function() {
                
                $rootScope.timeItems[0].value = time.days;
                $rootScope.timeItems[1].value = time.hours;
                $rootScope.timeItems[2].value = time.minutes;
                $rootScope.timeItems[3].value = time.seconds;
            });

        }
    };

    return {start: anim};

}]);
