app.controller('modalCtrl', [ '$rootScope', '$modal', '$log', function($rootScope, $modal, $log) { 
        $rootScope.open = function (size) {

          var modalInstance = $modal.open({
            templateUrl: 'modalItem.html',
            controller: modal,
            size: size,
            resolve: {
              currentItemImg: function () {
                return $rootScope.currentItemImg;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            $rootScope.selected = selectedItem;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        };
}]);
/*
app.controller('modalInstance', [ '$rootScope', '$modal', '$log', function($rootScope, $modal, $log) { 
          $scope.items = items;
          $scope.selected = {
            item: $scope.items[0]
          };

          $scope.accepter = function () {
            $modalInstance.close($scope.selected.item);
          };

          $scope.rejouer = function () {
            $modalInstance.dismiss('rejouer');
          };
}]);

*/


app.directive('modal', [ 'data', '$rootScope', function(data, $rootScope) {

    var rejouer = function() { //needs to return the current element in the grid
        console.debug('rejouer');
       

        //var randomEl = data.items[Math.floor((Math.random() * 30) + 1)];
       // $rootScope.currentitemname = randomEl.name;
        //$rootScope.currentitemimg = randomEl.img;
        //element.modal('show');
        // if (!item.flip) {
        //     item.flip = true;
        // }
    };

    var accepter = function() { //remove the current from the array
        // myarray.splice(myarray.indexOf($rootScope.currentitemname), 1);
 console.debug('accepter');
    };

    return {
        restrict: 'A',

        template: [
        '<div ng-controller="modalCtrl">',
                '<script type="text/ng-template" id="modalItem.html">',
                  '<div class="modal-body mine">',
                    '<img class="center-block imgsize" src="{{currentItemImg}}" alt="{{currentItemName}}">',
                  '</div>',
                  '<div class="modal-footer">',
                  '<button class="btn btn-default btn-lg btn-xllg pull-left"  data-dismiss="modal" ng:click="rejouer()">REJOUER</button>',
                  '<button class="btn btn-lg btn-xllg btn-primary" data-dismiss="modal" ng:click="accepter()">ACCEPTER</button>',
                  '</div>',
                       
        '</div>'
        ].join(''),
       

        controller: function($scope) {
            $scope.rejouer = rejouer;
            $scope.accepter = accepter;
        },

        link: function(scope, elements) {
          
        }

    };

}]);
