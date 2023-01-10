////////////////////////////////////
// Public API - Generic Functions //
////////////////////////////////////

endpoint.get = function(url, httpOptions, callbackData, callbacks) {

    callbacks = stringToObject('{"record":{"json":"{\"id\":\"5506fc44c2eee3b1a702694d\",\"version\":65,\"label\":\"Martin Smith\",\"entity\":{\"id\":\"5506fc3cc2eee3b1a7025c17\",\"name\":\"contacts\"},\"_entity\":{\"id\":\"5506fc3cc2eee3b1a7025c17\",\"name\":\"contacts\"},\"company\":{\"id\":\"5506fc43c2eee3b1a7026944\",\"label\":\"ABC\"},\"firstName\":\"Martin\",\"lastName\":\"Smith\",\"email\":\"martin.smith@abcinc.com\",\"facebookAccount\":\"martin.smith\",\"webSite\":\"http://www.abcinc.com\",\"phoneNumbers\":null,\"ipAddress\":\"217.6.174.186\",\"addresses\":[{\"addressLine1\":\"Street 123\",\"addressLine2\":null,\"zipCode\":\"1234\",\"state\":\"CO\",\"additionalInformation\":{\"comment\":null,\"id\":\"63bd897c6a39a01462857885\",\"label\":\"Additional Information\"},\"id\":\"5506fc43c2eee3b1a7026949\",\"label\":\"Colorado\"},{\"addressLine1\":\"Street 456\",\"addressLine2\":null,\"zipCode\":\"4567\",\"state\":\"NY\",\"additionalInformation\":{\"comment\":null,\"id\":\"63bd897c6a39a01462857886\",\"label\":\"Additional Information\"},\"id\":\"5506fc43c2eee3b1a702694a\",\"label\":\"New York\"}],\"socialSecNumber\":\"A32567402N\",\"token\":\"2.11111111111111111111134\",\"filetest\":{\"id\":\"63bd9f69e1f14641ee5c5d3a\",\"name\":\"6203f1d980467a083cbb8ae4_slingr.svg\"}}","dataObj":{"id":"5506fc44c2eee3b1a702694d","version":65,"label":"Martin Smith","entity":{"id":"5506fc3cc2eee3b1a7025c17","name":"contacts"},"_entity":{"id":"5506fc3cc2eee3b1a7025c17","name":"contacts"},"company":{"id":"5506fc43c2eee3b1a7026944","label":"ABC"},"firstName":"Martin","lastName":"Smith","email":"martin.smith@abcinc.com","facebookAccount":"martin.smith","webSite":"http://www.abcinc.com","phoneNumbers":null,"ipAddress":"217.6.174.186","addresses":[{"addressLine1":"Street 123","addressLine2":null,"zipCode":"1234","state":"CO","additionalInformation":{"comment":null,"id":"63bd897c6a39a01462857885","label":"Additional Information"},"id":"5506fc43c2eee3b1a7026949","label":"Colorado"},{"addressLine1":"Street 456","addressLine2":null,"zipCode":"4567","state":"NY","additionalInformation":{"comment":null,"id":"63bd897c6a39a01462857886","label":"Additional Information"},"id":"5506fc43c2eee3b1a702694a","label":"New York"}],"socialSecNumber":"A32567402N","token":"2.11111111111111111111134","filetest":{"id":"63bd9f69e1f14641ee5c5d3a","name":"6203f1d980467a083cbb8ae4_slingr.svg"}},"prefix":"","__class__":"Data"}}');

    sys.logs.debug("callbackData "+ callbackData);
    sys.logs.debug("JSON callbackData "+ JSON.stringify(callbackData));
    sys.logs.debug("callbacks "+ callbacks);
    sys.logs.debug("JSON callbacks "+ JSON.stringify(callbacks));

    var options = checkHttpOptions(url, httpOptions);
    return endpoint._get(options, callbackData, callbacks);
};

endpoint.post = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._post(options, callbackData, callbacks);
};

endpoint.put = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._put(options, callbackData, callbacks);
};

endpoint.patch = function(url, httpOptions, callbackData, callbacks) {
    options = checkHttpOptions(url, httpOptions);
    return endpoint._patch(options, callbackData, callbacks);
};

endpoint.delete = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._delete(options, callbackData, callbacks);
};

endpoint.head = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._head(options, callbackData, callbacks);
};

endpoint.options = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return endpoint._options(options, callbackData, callbacks);
};

///////////////////////
//  Private helpers  //
///////////////////////

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contains the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);

var stringToObject = function (obj) {
    if (!!obj){
        var keyValue = obj.toString().split(',');
        var parseObj = {};
        for(var i = 0; i < keyValue.length; i++) {
            parseObj[keyValue[i].split('=')[0]] = keyValue[i].split('=')[1]
        }
        return parseObj;
    }
    return null;
};
