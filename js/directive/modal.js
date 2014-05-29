app.directive('modal', [ 'data', '$rootScope', 'store', function(data, $rootScope, store) {

    var rejouer = function() {
       $rootScope.CurrentCell.flip = false;
    };

    var accepter = function() {
      store.set($rootScope.CurrentCell.index, $rootScope.CurrentItem.index);
      store.rmGift($rootScope.CurrentItem);
    };

    return {
        restrict: 'A',

        template: [
        '<div class="modal fade" id="modalGift" tabindex="-1" role="dialog" aria-labelledby="ModalTittle" aria-hidden="true">',
              '<div class="modal-dialog">',
                '<div class="modal-content">',
                  '<div class="modal-body mine">',
                    '<img class="center-block imgsize" src="{{CurrentImg}}">',
                  '</div>',
                  '<div class="modal-footer">',
                  '<button type="button" class="btn btn-link btn-lg btn-xllg pull-left btn-replay"  data-dismiss="modal" ng:click="rejouer()">6</button>',
                  '<button type="button" class="btn btn-lg btn-xllg btn-link btn-play" data-dismiss="modal" ng:click="accepter()">P</button>',
                  '</div>',
                '</div>',
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
