var app = angular.module('game', []);

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

app.directive('grid', ['dataManager', function(dataManager) {

    console.log('grid', arguments);

    var el,
        rowCount = 4,
        columnCount = 8;
        // cellWidth = 150,
        // cellHeight = 150;

    var onCellClick = function(item) {
        item.flip = !item.flip;
        // if (!item.flip) {
        //     item.flip = true;
        // }
    };

    var backgroundImage = './img/braquo_400x400.png';

    return {
        restrict: 'A',

        template: [
            '<div class="cell" ng:repeat="item in items" style="width: {{cellWidth}}%;">{{$index + 1}}</div>'
            // '<div class="cell" ng:repeat="item in items" ng:click="onCellClick(item)">',
            //     '<div class="wrap" ng:class="{flip: item.flip}">',
            //         '<div class="front" style="background-image: url({{backgroundImage}}); background-position: -{{item.x}}px -{{item.y}}px;"></div>',
            //         '<div class="back color{{$index + 1}}" >{{item.name}}</div>',
            //     '</div>',
            // '</div>'
        ].join(''),

        controller: function($scope) {
            console.log('controller', arguments);

            // var width = window.innerWidth,
            //     height = window.innerHeight,
            //     area = width * height / 16,
            //     b = Math.sqrt(area * width / height),
            //     a = area / b;
            //     // side = Math.sqrt(width * height / 16);

            // $scope.onCellClick = onCellClick;
            // $scope.backgroundImage = backgroundImage;
            // $scope.columnWidth = b;
            // $scope.rowWidth = a;

            // $scope.cellWidth = cellWidth;
            // $scope.cellHeight = cellHeight;

            dataManager.getItems().success(function(items) {
                console.log('getItems', arguments);
                // for (var i = 0; i < items.length; i++) {
                //     items[i].x = i % columnCount * cellWidth; 
                //     items[i].y = Math.floor(i / rowCount) * cellHeight;
                // };
                $scope.items = items;
            });
        },

        link: function(scope, elements) {
            el = elements[0];
            console.log('link', arguments);
            var width = el.offsetWidth,
                height = el.offsetHeight,
                cellWidth = width / columnCount,
                cellHeight = height / rowCount;

            scope.cellWidth = cellWidth * 100 / width;
            scope.cellHeight = cellHeight * 100 / height;
        }

    };

}]);
