app.service('store', ['data', function(data) {

    var storeId = 'canal-store';

    var getItems = function() {
        var data = localStorage.getItem(storeId);

        return JSON.parse(data || '[]');
    };

    var setItems = function(items) {
        var data = JSON.stringify(items);

        localStorage.setItem(storeId, data);
    };

    var getDate = function() {
        var items, date = new Date(),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }

        if (month < 10) {
            month = '0' + month;
        }

        return [day, month, year].join('/');
    };

    return {

        get: function(index) {
            var items = getItems();

            return items[index];
        },

        set: function(index, value) {
            var items = getItems();

            items[index] = value;
            setItems(items);
        },

        getData: function() {
            var date = getDate();

            return data[date];
        }

    };

    // var load = function() {
    //     var date = getDate(),
    //         items = data[date];

    //     if (items) {
    //         localStorage.setItem(date, JSON.stringify(items));
    //     } else {
    //         alert('cannot load data!');
    //     }

    //     return items;
    // };

    // var get = function() {
    //     var date = getDate();
    //         items = localStorage.getItem(date);

    //     if (!items) {
    //         items = load();
    //     }

    //     return JSON.parse(items);
    // };

    // return {
    //     get: get,
    //     load: load
    // };

}]);
