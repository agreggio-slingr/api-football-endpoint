/**
* Sends trace request.
*
* @param {text} url, This is used to config external URL.
* @param {text} body, This is used to send body request.
*/
step.trace = function (url, body) {
	return endpoint.trace(url, body);
}