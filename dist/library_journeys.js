angular.module('libraryJourneys', ['libraryJourneys.Api']);

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

angular.module('libraryJourneys.Api').factory('ApiDeviceService', function(Config, $http) {

  var DeviceService = function(){};

  DeviceService.prototype.sendDeviceDetails = function(uuid, cordova_version, model, platform, version) {

    params = {
      "device": {
        "uuid": uuid,
        "cordova": cordova_version,
        "model": model,
        "platform": platform,
        "version": version
      }
    };

    return $http.post(Config.ApiUrl + '/app/devices', params).then(function(response) {
      return response.data;
    });

  };

  return new DeviceService();

});

angular.module('libraryJourneys.Api').factory('EventService', function(Config, $http) {

  var EventService = function(){};

  EventService.prototype.regionEvent = function (event_type, device_uuid, region) {

    params = {
      "region_event": {
        "event_type": event_type,
        "device": {
          "uuid": device_uuid,
          "timestamp": Date()
        },
        "region": region
      }
    };

    return $http.post(Config.ApiUrl + '/app/events/location/region_events', params).then(function(response) {
      return response.data;
    });

  };

  EventService.prototype.beaconEvent = function (device_uuid, beacon, region) {

    params = {
      "beacon_event": {
        "device": {
          "uuid": device_uuid,
          "timestamp": Date()
        },
        "beacon": beacon,
        "region": region
      }
    };

    return $http.post(Config.ApiUrl + '/app/events/location/beacon_events', params).then(function(response) {
      return response.data;
    })

  };

  return new EventService();

});
