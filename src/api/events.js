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
