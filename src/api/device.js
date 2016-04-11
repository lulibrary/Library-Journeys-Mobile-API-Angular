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
