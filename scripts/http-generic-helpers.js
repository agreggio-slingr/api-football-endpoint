////////////////////////////////////
// Public API - Generic Functions //
////////////////////////////////////

endpoint.get = function(url, httpOptions, callbackData, callbacks) {

    callbacks = JSON.parse('{\n' +
        '  "record": {\n' +
        '    "dataObj": {\n' +
        '      "id": "5506fc44c2eee3b1a702694d",\n' +
        '      "version": 69,\n' +
        '      "label": "Martin Smith",\n' +
        '      "entity": {\n' +
        '        "id": "5506fc3cc2eee3b1a7025c17",\n' +
        '        "name": "contacts"\n' +
        '      },\n' +
        '      "_entity": {\n' +
        '        "id": "5506fc3cc2eee3b1a7025c17",\n' +
        '        "name": "contacts"\n' +
        '      },\n' +
        '      "company": {\n' +
        '        "id": "5506fc43c2eee3b1a7026944",\n' +
        '        "label": "ABC"\n' +
        '      },\n' +
        '      "firstName": "Martin",\n' +
        '      "lastName": "Smith",\n' +
        '      "email": "martin.smith@abcinc.com",\n' +
        '      "facebookAccount": "martin.smith",\n' +
        '      "webSite": "http://www.abcinc.com",\n' +
        '      "phoneNumbers": null,\n' +
        '      "ipAddress": "217.6.174.186",\n' +
        '      "addresses": [\n' +
        '        {\n' +
        '          "addressLine1": "Street 123",\n' +
        '          "addressLine2": null,\n' +
        '          "zipCode": "1234",\n' +
        '          "state": "CO",\n' +
        '          "additionalInformation": {\n' +
        '            "comment": null,\n' +
        '            "id": "63bda3564afd4e3f99016bf5",\n' +
        '            "label": "Additional Information"\n' +
        '          },\n' +
        '          "id": "5506fc43c2eee3b1a7026949",\n' +
        '          "label": "Colorado"\n' +
        '        },\n' +
        '        {\n' +
        '          "addressLine1": "Street 456",\n' +
        '          "addressLine2": null,\n' +
        '          "zipCode": "4567",\n' +
        '          "state": "NY",\n' +
        '          "additionalInformation": {\n' +
        '            "comment": null,\n' +
        '            "id": "63bda3564afd4e3f99016bf6",\n' +
        '            "label": "Additional Information"\n' +
        '          },\n' +
        '          "id": "5506fc43c2eee3b1a702694a",\n' +
        '          "label": "New York"\n' +
        '        }\n' +
        '      ],\n' +
        '      "socialSecNumber": "A32567402N",\n' +
        '      "token": "2.11111111111111111111134",\n' +
        '      "filetest": null\n' +
        '    },\n' +
        '    "prefix": "",\n' +
        '    "__class__": "Data"\n' +
        '  }\n' +
        '}');

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
