angular.module('libraryJourneys', ['libraryJourneys.Api']);

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

  EventService.prototype.beaconEvents = function (device_uuid, beacons, region) {

    params = {
      "beacon_events": {
        "device": {
          "uuid": device_uuid,
          "timestamp": Date()
        },
        "beacons": beacons,
        "region": region
      }
    };

    return $http.post(Config.ApiUrl + '/app/events/location/beacon_events/multiple', params, { timeout: 1000 }).then(function(response) {
      return response.data;
    })

  };

  return new EventService();

});

angular.module('libraryJourneys.Api').factory('JourneyLogService', function(Config, $http) {

  var JourneyLogService = function(){};

  JourneyLogService.prototype.newLogEntry = function(text, image, device_uuid) {

    var params = {};

    if (text && image) {

      params = {
        "journey_log_entry": {
          "device": {
            "uuid": device_uuid,
            "timestamp": Date()
          },
          "post": {
            "content": text
          },
          "image": {
            "file": {
              "content": image
            }
          }
        }
      }

    } else if (text) {

      params = {
        "journey_log_entry": {
          "device": {
            "uuid": device_uuid,
            "timestamp": Date()
          },
          "post": {
            "content": text
          }
        }
      }

    } else if (image) {

      params = {
        "journey_log_entry": {
          "device": {
            "uuid": device_uuid,
            "timestamp": Date()
          },
          "image": {
            "file": {
              "content": image
            }
          }
        }
      }

    }

    return $http.post(Config.ApiUrl + '/app/journey_log/entries', params).then(function(response) {
      return response.data;
    })

  };

  JourneyLogService.prototype.allLogEntries = function() {

    return $http.get(Config.ApiUrl + '/app/journey_log/entries').then(function(response) {
      return response.data;
    })

  };

  return new JourneyLogService();

});
