app.service('authManager', ['$rootScope', 'gameConfig', function($rootScope, gameConfig) {

    isLogin = false;

    return {
        login: function(password) {
            if (gameConfig.password === password) {
                isLogin = true;
                document.location.hash = '#/game';
            }
        },
        isLogin: function() {
            return isLogin;
        }
    }

}]);
