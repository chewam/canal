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
