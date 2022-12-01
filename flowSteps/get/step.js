/**
 * Generates a random number.
 *
 * @param {text} bound, This is used to get a random number between 0 (inclusive) and the number passed in this argument, exclusive.
 */
step.get = function (url, httpOptions, callbackData, callbacks) {

    var data = endpoint.get(url, httpOptions, callbackData, callbacks) ;
    return {
        "get": data['text']
    };
};