angular.module('libraryJourneys.Api').factory('ApiAuthService', function(Config, $http) {

  var ApiAuthService = function(){};

  ApiAuthService.prototype.login = function(email, password) {

    params = {
      "participant": {
        "email": email,
        "password": password
      }
    };

    return $http.post(Config.ApiUrl + '/auth/participants/', params).then(function(response) {
      return response.data;
    });
  };

  return new ApiAuthService();

});
