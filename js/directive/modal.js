app.directive('modal', [ 'data', '$rootScope', 'store', function(data, $rootScope, store) {

    var rejouer = function() {
       $rootScope.CurrentCell.flip = false;
    };

    var accepter = function() { //remove the current from the array
        // myarray.splice(myarray.indexOf($rootScope.currentitemname), 1);
        console.debug('accepter');
    };

    return {
        restrict: 'A',

        template: [
        '<div class="modal fade" id="modalGift" tabindex="-1" role="dialog" aria-labelledby="ModalTittle" aria-hidden="true">',
              '<div class="modal-dialog">',
                '<div class="modal-content">',
                  '<div class="modal-body mine">',
                    '<img class="center-block imgsize" src="{{currentitemimg}}" alt="{{currentitemname}}">',
                  '</div>',
                  '<div class="modal-footer">',
                  '<button type="button" class="btn btn-default btn-lg btn-xllg pull-left"  data-dismiss="modal" ng:click="rejouer()">REJOUER</button>',
                  '<button type="button" class="btn btn-lg btn-xllg btn-primary" data-dismiss="modal" ng:click="accepter()">ACCEPTER</button>',
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
