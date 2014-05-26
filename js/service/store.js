app.service('store', ['data', function(data) {

    var storeGridId = 'canal-store-grid';
    var storeGiftId = 'canal-store-gift';
    var lastDate;

    var getGiftArray = function() {
        var date = getDate(),
        gifts = localStorage.getItem(storeGiftId+date);
        return JSON.parse((gifts === 'undefined') ? '[]' : gifts);
    };

    var setGiftArray = function(items) {
        var date = getDate();
        //all = JSON.parse(localStorage.getItem(storeGiftId+date) || '[]');

        //all[date] = items;
        localStorage.setItem(storeGiftId+date, JSON.stringify(items));
    };

    var getItems = function() {
        var date = getDate(),
        data = localStorage.getItem(storeGridId+date);
        
        return JSON.parse(data || '[]');
    };

    var setItems = function(items) {
        var date = getDate(),
        data = JSON.stringify(items);

        localStorage.setItem(storeGridId+date, data);
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

    var checkIsDoInit = function(data){
        var date = getDate();
        if (lastDate != date) {
            lastDate = date;
            setGiftArray(data[date]);
            return true;
        } else
            return false;
        
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

        needRefresh: function() {
            return checkIsDoInit(data);
        },

        getGift: function() {
            this.needRefresh();
            return getGiftArray();
        },

        getAllGift: function() {
            var date = getDate(),
            items = [];
            if (data[date])
                items = data[date].items;
            return items;
        },

        rmGift: function(gift) {
            var gifts = getGiftArray();
            for (var i = 0, len = gifts.items.length; i < len; i++) {
                if (gifts.items[i] && (gifts.items[i].name == gift.name)){
                     gifts.items.splice(i, 1);
                     break;
                }
                   
            }
            setGiftArray(gifts);
        },

        getTitle: function() {
            var date = getDate(),
            label;
            if (data[date])
                label = data[date].label;
            return label;
        },

        getBackGroundImg: function() {
            var date = getDate(),
            img = 'img/braquo.jpg';
            if (data[date])
                img = data[date].img;
            return img;
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
