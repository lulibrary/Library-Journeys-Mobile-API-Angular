angular.module('libraryJourneys.Api', []);

angular.module('libraryJourneys.Api').factory('LibraryJourneysApi', function(ApiAuthService,
                                                                             Config,
                                                                             ContactService,
                                                                             ApiDeviceService,
                                                                             EventService,
                                                                             JourneyLogService) {

  var ApiWrapper = function(){};

  ApiWrapper.prototype.Auth = ApiAuthService;
  ApiWrapper.prototype.Config = Config;
  ApiWrapper.prototype.Contact = ContactService;
  ApiWrapper.prototype.Device = ApiDeviceService;
  ApiWrapper.prototype.Events = EventService;
  ApiWrapper.prototype.JourneyLog = JourneyLogService;

  return new ApiWrapper();

});
