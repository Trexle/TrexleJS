var request = require('superagent');

var liveUrl = 'https://core.trexle.com/api/v1';
var testUrl = 'https://core.trexle.com/api/v1';



var Trexle = function(options) {

  var generateRequest = function(req, fields, callback) {
    var field, field2;
    req.auth(options.key, '')
    for(field in fields) {
        if(typeof fields[field] === 'object') {
          for(field2 in fields[field]) {
            req.field(field+'['+field2+']', ''+fields[field][field2])
          }
        } else {
          req.field(field, ''+fields[field])
        }
      }

    req.end(function(err,res){
      if(res && !res.ok){
        err = new Error(res.body.error_description);
      };
      callback.call(this, err, res.text.response);
    });
  };


  this.createCard = function (fields, callback) {
    var req = request.post(options.url + '/tokens');
    generateRequest(req, fields, callback);
  };


  this.createCustomer = function (fields, callback) {
    var req = request.post(options.url + '/customers');
    generateRequest(req, fields, callback);
  };

  this.retrieveCustomer = function (token, callback) {
    var req = request.get(options.url + '/customers/' + token);
    generateRequest(req, {}, callback);
  };

  this.refundCharge = function (chargeId, fields, callback) {

    var req = request.post(options.url + '/charges/' + chargeId + '/refunds');
    generateRequest(req, fields, callback);
  };

  this.retrieveCharge = function (chargeId, callback) {

    var req = request.get(options.url + '/charges/' + chargeId);
    generateRequest(req, {}, callback);
  };

  this.createCharge = function (fields, callback) {
    var req = request.post(options.url + '/charges');
    generateRequest(req, fields, callback);
  };

  

  this.captureCharge = function (nonCapturedToken, callback) {
    var url = options.url + '/charges/' + nonCapturedToken + "/capture";
    console.log(url);
    var req = request.put(url);
    generateRequest(req, {}, callback);
  };


};

var setup = function (options) {
  options.url = liveUrl;
  if(!options.production) {
    options.url = testUrl;
  }
  var trexle = new Trexle(options);
  return trexle;
};


exports.setup = setup;
