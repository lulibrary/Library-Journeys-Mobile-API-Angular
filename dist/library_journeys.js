angular.module('libraryJourneys', ['libraryJourneys.Api']);

angular.module('libraryJourneys.Api', []);

angular.module('libraryJourneys.Api').factory('LibraryJourneysApi', function(ApiAuthService, Config, ContactService) {

  var ApiWrapper = function(){};

  ApiWrapper.prototype.Auth = ApiAuthService;
  ApiWrapper.prototype.Config = Config;
  ApiWrapper.prototype.Contact = ContactService;

  return new ApiWrapper();

});

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

angular.module('libraryJourneys.Api').factory('Config', function() {

  var ConfigService = {};
  ConfigService.ApiUrl = undefined;
  var apiBaseUrl = undefined;
  var apiVersion = undefined;

  ConfigService.generateUrl = function() {
    ConfigService.ApiUrl = this.apiBaseUrl + this.apiVersion;
  };

  ConfigService.setApiBaseUrl = function(baseUrl) {
    this.apiBaseUrl = baseUrl;
    ConfigService.generateUrl();
  };

  ConfigService.setApiVersion = function(version) {
    this.apiVersion = version;
    ConfigService.generateUrl();
  };

  return ConfigService;

});

angular.module('libraryJourneys.Api').factory('ContactService', function(Config, $http) {

  var ContactService = function(){};

  ContactService.prototype.sendContactRequest = function(subject, query) {

    params = {
      "contact_request": {
        "subject": subject,
        "query": query
      }
    };

    return $http.post(Config.ApiUrl + '/app/contact_requests', params).then(function(response) {
      return response.data;
    });

  };

  return new ContactService();

});
