app.directive('grid', ['store', function(store) {

    var el,
        rowCount = 4,
        columnCount = 8;

    var onCellClick = function(item) {
        item.flip = !item.flip;
        store.set(item.index, 7);
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
                    '<div class="back color{{$index + 1}}">',
                        '<div>{{item.name}}</div>',
                        '<div class="glyphicon glyphicon-glass"></div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''),

        controller: function($scope) {
            $scope.onCellClick = onCellClick;
            $scope.backgroundImage = backgroundImage;
        },

        link: function(scope, elements) {
            el = elements[0];
            var offset, items = [],
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
                    // items = items.get().items;
                    offset = (scope.imgHeight - height) / 2;

                    for (var i = 0; i < 32; i++) {
                        items.push({
                            index: i,
                            flip: !!store.get(i),
                            x: i % columnCount * cellWidth,
                            y: Math.floor(i / columnCount) * cellHeight + offset
                        });
                        // items[i].x = i % columnCount * cellWidth;
                        // items[i].y = Math.floor(i / columnCount) * cellHeight;
                        // items[i].y += offset;
                    };

                    scope.items = items;
                });
            };
        }

    };

}]);
