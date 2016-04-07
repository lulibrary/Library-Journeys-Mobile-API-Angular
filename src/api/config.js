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
