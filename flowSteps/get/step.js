/**
 * Generates a random number.
 *
 * @param {text} bound, This is used to get a random number between 0 (inclusive) and the number passed in this argument, exclusive.
 */
step.get = function (url) {

    var data = endpoint.get(url) ;

    sys.logs.info('[apifootball] GET from: ' + url);

    sys.logs.info('[apifootball] GET from: ' + data);

    sys.logs.info('[apifootball] GET from: ' + data.toJson());

    sys.logs.info('[apifootball] GET from: ' + data['text']);

    sys.logs.info('[apifootball] GET from: ' + data.field('text').val());

    sys.logs.info('[apifootball] GET from: ' + data.field('text').val());

    return {
        "response": data['text']
    };
};