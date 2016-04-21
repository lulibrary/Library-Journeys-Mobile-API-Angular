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

  return new JourneyLogService();

});
