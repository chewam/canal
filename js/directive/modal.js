app.directive('modal', [ 'data', '$rootScope', function(data, $rootScope) {

    var rejouer = function() {
        
       

        var randomEl = data.items[Math.floor((Math.random() * 30) + 1)];
        $rootScope.currentitemname = randomEl.name;
        $rootScope.currentitemimg = randomEl.img;
        //element.modal('show');
        // if (!item.flip) {
        //     item.flip = true;
        // }
    };

    return {
        restrict: 'A',

        template: [
        '<div class="modal fade" id="modalGift" tabindex="-1" role="dialog" aria-labelledby="ModalTittle" aria-hidden="true">',
              '<div class="modal-dialog">',
                '<div class="modal-content">',
                  '<div class="modal-header">',
                     '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
                    '<h4 class="modal-title" id="ModalTittle">Lot gagne</h4>',
                  '</div>',
                  '<div class="modal-body">',
                    '<div>',
                    '<span>Mon gros lot est le {{currentitemname}}</span>',
                    '</div>',
                    '<img src="{{currentitemimg}}" alt="{{currentitemname}}">',
                  '</div>',
                  '<div class="modal-footer">',
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>',
                    '<button type="button" class="btn btn-primary"   ng:click="rejouer()">Rejouer</button>',
                  '</div>',
                '</div>',
              '</div>',            
        '</div>'
        ].join(''),

        controller: function($scope) {
            $scope.rejouer = rejouer;
        },

        link: function(scope, elements) {
          
        }

    };

}]);
