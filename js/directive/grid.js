app.directive('grid', ['$rootScope', 'store', function($rootScope, store) {

    var el,
        rowCount = 4,
        columnCount = 8;

    var getRandomItem = function() {
        var data = store.getGift(),
            items = data.items,
            index = 0,
            item = null;

        if (items.length > 1)
                index = Math.round(Math.random() * (items.length - 1)) + 1;
            item = items[index];
        if (item)
            item.index = index;
        return item;
    };

    var onCellClick = function(cell) {
        if (cell.flip)
            return false;
        var item = getRandomItem();
        if (!item)
            return false;
        cell.flip = !cell.flip;
        $rootScope.CurrentCell = cell;
        $rootScope.CurrentItem = item;
        $rootScope.CurrentImg = item.img;
        cell.img = item.img;
        var element = angular.element('#modalGift');
        element.modal('show');
    };

    return {
        restrict: 'A',

        template: [
            '<div class="cell" ng:repeat="item in items" style="width:{{cellWidth}}%;" ng:click="onCellClick(item)">',
                '<div class="wrap" ng:class="{flip: item.flip}">',
                    '<div class="front" style="background-image: url({{backgroundImage}}); background-position: -{{item.x}}px -{{item.y}}px; background-size: {{imgWidth}}px {{imgHeight}}px;"></div>',
                    '<div class="back color{{$index + 1}}" style="background-image: url({{item.img}});">',
                        // '<div>{{item.name}}</div>',
                        // '<div class="glyphicon glyphicon-glass"></div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''),

        controller: function($scope) {
            $scope.onCellClick = onCellClick;
            $scope.backgroundImage = store.getBackGroundImg();
        },

        link: function(scope, elements) {
            el = elements[0];
            var offset, items,
                cells = [], item,
                ratio, img = new Image(),
                width = el.offsetWidth,
                height = el.offsetHeight,
                cellWidth = width / columnCount,
                cellHeight = height / rowCount;

            scope.cellWidth = cellWidth * 100 / width;
            scope.cellHeight = cellHeight * 100 / height;

            img.src = store.getBackGroundImg();

            img.onload = function() {
                scope.$apply(function() {
                    scope.imgWidth = width;
                    ratio = img.width / img.height;
                    scope.imgHeight = width / ratio;
                    offset = (scope.imgHeight - height) / 2,
                    items = store.getAllGift();
                    for (var i = 0; i < 32; i++) {
                        item = items[store.get(i)];
                        cells.push({
                            index: i,
                            flip: !!item,
                            img: (item || {}).img,
                            x: i % columnCount * cellWidth,
                            y: Math.floor(i / columnCount) * cellHeight + offset
                        });
                        // items[i].x = i % columnCount * cellWidth;
                        // items[i].y = Math.floor(i / columnCount) * cellHeight;
                        // items[i].y += offset;
                    };

                    scope.items = cells;
                });
            };
        }

    };

}]);
