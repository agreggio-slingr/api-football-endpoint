/**
 * Generates a random number.
 *
 * @param {text} bound, This is used to get a random number between 0 (inclusive) and the number passed in this argument, exclusive.
 */
step.get = function (url) {
    var data = endpoint.get(url) ;

    sys.logs.info('[Test] GET from: ' + data.toJSON());

    sys.logs.info('[Test] GET from: ' + data);

    sys.logs.info('[Test] GET from: ' + data['text']);

    return {
        "response": data['text']
    };
};