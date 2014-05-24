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
