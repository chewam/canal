
app.directive('grid', ['data', '$rootScope', '$modal', function(data, $rootScope, $modal) {

    var el,
        rowCount = 4,
        columnCount = 8;

    var onCellClick = function(item, test) {console.debug('click');
        item.flip = !item.flip;
        $rootScope.currentitemname = item.name;
        $rootScope.currentitemimg = item.img;
        $modal.open({
            template: [
                '<div ng-controller="modalCtrl">',
                        '<script type="text/ng-template" id="modalItem.html">',
                          '<div class="modal-body mine"><div>ggegerg</div>',
                            '<img class="center-block imgsize" src="{{currentItemImg}}" alt="{{currentItemName}}">',
                          '</div>',
                          '<div class="modal-footer">',
                          '<button class="btn btn-default btn-lg btn-xllg pull-left"  data-dismiss="modal" ng:click="rejouer()">REJOUER</button>',
                          '<button class="btn btn-lg btn-xllg btn-primary" data-dismiss="modal" ng:click="accepter()">ACCEPTER</button>',
                          '</div>',
                               
                '</div>'
                ].join(''),
            size: 'lg',
            
          });
        //$rootScope.fireEvent('modal.show');

        //var element = angular.element('#modalGift');
        //element.modal('show');
       
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
