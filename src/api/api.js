angular.module('libraryJourneys.Api', []);

angular.module('libraryJourneys.Api').factory('LibraryJourneysApi', function(ApiAuthService,
                                                                             Config,
                                                                             ContactService,
                                                                             ApiDeviceService,
                                                                             EventService) {

  var ApiWrapper = function(){};

  ApiWrapper.prototype.Auth = ApiAuthService;
  ApiWrapper.prototype.Config = Config;
  ApiWrapper.prototype.Contact = ContactService;
  ApiWrapper.prototype.Device = ApiDeviceService;
  ApiWrapper.prototype.Events = EventService;

  return new ApiWrapper();

});
