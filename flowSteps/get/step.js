/**
 * Generates a random number.
 *
 * @param {text} bound, This is used to get a random number between 0 (inclusive) and the number passed in this argument, exclusive.
 */
step.get = function (url) {

    var data = endpoint.get(url) ;

    sys.logs.debug('[apifootball] GET from: ' + data.field('text').val());

    return {
        "response": data['text']
    };
};