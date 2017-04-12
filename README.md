# Trexle.js - Node.js module for [Trexle](https://trexle.com)


Trexle.js is an node.js API client for [Trexle](https://trexle.com/) an online recurring subscription billing platform with support to 100+ payments gateways.    The module has wrapped all documented Trexle resources.


## Getting started

```
npm install trexlejs
```

## Methods

First instantiate trexlejs by passing in your api key 

```javascript
var Trexle = require('trexlejs');

var trexle = Trexle.setup({
  key: 'yourkey',
  production: false
});
// fields is an object, see the example for more info
trexle.createCard(fields, callback)
trexle.createCustomer(fields, callback)
trexle.refundCharge(chargeId, fields, callback)
trexle.retrieveCharge(chargeId, callback)
trexle.createCharge(fields, callback)
trexle.captureCharge(uncapturedChargeToken, callback)
```

## Example

This is the basic syntax of how to create a new charge, checkout the demos folder for the rest of the methods

```javascript
var Trexle = require('trexlejs');

var trexle = Trexle.setup({
  key: 'your-api-key',
  production: false
});

trexle.createCharge({
  amount: 400,
  description: 'test charge',
  email: 'john@trexle.com',
  ip_address: '66.249.79.118"',
  card: {
    number: '4242424242424242',
    expiry_month: 08,
    expiry_year: 2018,
    cvc: 123,
    name: 'John Milwood',
    address_line1: '423 Shoreline Park',
    address_city: 'Mountain View',
    address_postcode: 94043,
    address_state: 'CA',
    address_country: 'US'
  }  
}, function (response) {  
  console.log(response.body);
});
```

