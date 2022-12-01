/**
 * Generates a random number.
 *
 * @param {number} bound, This is used to get a random number between 0 (inclusive) and the number passed in this argument, exclusive.
 */
step.numberGenerator = function (bound) {

    var data = endpoint.randomNumber({bound: bound});
    return {
        "generatedNumber": data['number']
    };
};