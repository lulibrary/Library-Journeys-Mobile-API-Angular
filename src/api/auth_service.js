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

  ApiAuthService.prototype.signUp = function(email, password, password_confirmation) {

    params = {
      "participant": {
        "email": email,
        "password": password,
        "password_confirmation": password_confirmation
      }
    };

    return $http.post(Config.ApiUrl + '/app/participants/', params).then(function(response) {
      return response.data;
    });

  };
  
  ApiAuthService.prototype.forgotPassword = function(email) {
  	
	  params = {
		  "participant": {
			  "email": email
		  }
	  }
	  
	  return $http.post(Config.ApiUrl + '/auth/participants/password', params).then(function(response) {
		  return response.data;
	  });
	
  };

  return new ApiAuthService();

});
