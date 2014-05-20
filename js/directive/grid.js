app.directive('grid', ['dataManager', 'data', function(dataManager, data) {

    var el,
        rowCount = 4,
        columnCount = 8;

    var onCellClick = function(item) {
        //console.log('onCellClick');
        item.flip = !item.flip;
        // if (!item.flip) {
        //     item.flip = true;
        // }
    };

    var backgroundImage = './img/braquo02-01.jpg';

    return {
        restrict: 'A',

        template: [
            '<div class="cell" ng:repeat="item in items" style="width:{{cellWidth}}%;" ng:click="onCellClick(item)">',
                '<div class="wrap" ng:class="{flip: item.flip}">',
                    '<div class="front" style="background-image: url({{backgroundImage}}); background-position: -{{item.x}}px -{{item.y}}px; background-size: {{imgWidth}}px {{imgHeight}}px;"></div>',
                    '<div class="back color{{$index + 1}}" >{{item.name}}</div>',
                '</div>',
            '</div>'
        ].join(''),

        controller: function($scope) {
            $scope.onCellClick = onCellClick;
            $scope.backgroundImage = backgroundImage;
        },

        link: function(scope, elements) {
            el = elements[0];
            var items, offset,
                ratio, img = new Image(),
                width = el.offsetWidth,
                height = el.offsetHeight,
                cellWidth = width / columnCount,
                cellHeight = height / rowCount;

            scope.cellWidth = cellWidth * 100 / width;
            scope.cellHeight = cellHeight * 100 / height;

            img.src = backgroundImage;

            img.onload = function() {
                scope.$apply(function() {
                    scope.imgWidth = width;
                    ratio = img.width / img.height;
                    scope.imgHeight = width / ratio;
                    items = data.items;
                    offset = (scope.imgHeight - height) / 2;

                    for (var i = 0; i < items.length; i++) {
                        items[i].x = i % columnCount * cellWidth;
                        items[i].y = Math.floor(i / columnCount) * cellHeight;
                        items[i].y += offset;
                    };

                    scope.items = items;
                });
            };
        }

    };

}]);
