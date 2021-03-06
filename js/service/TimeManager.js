app.service('timeManager', ['gameConfig', function(gameConfig) {

    return {
        getTime: function() {

            var d1 = new Date(),
                d2 = new Date(gameConfig.date),
                diff = (((d2 - d1) > 0) ? ((d2.getTime() - d1.getTime())/1000) : 0),
                days = parseInt(diff/(24*3600)),
                hours = parseInt( (diff - (days*24*3600))/3600 ),
                minutes = parseInt( (diff - (days*24*3600) - (hours*3600)) /60 );
                seconds = parseInt( (diff - (days*24*3600) - (hours*3600) - (minutes*60)) );

            if (days < 10) days = '0' + days;
            if (hours < 10) hours = '0' + hours;
            if (minutes < 10) minutes = '0' + minutes;
            if (seconds < 10) seconds = '0' + seconds;

            return {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        }
    };

}]);
