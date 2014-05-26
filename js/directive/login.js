app.directive('login', ['authManager', function(authManager) {

    var isLogin = false;

    var template = [
        '<form role="form">',
            '<input type="password" ng:keypress="onKeyPress($event)" class="form-control" id="login" placeholder="MOT DE PASSE...">',
        '</form>'
    ].join('');

    var onKeyPress = function(e) {
        if (e.which === 13) {
            // e.preventDefault();
            authManager.login(e.target.value);
        }
    };

    var controller = function($scope) {
        $scope.onKeyPress = onKeyPress;
    };

    return {
        template: template,
        controller: controller
    };

}]);
