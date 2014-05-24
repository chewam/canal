app.directive('login', [function() {

    var template = [
        '<form role="form">',
            '<input type="password" class="form-control" id="login" placeholder="MOT DE PASSE...">',
        '</form>'
    ].join('');

    return {
        template: template
    };

}]);
