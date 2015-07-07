var raven = require('raven');
var util = require('util');

var client = new raven.Client();

var logWrapper = function(origFunc, level) {
  return function(message) {
    origFunc.apply(origFunc, arguments);

    var params = Array.prototype.slice.call(arguments, 1);
    var fMessage = util.format.apply(this, arguments);

    client.captureMessage(fMessage, {
      'level': level,
      'sentry.interfaces.Message': {
        'message': message,
        'params': params
      }
    });
  };
};

console.error = logWrapper(console.error, 'error');
console.warn = logWrapper(console.warn, 'warning');
console.log = logWrapper(console.log, 'info');

module.exports = function(robot, scripts) {
};
